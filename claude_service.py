import os
from anthropic import Anthropic
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def ask_claude(prompt, model="claude-3-opus-20240229", max_tokens=1024):
    """
    Sends a prompt to Claude and returns the text response.
    Requires an ANTHROPIC_API_KEY environment variable.
    """
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        return "Error: ANTHROPIC_API_KEY environment variable not set."

    client = Anthropic(api_key=api_key)

    try:
        message = client.messages.create(
            model=model,
            max_tokens=max_tokens,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        return message.content[0].text
    except Exception as e:
        return f"Error calling Claude: {str(e)}"

if __name__ == "__main__":
    test_prompt = "Explain why an Undergraduate Quantum Teaching Lab is important for the National Quantum Mission."
    print("Sending prompt to Claude...")
    # Using Claude 3 Opus as the fallback since 4.6 might not be generally available yet or might require specific access.
    # If 4.6 is available, you can change the model name in the function call.
    response = ask_claude(test_prompt)
    print("\n--- Claude's Response ---")
    print(response)
