from app.tools.tavily_search import search_web
from app.tools.web_scraper import scrape_webpage


def research_pipeline(query: str, max_results: int = 5):
    """
    Search the web using Tavily and scrape the returned URLs.
    """

    search_results = search_web(
        query=query,
        max_results=max_results
    )

    research_documents = []

    for result in search_results:

        title = result.get("title", "")
        url = result.get("url", "")

        print(f"\nScraping: {title}")

        content = scrape_webpage(url)

        # Skip pages that failed
        if content.startswith("Error scraping"):
            continue

        research_documents.append(
            {
                "title": title,
                "url": url,
                "content": content
            }
        )

    return research_documents