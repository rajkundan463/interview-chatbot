import re
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np

def preprocess_text(text):
    # Lowercase, remove non-alphabetic characters, and strip whitespace
    text = text.lower()
    text = re.sub(r'[^a-z\s]', '', text)
    return text.strip()

def extract_keywords(text, top_n=10):
    text = preprocess_text(text)

    # Use CountVectorizer to get word frequency
    vectorizer = CountVectorizer(stop_words='english')
    word_matrix = vectorizer.fit_transform([text])
    word_counts = word_matrix.toarray().flatten()

    # Get word-to-index mapping
    vocab = vectorizer.get_feature_names_out()
    word_freq = list(zip(vocab, word_counts))

    # Sort by frequency and return top N keywords
    sorted_keywords = sorted(word_freq, key=lambda x: x[1], reverse=True)
    keywords = [word for word, freq in sorted_keywords[:top_n]]

    return keywords
