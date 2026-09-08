import os

from dotenv import load_dotenv
from tavily import TavilyClient


load_dotenv()


def search_web(query: str, max_results: int = 5):

    api_key = os.getenv("TAVILY_API_KEY")

    if not api_key:
        raise ValueError(
            "TAVILY_API_KEY is missing from the .env file."
        )

    tavily_client = TavilyClient(
        api_key=api_key
    )

    response = tavily_client.search(
        query=query,
        search_depth="basic",
        max_results=max_results
    )

    return response["results"]