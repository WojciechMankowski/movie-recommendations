from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import movie_recommender as recommender

# Inicjalizacja aplikacji FastAPI
app = FastAPI()

# Wczytanie i przetwarzanie danych
df = recommender.load_data('../data/movies.csv')


# Model Pydantic do walidacji danych wejściowych
class MovieRequest(BaseModel):
    title: str
    n_recommendations: int = 5

@app.get("/")
def read_root():
    return {"message": "Welcome to the Movie Recommendation API"}

@app.get("/recommend")
def get_recommendations(request: MovieRequest):
    features, y = recommender.preprocess_data(df)
    features = recommender.scale_features(features)
    knn = recommender.train_knn_model(features)
    recommendations = recommender.recommend_movies(request.title, request.n_recommendations, knn, features, y)
    if isinstance(recommendations, str):
        raise HTTPException(status_code=404, detail=recommendations)
    return {"recommendations": recommendations}

# Uruchomienie serwera: uvicorn main:app --reload
