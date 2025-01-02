from langchain_aws.retrievers import AmazonKnowledgeBasesRetriever
from langchain_aws import ChatBedrockConverse
from langchain.chains import RetrievalQA
import boto3
import os
import re
from dotenv import load_dotenv
import logging

logger = logging.getLogger(__name__)

class KnowledgeBaseService:
    def __init__(self):
        load_dotenv()

        session = boto3.Session(profile_name='PrecisionTurn-Dev')

        self.retriever = AmazonKnowledgeBasesRetriever(
            knowledge_base_id="TVZXIOTZ7U",
            retrieval_config={"vectorSearchConfiguration": {"numberOfResults": 4}},
            aws_session=session,
            region_name='us-east-2'
        )
        
        self.llm = ChatBedrockConverse(
            model="us.amazon.nova-lite-v1:0",
            region_name='us-east-2'
        )

        self.qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=self.retriever,
            return_source_documents=True
        )

    def format_answer(self, text: str) -> str:
        """Enhanced formatting for better readability"""
        # Split into lines and process each line
        lines = text.split('\n')
        formatted_lines = []
        current_section = []
        
        for line in lines:
            line = line.strip()
            
            # Handle numbered points (e.g., "1.", "2.")
            if re.match(r'^\d+\.', line):
                # If we have a previous section, add it
                if current_section:
                    formatted_lines.extend(current_section)
                    current_section = []
                formatted_lines.append(f"\n{line}")
                
            # Handle bullet points
            elif line.startswith('•') or line.startswith('*'):
                if current_section:
                    formatted_lines.extend(current_section)
                    current_section = []
                formatted_lines.append(line)
                
            # Handle emphasized points (with asterisks)
            elif line.startswith('**'):
                if current_section:
                    formatted_lines.extend(current_section)
                    current_section = []
                # Clean up the asterisks but keep it as a strong point
                clean_line = line.replace('**', '')
                formatted_lines.append(f"• {clean_line}")
                
            # Regular text
            elif line:
                if line.endswith(':'):
                    # This is likely a header/title
                    if current_section:
                        formatted_lines.extend(current_section)
                        current_section = []
                    formatted_lines.append(f"\n{line}")
                else:
                    current_section.append(line)
        
        # Add any remaining section
        if current_section:
            formatted_lines.extend(current_section)
        
        return '\n'.join(formatted_lines)

    def truncate_content(self, content: str, max_length: int = 200) -> str:
        """Truncate content to a reasonable length while maintaining sentence integrity."""
        if len(content) <= max_length:
            return content
            
        # Try to truncate at the end of a sentence
        truncated = content[:max_length]
        last_period = truncated.rfind('.')
        
        if last_period > 0:
            return content[:last_period + 1]
        return truncated + '...'

    def format_source_documents(self, docs):
        """Format and truncate source documents for display"""
        return [
            {
                "content": self.truncate_content(doc.page_content),
                "metadata": {
                    "location": doc.metadata.get("source", f"Source {i+1}"),
                    "score": float(doc.metadata.get("score", 0))
                }
            }
            for i, doc in enumerate(docs)
        ]

    def query(self, question: str):
        try:
            result = self.qa_chain.invoke({"query": question})
            
            # Format the answer
            formatted_answer = self.format_answer(result['result'])
            
            # Format and sort sources by relevance
            sources = self.format_source_documents(result['source_documents'])
            sources.sort(key=lambda x: float(x['metadata'].get('score', 0)), reverse=True)
            
            return {
                "answer": formatted_answer,
                "source_documents": sources[:3],  # Limit to top 3 sources
                "error": None
            }
        except Exception as e:
            logger.error(f"Error in query: {str(e)}")
            return {
                "answer": None,
                "source_documents": [],
                "error": str(e)
            }