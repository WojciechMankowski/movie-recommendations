from dotenv import load_dotenv
from get_data import get_movie_api
from save_data import get_id_genere, get_id_movie
from supabase import create_client, Client
import os


def add_value(name_table: str, data: dict):
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    response = supabase.table(name_table).insert(data).execute()
    return response


def movie_exists(title: str, original_title: str) -> bool:
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    response = supabase.table('movies').select('*').eq('title', title).eq('original_title', original_title).execute()
    return len(response.data) > 0


def main():
    index = 0
    movies = get_movie_api()
    for movie in movies:
        print(movie)
        if movie_exists(movie['title'], movie['original_title']):
            print(f"Movie '{movie['title']}' already exists in the database. Skipping.")
            continue

        genres = movie['genre_ids']
        index += 1
        dict_data = {
            'title': movie['title'],
            'original_title': movie['original_title'],
            'original_language': movie['original_language'],
            'overview': movie['overview'],
            'popularity': movie['popularity'],
            'release_date': movie['release_date'] if movie['release_date'] else '1900-01-01',
            'vote_average': movie['vote_average'],
            'vote_count': movie['vote_count'],
            'keywords': movie['keywords'],
            'poster_path': movie['poster_path'],

        }
        add_value('movies', dict_data)
        id_movie = get_id_movie(movie['title'])
        for id_genere in genres:
            ids = get_id_genere(id_genere)
            data = {
                'movie_id': id_movie,
                'genre_id': ids
            }
            add_value('moviegenres', data)
    print(index)

if __name__ == '__main__':
    main()
