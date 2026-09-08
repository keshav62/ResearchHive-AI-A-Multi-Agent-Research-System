from app.agents.scout import create_scout_agent


def main():

    scout_agent = create_scout_agent()

    topic = input("Enter your research topic: ")

    response = scout_agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": topic
                }
            ]
        }
    )

    print("\n" + "=" * 60)
    print("SCOUT AGENT SEARCH QUERIES")
    print("=" * 60 + "\n")

    scout_result = response["structured_response"]

    for index, query in enumerate(
        scout_result.search_queries,
        start=1
    ):
        print(f"{index}. {query}")


if __name__ == "__main__":
    main()