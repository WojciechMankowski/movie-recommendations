import requests, time
from os import getenv
from dotenv import load_dotenv
from extract_keywords import extract_keywords
from supabase import create_client, Client
def load_supabase_client():
    load_dotenv()
    url: str = getenv("SUPABASE_URL")
    key: str = getenv("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    return supabase

def movie_exists(title: str, original_title: str, supabase: Client) -> bool:
    response = supabase.table('movies').select('*').eq('title', title).eq('original_title', original_title).execute()
    return len(response.data) > 0


def get_movie_api():
    load_dotenv()
    API_KEY = getenv('API_KEY')
    url = f'https://api.themoviedb.org/3/discover/movie?api_key={API_KEY}&language=pl-PL'
    all_movies = []
    index = 1
    supabase = load_supabase_client()

    while True:
        response = requests.get(f'{url}&page={index}')
        data = response.json()
        print(data)
        results = data['results']
        for movie in results:
            if movie_exists(movie['title'], movie['original_title'], supabase):
                print(f"Movie '{movie['title']}' already exists in the database. Skipping.")
                continue

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
                'genre_ids': movie['genre_ids']
            }
            all_movies.append(dict_data)

        index += 1
        if index == 499:
            break

    return all_movies


def get_genres():
    load_dotenv()
    API_KEY = getenv('API_KEY')
    BASE_URL = 'https://api.themoviedb.org/3'
    url = f'{BASE_URL}/genre/movie/list'
    params = {
        'api_key': API_KEY,
        'language': 'pl-PL'
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json().get('genres', [])
    else:
        print(f'Error: {response.status_code}')





if __name__ == '__main__':
    get_movie_api()
