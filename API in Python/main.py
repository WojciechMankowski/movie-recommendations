from fastapi import FastAPI
from routers.user import router as router_user
from routers.movie import router as router_movie

app = FastAPI()
app.include_router(router_user)
app.include_router(router_movie)

# doc http://127.0.0.1:8000/docs
# Uruchomienie serwera: uvicorn main:app --reload
