import requests

def search_doccheck(query):
    url = "https://api.perplexity.ai/chat/completions"
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": "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"  # Replace with your actual API key
    }

    # Clearer instruction to Perplexity 
    search_query = f"""
    Find information about '{query}' specifically from the DocCheck medical website (doccheck.com). 
    Only use DocCheck as your source. 
    """

    payload = {
        "model": "llama-3-sonar-small-32k-online",
        "messages": [
            {"role": "system", "content": "You are a helpful medical AI assistant."},
            {"role": "user", "content": search_query}
        ],
        "max_tokens": 200,  # Adjust for longer responses if needed
        "temperature": 0.2,
        "top_p": 0.9
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        result = response.json()
        return result['choices'][0]['message']['content'], result
    else:
        return None, f"Error: {response.status_code}"

if __name__ == "__main__":
    user_input = "Wie behandle ich einen Patienten, der 60 Jahre alt ist und Adipositas hat, sehr, sehr übergewichtig ist, und schwer atmet."
    print(f"User Input: {user_input}")

    doccheck_summary, raw_response = search_doccheck(user_input)
    
    print(f"Summary: {doccheck_summary}")
    print(f"Raw Response: {raw_response}") 