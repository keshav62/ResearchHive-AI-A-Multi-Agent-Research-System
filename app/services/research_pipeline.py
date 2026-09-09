from app.tools.tavily_search import search_web
from app.tools.web_scraper import scrape_webpage


def collect_research_documents(
    topic: str,
    max_results: int = 5
):
    """
    1. Search topic using Tavily.
    2. Get URLs from Tavily.
    3. Scrape each URL.
    4. Return collected documents.
    """

    print("\n🔎 Searching with Tavily...\n")

    search_results = search_web(
        query=topic,
        max_results=max_results
    )

    documents = []

    for index, result in enumerate(search_results, start=1):

        title = result.get("title", "Unknown Title")
        url = result.get("url", "")

        if not url:
            continue

        print(f"[{index}] Scraping: {title}")

        content = scrape_webpage(url)

        # Skip failed scraping
        if content.startswith("ERROR:"):
            print("❌ Failed to scrape")
            continue

        documents.append(
            {
                "title": title,
                "url": url,
                "content": content
            }
        )

    return documents