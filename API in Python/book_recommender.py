import pandas as pd
from datebase import create_df_books  # Assuming this is your own function
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.neighbors import NearestNeighbors


def load_data():
    df = create_df_books()
    selected_columns = ['title', 'authors', 'published_date', 'description', 'page_count', 'categories', 'language']
    df = df[selected_columns]
    return df


def preprocess_data(df):
    df['main_category'] = df['categories'].apply(lambda x: x.split(' ')[0])
    genres_df = pd.get_dummies(df.main_category)
    authors_df = pd.get_dummies(df.authors)
    language_df = pd.get_dummies(df.language)
    features = pd.concat([language_df, genres_df, authors_df], axis=1)

    min_max_scaler = MinMaxScaler()
    features = min_max_scaler.fit_transform(features)

    X = features
    y = df[['title', 'main_category']]

    return X, y


def train_model(X_train):
    """
    Trains the Nearest Neighbors model using X_train.
    Returns the trained model (knn).
    """
    n_neighbors = 10
    knn = NearestNeighbors(n_neighbors=n_neighbors, algorithm='auto').fit(X_train)
    return knn

def to_dict(df):
    row_dict ={}
    for index, row in df.iterrows():
        for column in df.columns:
            row_dict[column] = row[column]
    return row_dict

def recommend_movies(knn, X_train, y_train, title, df, n_recommendations=5):
    if title not in y_train['title'].values:
        return "Film nie znaleziony w bazie treningowej."

    idx = y_train[y_train['title'] == title].index[0]
    book_features = X_train[idx].reshape(1, -1)
    distances, indices = knn.kneighbors(book_features, n_neighbors=n_recommendations + 1)

    all_data = []
    for i in range(1, len(indices[0])):
        recommended_title = y_train.iloc[indices[0][i]]['title']
        data = df[df['title'] == recommended_title]
        data = data.fillna('')
        all_data.append(to_dict(data))
    return all_data


def main():
    df = load_data()
    X, y = preprocess_data(df)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    knn = train_model(X_train)

    title = "Harry Potter i Kamień Filozoficzny"
    recommendations = recommend_movies(knn, X_train, y_train, title, df, n_recommendations=10)

    for items in recommendations:
        print(items)







