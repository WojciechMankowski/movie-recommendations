from datetime import datetime
from pydantic import BaseModel


class Movie(BaseModel):
    id: int
    title: str
    genres: str
    original_language: str
    overview: str
    popularity: float
    production_companies: str
    release_date: str
    budget: float
    revenue:   float
    runtime:   float
    status : str
    tagline : str
    vote_average:   float
    vote_count : int
    credits: str
    keywords: str
    poster_path: str
    backdrop_path: str
    recommendations: str

class UserMovie(BaseModel):
    user_id: str
    movie_id: str
    watched: bool = False

class User(BaseModel):
    name: str
    email: str
    password: str
    created_at: str | datetime = datetime.now()