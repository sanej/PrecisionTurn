# Import the required libraries
import json  # Add this import at the top
from io import BytesIO
import PyPDF2

# Import Google Cloud Storage and Vertex AI libraries
from google.cloud import storage
import vertexai
from vertexai.language_models import TextEmbeddingModel


# Configuration

PROJECT_ID = 'precisionturn'  # Replace with your actual project ID
BUCKET_NAME = 'precisionturn-bucket'
FOLDER_PATH = 'turnaround-docs'
LOCATION = 'us-central1'  # Or your preferred region

# Embeddings Configuration
EMBEDDINGS_FOLDER = 'turnaround-docs-embeddings/'  # Folder to store embeddings

# Initialize clients

print("Calling GCP clients and models Initilization")

storage_client = storage.Client(project=PROJECT_ID)
vertexai.init(project=PROJECT_ID, location=LOCATION)
embedding_model = TextEmbeddingModel.from_pretrained("textembedding-gecko@001")

print("Initialized GCP clients and models")

# Split PDF into chunks

def split_pdf(pdf_content, max_pages=5):
    """Splits a PDF into chunks of up to `max_pages`."""
    pdf_reader = PyPDF2.PdfReader(BytesIO(pdf_content))
    total_pages = len(pdf_reader.pages)
    print(f"Total pages: {total_pages}")
    chunks = []
    print(f"Splitting PDF into chunks... ")

    for start_page in range(0, total_pages, max_pages):
        end_page = min(start_page + max_pages, total_pages)
        chunk = BytesIO()
        pdf_writer = PyPDF2.PdfWriter()
        for page_num in range(start_page, end_page):
            pdf_writer.add_page(pdf_reader.pages[page_num])
        pdf_writer.write(chunk)
        chunk.seek(0)
        chunks.append(chunk)
    print(f"Number of chunks: {len(chunks)}")

    return chunks

def extract_text_from_pdf(pdf_stream):
    """Extracts text from a PDF chunk using PyPDF2."""
    print("Extracting text from PDF...")
    pdf_reader = PyPDF2.PdfReader(pdf_stream)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

def process_pdfs():
    bucket = storage_client.get_bucket(BUCKET_NAME)
    blobs = bucket.list_blobs(prefix=FOLDER_PATH)

    print(f"Processing files... from bucket {bucket.name}")

    for blob in blobs:
        if blob.name.endswith('.pdf'):
            try:
                
                # ... (download and split PDF)

                pdf_content = blob.download_as_bytes()
                pdf_chunks = split_pdf(pdf_content) 

                # Construct the base path for embeddings of this PDF
                #base_embedding_path = f"{EMBEDDINGS_FOLDER}{blob.name.replace('.pdf', '')}"
                base_embedding_path = f"{EMBEDDINGS_FOLDER}{blob.name.replace('turnaround-docs/', '').replace('.pdf', '')}" 


                for chunk_number, chunk in enumerate(pdf_chunks):  # Enumerate to get chunk_number
                    extracted_text = extract_text_from_pdf(chunk)

                    if extracted_text:
                        try:
                            embeddings = embedding_model.get_embeddings([extracted_text])

                           # Store embeddings in Cloud Storage
                            embedding_data = {
                                "blob_name": blob.name,
                                "chunk_number": chunk_number,  # You'll need to track chunk numbers
                                "embedding": embeddings[0].values  # Extract the embeddings
                            }

                            # Construct the full blob name using the base path
                            blob_name = f"{base_embedding_path}_chunk_{chunk_number}..json"
                            blob = bucket.blob(blob_name)

                            blob.upload_from_string(json.dumps(embedding_data), content_type='application/json')

                            print(f"Generated and stored embeddings for {blob.name} (chunk {chunk_number})")

                        except Exception as e:
                            print(f"Error generating embeddings for {blob.name}: {e}")

            except Exception as e:
                print(f"Error processing {blob.name}: {e}")

if __name__ == "__main__":
    process_pdfs()