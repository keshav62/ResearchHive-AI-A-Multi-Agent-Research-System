import os

from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI


# Load environment variables from the .env file
load_dotenv()


def get_llm():
    """
    Creates and returns the Gemini LLM.
    """

    api_key = os.getenv("GOOGLE_API_KEY")

    if not api_key:
        raise ValueError(
            "GOOGLE_API_KEY is missing. Please add it to your .env file."
        )

    llm = ChatGoogleGenerativeAI(
        model="gemini-3.8-flash",
        api_key=api_key,
        temperature=0,
    )

    return llm