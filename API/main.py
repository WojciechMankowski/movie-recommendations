from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datebase import get_movie, get_data_user, get_data_user_witch_relaction, create_df
from typing import List
from models import Movie
import movie_recommender as recommender

# m,A@4jKTL#Bi8+5
# Inicjalizacja aplikacji FastAPI

app = FastAPI()

# Wczytanie i przetwarzanie danych
df = create_df()

class MovieRequest(BaseModel):
    title: str
    n_recommendations: int = 5

@app.get("/")
def read_root():
    return {"message": "Welcome to the Movie Recommendation API"}

@app.get("/recommend/{title}")
def get_recommendations(title: str,number_recommendations: None | int = 5):
    features, y = recommender.preprocess_data(df)
    features = recommender.scale_features(features)
    knn = recommender.train_knn_model(features)
    recommendations = recommender.recommend_movies(title,
                                                   number_recommendations, knn,
                                                   features,
                                                   y, df)
    if isinstance(recommendations, str):
        raise HTTPException(status_code=404, detail=recommendations)
    return {"recommendations": recommendations}



@app.get("/movies")
def get_movies():
    data = get_movie()
    return data
# doc http://127.0.0.1:8000/docs
# Uruchomienie serwera: uvicorn main:app --reload
