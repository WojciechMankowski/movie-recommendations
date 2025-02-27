from fastapi import FastAPI, HTTPException
from datebase import create_df
from movie_recommender import preprocess_data, scale_features, train_knn_model, recommend_movies
from routers.books import router
app = FastAPI()
app.include_router(router, tags=['books'])
@app.get("/{title}")
def get_recommendations(title: str, number_recommendations: None | int = 6):
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

# doc http://127.0.0.1:8000/docs
# Uruchomienie serwera: uvicorn main:app --reload
