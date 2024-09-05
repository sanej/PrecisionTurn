import os
from cryptography.hazmat.primitives import serialization

# Define the key path relative to the current file
key_path = os.path.join(os.path.dirname(__file__), 'AuthKey_UBA8BYKDU9.p8')

def load_private_key():
    if not os.path.exists(key_path):
        raise FileNotFoundError(f"The file {key_path} does not exist.")
    
    try:
        with open(key_path, 'rb') as key_file:
            private_key = serialization.load_pem_private_key(
                key_file.read(),
                password=None
            )
        return private_key
    except Exception as e:
        raise RuntimeError(f"Failed to load private key: {e}")