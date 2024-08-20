from google.cloud import aiplatform
from langchain_google_vertexai import VertexAIEmbeddings
from langchain_google_vertexai import VertexAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import logging


# Initialize Google Cloud project and location
project_id = "precisionturn"
location = "us-central1"
aiplatform.init(project=project_id, location=location)

# Initialize VertexAIEmbeddings
embeddings = VertexAIEmbeddings(model_name="textembedding-gecko@001")

# Initialize the Vertex AI Index Endpoint
index_endpoint = aiplatform.MatchingEngineIndexEndpoint(
    index_endpoint_name=f"projects/394267795901/locations/us-central1/indexEndpoints/6378095428914642944"
)

# Function to query the index
def query_index(query, num_neighbors=5):
    query_embedding = embeddings.embed_query(query)
    matched_items = index_endpoint.find_neighbors(
        deployed_index_id="turnaround_docs_index_depl_1724102948484",
        queries=[query_embedding],
        num_neighbors=num_neighbors
    )
    return matched_items[0]

# Initialize the language model
# Initialize the language model with adjusted parameters
llm = VertexAI(
    #model_name="gemini-1.5-pro-001",  # Specify a more capable model
    model_name="gemini-1.5-flash-001",
    max_output_tokens=1024,  # Increase max output tokens
    temperature=0.7,  # Slightly increase temperature for more diverse responses
    top_p=0.8,  # Adjust top_p for better quality
    top_k=40  # Adjust top_k for more diverse sampling
)

# Create a prompt template

prompt_template = """
You are an AI assistant specializing in industrial turnarounds. Your knowledge encompasses all aspects of turnarounds, including planning, execution, risks, and best practices.

Use the following pieces of context to answer the question. If the context doesn't provide enough information, use your general knowledge about turnarounds to provide a helpful response. If you're unsure, state that you don't have enough specific information but offer general insights related to the question.

Context:
{context}

Question: {question}

Provide a detailed and informative answer, following these guidelines:
1. Start with a brief introduction summarizing the main points.
2. Present the key points in a numbered or bulleted list format.
3. Each point should be concise and clear, ideally not exceeding two sentences.
4. If applicable, group related points under subheadings.
5. Conclude with a brief summary or recommendation.
6. Use markdown formatting to improve readability.

Answer:
"""

prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])


### Create an LLM chain
#llm_chain = LLMChain(llm=llm, prompt=prompt)

# Create a RunnableSequence
sequence = prompt | llm

# Function to ask a question
def ask_question(question):
    try:
        # Query the index
        results = query_index(question)
    
        # Prepare context from the results
        context = "\n".join([f"- {item.id}: {item.distance}" for item in results])


         # Generate answer using the RunnableSequence
        response = sequence.invoke({"context": context, "question": question})

        #### Generate answer using the LLM chain
        #response = llm_chain.run(context=context, question=question)

        # Post-process the response to ensure proper formatting

        formatted_response = post_process_response(response)

        return formatted_response
        #return response
    except Exception as e:
        logging.error(f"Error in ask_question: {e}")
        raise

def post_process_response(response):
    # Split the response into lines
    lines = response.split('\n')
    
    # Process each line
    formatted_lines = []
    for line in lines:
        # Ensure proper spacing for list items
        if line.strip().startswith(('- ', '* ', '1. ', '2. ', '3. ')):
            formatted_lines.append('\n' + line)
        else:
            formatted_lines.append(line)
    
    # Join the lines back together
    formatted_response = '\n'.join(formatted_lines)
    
    # Ensure proper spacing between sections
    formatted_response = formatted_response.replace('\n\n\n', '\n\n')
    
    return formatted_response.strip()