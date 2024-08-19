from google.cloud import aiplatform
from langchain_google_vertexai import VertexAIEmbeddings
from langchain_google_vertexai import VertexAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

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
llm = VertexAI()

# Create a prompt template
prompt_template = """
You are an AI assistant knowledgeable about turnarounds in industrial settings. 
Use the following pieces of context to answer the question at the end. 
If you don't know the answer, just say that you don't know, don't try to make up an answer.

Context:
{context}

Question: {question}

Answer:"""

prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])

# Create an LLM chain
llm_chain = LLMChain(llm=llm, prompt=prompt)

# Function to ask a question
def ask_question(question):
    # Query the index
    results = query_index(question)
    
    # Prepare context from the results
    context = "\n".join([f"- {item.id}: {item.distance}" for item in results])
    
    # Generate answer using the LLM chain
    response = llm_chain.run(context=context, question=question)
    return response, results

# Ask the hardcoded question
question = "What is a turnaround?"
answer, sources = ask_question(question)

print(f"Question: {question}")
print(f"Answer: {answer}")
print("\nSources:")
for i, item in enumerate(sources):
    print(f"Source {i+1}: ID: {item.id}, Distance: {item.distance}")