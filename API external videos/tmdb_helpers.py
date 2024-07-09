from os import getenv
from dotenv import  load_dotenv
from tmdbv3api import Movie
from tmdbv3api import TMDb
from save_data import get_id_genere
from extract_keywords import extract_keywords
def get_all_movies():
    load_dotenv()
    API = getenv('API_KEY')

    tmdb = TMDb()
    tmdb.api_key = API
    tmdb.language = 'pl'
    tmdb.debug = True

    movie = Movie()
    all_movies = []
    page = 1
    while page <= 500:
        response = movie.popular(page=page)
        # genre_ids = response['genre_ids'
        all_movies.extend(response)
        page += 1

    return all_movies

def get_data(ids):
    genre = ''
    for id in ids:
        name = get_id_genere(id)
        genre += f"{name}, "
        # print(genre)
    return genre

def get_api_data():
    all_movies = get_all_movies()
    all = []
    for movie in all_movies:
        genre_ids = movie['genre_ids']
        dict_data = {
            'title': movie['title'],
            'original_title': movie['original_title'],
            'original_language': movie['original_language'],
            'overview': movie['overview'],
            'popularity': movie['popularity'],
            'release_date': movie['release_date'],
            'vote_average': movie['vote_average'],
            'vote_count': movie['vote_count'],
            'keywords': extract_keywords(movie['overview'], 20),
            'poster_path': movie['poster_path'],
            'genres': get_data(genre_ids)
        }
        all.extend(dict_data)
    return all




