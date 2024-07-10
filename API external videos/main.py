from dotenv import load_dotenv
from get_data import get_movie_api
from tmdb_helpers import get_api_data
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
    print('response', response)
    return len(response.data) > 0


def main():
    index = 0
    movies = get_api_data()
    for movie in movies:
        if movie_exists(movie['title'], movie['original_title']):
            print(f"Movie '{movie['title']}' already exists in the database. Skipping.")
            continue
        add_value('movies', movie)

    print(index)

if __name__ == '__main__':
    main()
