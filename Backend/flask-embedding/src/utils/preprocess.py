import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# Run once
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')

stop_words = set(stopwords.words("english"))
lemmatizer = WordNetLemmatizer()

def preprocess(text):
    # Lowercase
    text = text.lower()

    # Remove punctuation/special chars
    text = re.sub(r'[^\w\s]', '', text)

    # Tokenize
    words = nltk.word_tokenize(text)

    # Remove stopwords and lemmatize
    cleaned = [lemmatizer.lemmatize(w) for w in words if w not in stop_words]

    # Return joined string
    return ' '.join(cleaned)
