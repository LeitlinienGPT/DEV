import requests
from bs4 import BeautifulSoup

def search_doccheck(term):
    url = f'https://flexikon.doccheck.com/de/{term}'
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        content = soup.find('div', class_='wikicontent')
        if content:
            return content.text.strip(), url
    return "No relevant information found on DocCheck.", url