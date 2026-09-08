from app.tools.tavily_search import search_web
from app.tools.web_scraper import scrape_webpage


def main():

    query = "latest developments in artificial intelligence"

    # Step 1: Search using Tavily
    results = search_web(
        query=query,
        max_results=3
    )

    for index, result in enumerate(results, start=1):

        print("\n" + "=" * 60)

        print(f"RESULT {index}")

        print("=" * 60)

        print("\nTITLE:")
        print(result["title"])

        print("\nURL:")
        print(result["url"])

        # Step 2: Scrape the URL
        print("\nSCRAPING WEBSITE...\n")

        content = scrape_webpage(
            result["url"]
        )

        # Print first 2000 characters
        print(content[:2000])


if __name__ == "__main__":
    main()