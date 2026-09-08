from app.services.research_pipeline import research_pipeline


def main():

    topic = input("Enter your research topic: ")

    documents = research_pipeline(
        query=topic,
        max_results=3
    )

    print("\n" + "=" * 70)
    print("RESEARCH RESULTS")
    print("=" * 70)

    for index, document in enumerate(documents, start=1):

        print(f"\nSOURCE {index}")
        print(f"TITLE: {document['title']}")
        print(f"URL: {document['url']}")

        print("\nCONTENT:")
        print(document["content"][:1500])

        print("\n" + "-" * 70)


if __name__ == "__main__":
    main()