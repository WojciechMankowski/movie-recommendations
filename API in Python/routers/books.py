from fastapi import APIRouter, HTTPException
from book_recommender import *
router = APIRouter()

@router.get("/books/{title}")
def get_data(title: str, number_recommendations: None | int = 6):
    df = load_data()
    X, y = preprocess_data(df)
    knn = train_model(X)
    recommendations = recommend_movies(knn, X, y, title, df, n_recommendations=number_recommendations)
    if isinstance(recommendations, str):
        raise HTTPException(status_code=404, detail=recommendations)
    return recommendations
