from sklearn.feature_extraction.text import CountVectorizer

def extract_keywords(text, top_n=8):
    vectorizer = CountVectorizer(stop_words="english")
    X = vectorizer.fit_transform([text])
    words = vectorizer.get_feature_names_out()
    counts = X.toarray()[0]

    sorted_words = sorted(
        zip(words, counts),
        key=lambda x: x[1],
        reverse=True
    )
    return [w for w, _ in sorted_words[:top_n]]
