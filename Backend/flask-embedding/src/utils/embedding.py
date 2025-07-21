from sentence_transformers import SentenceTransformer
import numpy as np

class EmbeddingModel:
    def __init__(self):
        self.model = SentenceTransformer('all-MiniLM-L6-v2')

    def encode(self, text):
        return self.model.encode(text).astype("float32")

# Create a global model instance
embedding_model = EmbeddingModel()

def embed_text(text):
    if not text or not str(text).strip():
        return None
    return embedding_model.encode(text)