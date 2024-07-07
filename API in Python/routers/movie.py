from fastapi import APIRouter, HTTPException
from datebase import get_movies as get_movie, create_df
from movie_recommender import *

router = APIRouter()


@router.get("/")
def get_movies():
    return [data for data in get_movie().data]


@router.get("/recommend/{title}")
def get_recommendations(title: str, number_recommendations: None | int = 5):
    df = create_df()
    features, y = preprocess_data(df)
    features = scale_features(features)
    knn = train_knn_model(features)
    recommendations = recommend_movies(title,
                                       number_recommendations, knn,
                                       features,
                                       y, df)

    if isinstance(recommendations, str):
        raise HTTPException(status_code=404, detail=recommendations)
    return  recommendations
