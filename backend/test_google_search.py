import re
from collections import Counter
from googleapiclient.discovery import build
from nltk.corpus import stopwords
import nltk

# Sicherstellen, dass die Stoppwörter heruntergeladen sind
nltk.download('stopwords')

def extract_keywords(text):
    # Deutsche Stoppwörter laden
    stop_words = set(stopwords.words('german'))
    
    # Alle Wörter im Text extrahieren, die keine Stoppwörter sind
    words = re.findall(r'\b\w+\b', text)
    filtered_words = [word.lower() for word in words if word.lower() not in stop_words]
    
    # Zählen der häufigsten Wörter
    word_counts = Counter(filtered_words)
    
    # Extrahieren der Top 5 häufigsten Wörter
    keywords = [word for word, count in word_counts.most_common(5)]
    return keywords

def google_search(query):
    api_key = 'AIzaSyB3puyybPf2cpcsEwb27RPvhcFrZfJspto'  # Ihr tatsächlicher API-Schlüssel
    cse_id = 'c66489cc03e1240eb'  # Ihre tatsächliche CSE-ID
    
    service = build("customsearch", "v1", developerKey=api_key)
    res = service.cse().list(q=query, cx=cse_id, num=10).execute()
    return res.get('items', [])

def search_doccheck(query):
    keywords = extract_keywords(query)
    print(f"Extrahierte Schlüsselwörter: {keywords}")  # Debugging-Ausgabe
    
    for keyword in keywords:
        search_results = google_search(keyword)
        for result in search_results:
            if 'flexikon.doccheck.com' in result['link'] or 'doccheck.com' in result['link']:
                return result['link'], result['snippet']
    return None, "No relevant information found on DocCheck."

if __name__ == "__main__":
    user_input = "Wie behandle ich einen Patienten, der 60 Jahre alt ist und Adipositas hat, sehr, sehr übergewichtig ist, und schwer atmet."
    print(f"Benutzereingabe: {user_input}")
    
    doccheck_url, snippet = search_doccheck(user_input)
    
    print(f"Zusammenfassung: {snippet}")
    print(f"URL: {doccheck_url}")