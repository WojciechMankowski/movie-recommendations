import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer

def extract_keywords(text, num_keywords=5):
    # nltk.download('punkt')
    # nltk.download('stopwords')
    sentences = nltk.sent_tokenize(text)
    words = nltk.word_tokenize(text.lower())
    stop_words = set(stopwords.words('polish'))
    filtered_words = [word for word in words if word.isalnum() and word not in stop_words]
    if not filtered_words:
        return ''
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([' '.join(filtered_words)])
    feature_names = vectorizer.get_feature_names_out()
    tfidf_scores = tfidf_matrix.toarray()[0]
    word_score_dict = dict(zip(feature_names, tfidf_scores))
    sorted_words = sorted(word_score_dict.items(), key=lambda item: item[1], reverse=True)
    keywords = [word for word, score in sorted_words[:num_keywords]]
    return ', '.join(keyword.lower() for keyword in keywords)