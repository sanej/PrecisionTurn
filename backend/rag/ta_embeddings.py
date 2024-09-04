import os
import tempfile
import json
import vertexai
from google.cloud import storage
from langchain_google_vertexai import VertexAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader

# Configuration
PROJECT_ID = 'precisionturn'
BUCKET_NAME = 'precisionturn-bucket'
SOURCE_FOLDER = 'turnaround-docs'
EMBEDDINGS_FOLDER = 'turnaround-docs-embeddings'
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200

# Initialize Vertex AI Client
vertexai.init(project=PROJECT_ID)

# Initialize clients
storage_client = storage.Client(project=PROJECT_ID)
embeddings = VertexAIEmbeddings(model_name="textembedding-gecko@001")

def process_pdf(blob):
    # Download PDF to a temporary file
    _, temp_local_filename = tempfile.mkstemp()
    blob.download_to_filename(temp_local_filename)

    # Load and split the PDF
    loader = PyPDFLoader(temp_local_filename)
    documents = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=CHUNK_SIZE, chunk_overlap=CHUNK_OVERLAP)
    chunks = text_splitter.split_documents(documents)

    # Generate embeddings for each chunk
    for i, chunk in enumerate(chunks):
        embedding = embeddings.embed_query(chunk.page_content)
        
        # Prepare embedding data in the format expected by Vector Search
        embedding_data = {
            "id": f"{blob.name}_chunk_{i}",
            "embedding": embedding,
            "metadata": {
                "source": blob.name,
                "chunk": i,
                "page": chunk.metadata.get('page', 0),
                "content": chunk.page_content[:10]  # Store a snippet of the content
            }
        }

        # Store embedding in GCS
        relative_path = os.path.relpath(blob.name, SOURCE_FOLDER)
        embedding_blob_name = os.path.join(EMBEDDINGS_FOLDER, f"{relative_path}_chunk_{i}.json")

        embedding_blob = storage_client.bucket(BUCKET_NAME).blob(embedding_blob_name)
        embedding_blob.upload_from_string(json.dumps(embedding_data), content_type='application/json')

    print(f"Processed {blob.name}: {len(chunks)} chunks created and embedded")

    # Clean up the temporary file
    os.remove(temp_local_filename)

def main():
    bucket = storage_client.bucket(BUCKET_NAME)
    blobs = bucket.list_blobs(prefix=SOURCE_FOLDER)

    for blob in blobs:
        if blob.name.endswith('.pdf'):
            process_pdf(blob)

if __name__ == "__main__":
    main()