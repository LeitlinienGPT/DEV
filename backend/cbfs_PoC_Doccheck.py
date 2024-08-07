# Langchain
from langchain.retrievers.contextual_compression import ContextualCompressionRetriever
from langchain.prompts import PromptTemplate
from langchain.chains import ConversationalRetrievalChain
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain_core.runnables import RunnableParallel, RunnableSequence, Runnable
from langchain.chains import LLMChain

# Pinecone
from pinecone import Pinecone
from langchain_pinecone import PineconeVectorStore as Pinecone_Langchain

# Cohere
from langchain_cohere import CohereRerank

# Openai
import openai
from langchain_openai import ChatOpenAI
from langchain_openai.embeddings import OpenAIEmbeddings

# Setup
from dotenv import load_dotenv
import os
from fastapi.encoders import jsonable_encoder
import param
from doccheck_scraper import search_doccheck  # Import the DocCheck scraper

def preprocess_documents(documents):
    for doc in range(len(documents)):
        documents[doc].page_content = f"Quelle {doc + 1}: \n" + documents[doc].page_content
    return documents

class PreprocessingConversationalRetrievalChain(ConversationalRetrievalChain, Runnable):
    def __init__(self, combine_docs_chain, question_generator, **kwargs):
        super().__init__(combine_docs_chain=combine_docs_chain, question_generator=question_generator, **kwargs)
        self.combine_docs_chain = combine_docs_chain
        self.question_generator = question_generator
    
    def invoke(self, inputs):
        # Retrieve documents
        retrieved_docs = self.retriever.get_relevant_documents(inputs['question'])

        # Preprocess documents
        preprocessed_docs = preprocess_documents(retrieved_docs)

        # Combine documents and perform the summarization with LLM
        combined_output = self.combine_docs_chain({"input_documents": preprocessed_docs, "question": inputs['question']})

        return {
            "answer": combined_output,
            "source_documents": preprocessed_docs
        }

# Create a prompt template
prompt_template = PromptTemplate(
    input_variables=["question"],
    template="Extract three keywords from the following query: {question}"
)

# Define a function to extract keywords using the LLM
def extract_keywords(question):
    from langchain_core.prompts import ChatPromptTemplate
    from langchain_core.runnables import RunnableParallel
    from langchain_openai import ChatOpenAI

    model = ChatOpenAI(model_name="gpt-3.5-turbo", api_key=os.getenv('OPENAI_API_KEY'))
    joke_chain = ChatPromptTemplate.from_template("Extract three keywords from the following query: {question}") | model

    # map_chain = RunnableParallel(joke=joke_chain, poem=poem_chain)

    map_chain.invoke({"topic": "bear"})

    # prompt = prompt_template.format(question=query)
    response = ChatPromptTemplate.from_template("Extract three keywords from the following query: {question}") | model
    keywords_text = response['choices'][0]['text'].strip()
    keywords = keywords_text.split(',')
    return [keyword.strip() for keyword in keywords]

# Define the chain class
class DoccheckChain(Runnable):
    def __init__(self):
        # Use RunnableSequence to replace the deprecated LLMChain
        self.llm = RunnableSequence(prompt_template, ChatOpenAI(model_name="gpt-3.5-turbo", api_key=os.getenv('OPENAI_API_KEY')))
        self.prompt_template = prompt_template

    def invoke(self, inputs):
        query = inputs['question']
        keywords = extract_keywords(query)
        print("keywords:", keywords)
        # Search DocCheck for each keyword and collect URLs
        doccheck_urls = search_doccheck(keywords)
        print("doccheck_urls:", doccheck_urls)
        return {
            "doccheck_urls": doccheck_urls
        }

class cbfs(param.Parameterized):
    chat_history = param.List([])
    count = param.List([])

    def __init__(self, **params):
        super(cbfs, self).__init__(**params)
        self.qa = parallel_chain

    def convchain(self, query):
        print("Convchain method started")
        try:
            result = self.qa.invoke({"question": query})
        except Exception as e:
            print(f"Error in self.qa call: {e}")
            return {'answer': 'Error occurred', 'source_documents': []}

        self.chat_history.extend([(query, result["qa_with_preprocessing"]["answer"])])
        source_documents = []
        for match in result["qa_with_preprocessing"]["source_documents"]:
            source_documents.append({
                'page_content': match.page_content,
                'metadata': match.metadata
            })
        serializable_result = jsonable_encoder({
            'answer': result["qa_with_preprocessing"]['answer'],
            'source_documents': source_documents,
            'doccheck_urls': result["Doccheck_Chain"]["doccheck_urls"]  # Include the DocCheck URLs in the result
        })
        return serializable_result

    def clr_history(self):
        self.chat_history = []

# Load environment variables from the root .env file
dotenv_path = os.path.join(os.path.dirname(__file__), '../KEYs.env')
load_dotenv(dotenv_path)

# API keys and credentials
openai.api_key = os.getenv('OPENAI_API_KEY')
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
os.environ['COHERE_API_KEY'] = os.getenv('COHERE_API_KEY')

# Initialize Pinecone
pinecone = Pinecone(api_key=PINECONE_API_KEY)
index = pinecone.Index('leitliniengpt-vdb')

# Initialize the OpenAI embeddings
MODEL = "text-embedding-3-small"
embeddings = OpenAIEmbeddings(model=MODEL)

vectorstore = Pinecone_Langchain(index, embeddings, 'text')

# LLM to use
llm = ChatOpenAI(temperature=0, model="gpt-4-turbo", streaming=True, callbacks=[StreamingStdOutCallbackHandler()])

# Reranker
compressor = CohereRerank()
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor, base_retriever=vectorstore.as_retriever(search_kwargs={"k": 12})
)

# Final Retriever
template = """Beantworte die Frage mit den Quellen und deinem vorhandenen Wissen. 
            Inkludiere alle relevanten Details.
            Jeder Satz der aus den Quellen kommt muss mit einer Quellenangabe enden.
            Wenn Informationen aus mehreren Quellen stammen, 
            gebe diese in der Form Quelle 1; Quelle 2 an.
            Formattiere die Antwort sehr übersichtlich.
            Quellen: {context}
            Frage: {question}
            Antwort:"""
prompt = PromptTemplate.from_template(template)

# Create an instance of the combine_docs_chain and question_generator separately
conversational_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=compression_retriever,
    combine_docs_chain_kwargs={"prompt": prompt},
    return_source_documents=True,
    chain_type='stuff',
    verbose=True
)
combine_docs_chain = conversational_chain.combine_docs_chain
question_generator = conversational_chain.question_generator

qa_with_preprocessing = PreprocessingConversationalRetrievalChain(
    combine_docs_chain=combine_docs_chain,
    question_generator=question_generator,
    retriever=compression_retriever,
    return_source_documents=True,
    verbose=True
)

parallel_chain = RunnableParallel(
    qa_with_preprocessing=qa_with_preprocessing,
    Doccheck_Chain=DoccheckChain()
)

if __name__ == "__main__":
    cbfs_instance = cbfs()
    results = cbfs_instance.convchain("Beim Mammakarzinom, wann wird eine adjuvante Strahlentherapie der Lymphabfluswege empfohlen?")
    print(results)
