from gemini_doc_query import ask_question

def test_ask_question():
    question = "What are the key risks in a turnaround?"
    try:
        answer = ask_question(question)
        print(f"Question: {question}")
        print(f"Answer: {answer}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_ask_question()