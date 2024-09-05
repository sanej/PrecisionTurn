import unittest
from backend.services.llm_query_service import ask_question

class TestAskQuestion(unittest.TestCase):

    def test_ask_question(self):
        question = "What are the key risks in a turnaround?"
        try:
            answer = ask_question(question)
            self.assertIsNotNone(answer, "The answer should not be None")
            # Add more assertions based on the expected behavior of ask_question
        except Exception as e:
            self.fail(f"ask_question raised an exception: {e}")

if __name__ == "__main__":
    unittest.main()