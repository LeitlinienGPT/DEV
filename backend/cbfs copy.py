from langchain.retrievers.contextual_compression import ContextualCompressionRetriever
from langchain_cohere import CohereRerank
from langchain_community.llms import Cohere
from langchain.retrievers.multi_query import MultiQueryRetriever
from pinecone import Pinecone
from langchain_pinecone import PineconeVectorStore as Pinecone_Langchain
from dotenv import load_dotenv  # For loading environment variables
import os  # For interacting with the operating system
from langchain.prompts import PromptTemplate
from langchain.chains import ConversationalRetrievalChain
from langchain_openai import ChatOpenAI
from langchain_openai.embeddings import OpenAIEmbeddings
import openai
import json
from fastapi.encoders import jsonable_encoder
import param  # For defining parameters in classes

# Environment variable setup
load_dotenv('KEYs.env')

# API keys and credentials
openai.api_key = os.environ['OPENAI_API_KEY']
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY') 
os.environ['COHERE_API_KEY'] = 'zrketPyUV8RuiWl33O4iOEelRhgB7MXeb8qPTnoI'

# Pinecone Index
pinecone = Pinecone()
index = pinecone.Index('leitliniengpt-vdb')

# Initialize the OpenAI embeddings
MODEL = "text-embedding-3-small"
embeddings = OpenAIEmbeddings(model=MODEL)

vectorstore = Pinecone_Langchain(index, embeddings, 'text')

# Retriever
MULTI_QUERY_PROMPT = PromptTemplate(
    input_variables=["question"],
    template="""Sie sind ein AI-Assistent.
              Ihre Aufgabe ist es, drei verschiedene Versionen der gegebenen ursprünglichen Frage zu generieren.
              Bitte fügen Sie in die Versionen verschiedene Begriffe für komplexes medizinisches Vokabular ein.
              Die neu generierten Versionen der Frage sollten in der gleichen Sprache sein wie die ursprüngliche Frage.

              Hier ein Beispiel für eine ursprüngliche Frage.
              Frage: Wie ist der laborchemische Algorithmus zum Ausschluss eines akuten Herzinfarkts?

              Hier ein Beispiel für die generierten Versionen der Frage:
              1. Was ist die normale  Blutdiagnostik beim Herzinfarkt?
              2. Was ist die Diagnostik eines akuten Myokardinfarkt?
              3. Wie schließe ich einen NSTEMI aus?

              Bitte generiere nun versionen der Frage für die folgende Frage.
              Ursprüngliche Frage: {question}
              Generierten Versionen der Frage:""",
)
llm = ChatOpenAI(temperature=0, model="gpt-4-turbo")
retriever_from_llm = MultiQueryRetriever.from_llm(
    retriever=vectorstore.as_retriever(search_kwargs={"k": 5}), llm=llm, prompt=MULTI_QUERY_PROMPT
)

# Reranker
compressor = CohereRerank()
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor, base_retriever=retriever_from_llm
)

# Final Retriever
template = """Beantworten Sie die Frage nur auf der Grundlage 
            der Quellen und inkludieren Sie alle relevanten Details.
            Die Antwort sollte nicht länger als sechs Sätze sein.
            Jeder Satz sollte mit Quellenangaben ende, die listen 
            aus welcher Quelle die Inforamtionen kamen.
            Wenn Informationen aus mehreren Quellen stammen, 
            geben Sie diese in der Form [Quelle 1; Quelle 2] an.

            Merke Sie sich die Sprache in der die Frage gestellt wurde.
            
            Quellen: {context}
            Frage: {question}
            Antworten Sie in der Sprache, in der die Frage gestellt wurde.
            Antwort:"""
prompt = PromptTemplate.from_template(template)


# `custom_retriever` is already defined and set up
def preprocess_documents(documents):
    for doc in range(len(documents)):
        documents[doc].page_content = f"Quelle {doc + 1}: \n" + documents[doc].page_content
    return documents


# Custom conversational retrieval chain with preprocessing
class PreprocessingConversationalRetrievalChain(ConversationalRetrievalChain):
    def __init__(self, combine_docs_chain, question_generator, **kwargs):
        super().__init__(combine_docs_chain=combine_docs_chain, question_generator=question_generator, **kwargs)
        self.combine_docs_chain = combine_docs_chain
        self.question_generator = question_generator

    def invoke(self, inputs):
        retrieved_docs = self.retriever.invoke(inputs['question'])
        preprocessed_docs = preprocess_documents(retrieved_docs)
        combined_output = self.combine_docs_chain.invoke({"input_documents": preprocessed_docs, "question": inputs['question']})
        return {"answer": combined_output, "source_documents": preprocessed_docs}


# Create an instance of the combine_docs_chain and question_generator separately
conversational_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=compression_retriever,
    combine_docs_chain_kwargs={"prompt": prompt},
    return_source_documents=True,
    chain_type='stuff'
)
combine_docs_chain = conversational_chain.combine_docs_chain
question_generator = conversational_chain.question_generator


# ConversationalRetrievalChain model initialization function
def init_model():
    qa_with_preprocessing = PreprocessingConversationalRetrievalChain(
        combine_docs_chain=combine_docs_chain,
        question_generator=question_generator,
        retriever=compression_retriever,
        return_source_documents=True
    )
    return qa_with_preprocessing


# cbfs class definition (your main chatbot class)
class cbfs(param.Parameterized):
    chat_history = param.List([])
    count = param.List([])

    def __init__(self, **params):
        super(cbfs, self).__init__(**params)
        self.qa = init_model()

    def load_model(self, database):
        if database == "Nur aktuell gültige Leitlinien":
            self.qa = ConversationalRetrievalChain.from_llm(...)
            self.count.append(1)
        else:
            self.qa = init_model()

    def convchain(self, query):
        print("Convchain method started")
        try:
            result = self.qa.invoke({"question": query, "chat_history": self.chat_history})
        except Exception as e:
            print(f"Error in self.qa call: {e}")

        self.chat_history.extend([(query, result["answer"])])

        source_documents = []
        for match in result["source_documents"]:
            source_documents.append({
                'page_content': match.page_content,
                'metadata': match.metadata
            })

        serializable_result = jsonable_encoder({
            'answer': result['answer'],
            'source_documents': source_documents
        })

        return serializable_result

    def clr_history(self):
        self.chat_history = []

    def test_default_prompt(self):
        default_prompt = "Wie behandel ich einen Patienten mit Gastritis?"
        result_json = self.convchain(default_prompt)
        try:
            result_dict = json.loads(result_json)
            print("The result is a valid JSON object.")
            print(result_dict)
        except json.JSONDecodeError:
            print("The result is not a valid JSON object.")


if __name__ == "__main__":
    cbfs_instance = cbfs()
    cbfs_instance.test_default_prompt()