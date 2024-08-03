import requests
from bs4 import BeautifulSoup

def search_doccheck(term):
    url = f'https://flexikon.doccheck.com/de/{term}'
    print(f"Fetching URL: {url}")  # Debug statement
    response = requests.get(url)
    print(f"Response status code: {response.status_code}")  # Debug statement
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Attempt to find the main content div with class 'mw-parser-output'
        main_content = soup.find('div', class_='mw-parser-output')
        
        if main_content:
            print(f"Found content with class 'mw-parser-output'")  # Debug statement
            # Clean and format the content
            text = ''
            for element in main_content.find_all(['p', 'table', 'h4', 'h5']):
                text += element.get_text(separator=' ', strip=True) + '\n\n'
            return text.strip(), url
        else:
            print("Content with class 'mw-parser-output' not found")  # Debug statement

    return "No relevant information found on DocCheck.", url

# Test the function with a sample term
if __name__ == "__main__":
    term = "Mammakarzinom"
    print(f"Searching for term: {term}")  # Debug statement
    content, url = search_doccheck(term)
    print(f"Content: {content}")  # Debug statement
    print(f"URL: {url}")  # Debug statement