from google.cloud import documentai_v1 as documentai
from google.cloud import storage
from google.cloud import aiplatform
import vertexai
from vertexai.language_models import TextEmbeddingModel

# Set up your project and bucket information
PROJECT_ID = 'precisionturn'
BUCKET_NAME = 'precisionturn-bucket'
FOLDER_PATH = 'turnaround-docs/'
INDEX_ID = '1279950281987063808'
# Document AI processor information
PROCESSOR_ID = '3486e248af8db16f'
LOCATION = 'us-central1'  # Updated region

# Initialize Vertex AI and GCP Storage clients
storage_client = storage.Client(project='precisionturn')

print("Initialized Vertex AI and GCP Storage clients")

vertexai.init(project='precisionturn', location='us-central1')  # Updated region

# Load the text embedding model
embedding_model = TextEmbeddingModel.from_pretrained("textembedding-gecko@001")

# Function to process and embed PDFs from the bucketfrom google.cloud import documentai_v1 as documentai
from google.cloud import storage
from google.cloud import aiplatform
import vertexai
from vertexai.language_models import TextEmbeddingModel

# Set up your project and bucket information
PROJECT_ID = 'precisionturn'
BUCKET_NAME = 'precisionturn-bucket'
FOLDER_PATH = 'turnaround-docs'
INDEX_ID = 'turnaround_vector_endpoint_1723742604490'
# Document AI processor information
PROCESSOR_ID = '95f9e1558292ed54'

LOCATION = 'us'

# Initialize Vertex AI and GCP Storage clients
storage_client = storage.Client(project='precisionturn')

print("Initialized Vertex AI and GCP Storage clients")

vertexai.init(project='precisionturn', location='us-central1')

# Load the text embedding model
embedding_model = TextEmbeddingModel.from_pretrained("textembedding-gecko@001")
print("Loaded text embedding model")


# Function to process and embed PDFs from the bucket
def process_and_embed_pdfs():
    bucket = storage_client.get_bucket(BUCKET_NAME)
    blobs = bucket.list_blobs(prefix=FOLDER_PATH)

    print("Processing and embedding PDFs..." + str(blobs))
    
    for blob in blobs:
        if blob.name.endswith('.pdf'):
            # Extract text using Vertex AI's Document AI Layout Parser (you need to implement this part)
            print(f"Processing {blob.name}")

            extracted_text = extract_text_from_pdf(blob.name)
            
            # Generate embeddings for the extracted text
            embeddings = embedding_model.get_embeddings([extracted_text])
            
            # Store the embeddings in Vertex AI Vector Search Index
            vector_store_index = aiplatform.MatchingEngineIndex(index_name=INDEX_ID)
            vector_store_index.upsert(datapoints=embeddings)
            
            print(f"Processed and embedded {blob.name}")

def extract_text_from_pdf(blob_name):
    print(f"Extracting text from {blob_name}")
    documentai_client = documentai.DocumentProcessorServiceClient()

    # Read the content of the PDF file from GCS
    bucket = storage_client.bucket(BUCKET_NAME)
    blob = bucket.blob(blob_name)
    content = blob.download_as_bytes()
    print("Reading the content of PDF file from GCS")

    # Create a RawDocument object
    raw_document = documentai.types.RawDocument(
        content=content,
        mime_type='application/pdf'
    )

    print("Constructing the RawDocument object")

    # Construct the request
    request = documentai.types.ProcessRequest(
        name=f"projects/{PROJECT_ID}/locations/{LOCATION}/processors/{PROCESSOR_ID}",
        raw_document=raw_document
    )

    print("Processing the document using a RawDocument object")

    # Process the document
    result = documentai_client.process_document(request=request)

    print("Extracting text from the document")

    # Extract text from the document
    document = result.document
    text = document.text
    print("HEre is the text length")

    print(len(text))
    return text

if __name__ == "__main__":
    process_and_embed_pdfs()
