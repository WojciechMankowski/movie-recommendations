import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.neighbors import NearestNeighbors


def load_data(filepath):
    return pd.read_csv(filepath)


def preprocess_data(df):
    df_copy = df.copy()
    df_copy.loc[(df_copy['vote_average'] >= 0) & (df_copy['vote_average'] <= 1), 'rating_between'] = "between 0 and 1"
    df_copy.loc[(df_copy['vote_average'] > 1) & (df_copy['vote_average'] <= 2), 'rating_between'] = "between 1 and 2"
    df_copy.loc[(df_copy['vote_average'] > 2) & (df_copy['vote_average'] <= 3), 'rating_between'] = "between 2 and 3"
    df_copy.loc[(df_copy['vote_average'] > 3) & (df_copy['vote_average'] <= 4), 'rating_between'] = "between 3 and 4"
    df_copy.loc[(df_copy['vote_average'] > 4) & (df_copy['vote_average'] <= 5), 'rating_between'] = "between 4 and 5"
    df_copy.loc[(df_copy['vote_average'] > 5) & (df_copy['vote_average'] <= 6), 'rating_between'] = "between 5 and 6"
    df_copy.loc[(df_copy['vote_average'] > 6) & (df_copy['vote_average'] <= 7), 'rating_between'] = "between 6 and 7"
    df_copy.loc[(df_copy['vote_average'] > 7) & (df_copy['vote_average'] <= 8), 'rating_between'] = "between 7 and 8"
    df_copy.loc[(df_copy['vote_average'] > 8) & (df_copy['vote_average'] <= 9), 'rating_between'] = "between 8 and 9"
    df_copy.loc[(df_copy['vote_average'] > 9) & (df_copy['vote_average'] <= 10), 'rating_between'] = "between 9 and 10"

    rating_df = pd.get_dummies(df_copy['rating_between'])
    language_df = pd.get_dummies(df_copy['original_language'])

    df_copy['genres'] = df_copy['genres'].fillna('')
    df_copy['main_category'] = df_copy['genres'].apply(lambda x: x.split('-')[0])
    genres_df = pd.get_dummies(df_copy.main_category)

    features = pd.concat([rating_df, language_df, genres_df, df_copy['vote_average'], df_copy['vote_count']], axis=1)

    return features, df_copy[['title', 'main_category']]


def scale_features(features):
    min_max_scaler = MinMaxScaler()
    return min_max_scaler.fit_transform(features)


def train_knn_model(features, n_neighbors=10):
    knn = NearestNeighbors(n_neighbors=n_neighbors, algorithm='auto').fit(features)
    return knn


def recommend_movies(title, n_recommendations, knn, X, y):
    if title not in y['title'].values:
        return "Film nie znaleziony w bazie."

    idx = y[y['title'] == title].index[0]
    movie_features = X[idx].reshape(1, -1)

    distances, indices = knn.kneighbors(movie_features, n_neighbors=n_recommendations + 1)

    recommendations = []
    for i in range(1, len(indices[0])):
        recommendations.append(y.iloc[indices[0][i]].to_dict())

    return recommendations
