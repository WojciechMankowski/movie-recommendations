from extract_keywords import extract_keywords
import os
from API.datebase import add_value
from supabase import create_client, Client
from dotenv import load_dotenv
from get_data import get_movie_api

def get_id_movie(title):
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    result = supabase.from_('movies').select('id').eq('title', title).execute()
    print(result)
    return result.data[0]['id']

def get_id_genere(id):
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    result = supabase.from_('genres').select('id').eq('id_generes', id).execute()
    return result.data[0]['id']

def main():
    movies = get_movie_api()
    for movie in movies:
        print(movie)
        genres = movie['genre_ids']
        data = {
            'title': movie['title'],
            'original_title': movie['original_title'],
            "overview": movie['overview'],
            'keywords':  extract_keywords(movie['overview'], 20),
            'popularity': movie['popularity'],
            'original_language': movie['original_language'],
            'poster_path': movie['poster_path'],
            'release_date': movie['release_date'] ,
            'vote_average': movie['vote_average'],
            'vote_count': movie['vote_count'],

        }

        add_value('movies', data)
        id_movie =get_id_movie(movie['title'])
        for id_genere in genres:
            ids = get_id_genere(id_genere)
            data = {
                'movie_id': id_movie,
                'genre_id': ids
            }
            add_value('moviegenres', data)