import requests, time, os
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
def add_value(name_table: str, data: dict):
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    response = supabase.table(name_table).insert(data).execute()
    return response

def get_id_genere(id):
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    result = supabase.from_('genres').select('name').eq('id_generes', id).execute()
    return result.data[0]['name']
def get_data(ids):
    genre = ''
    for id in ids:
        name = get_id_genere(id)
        genre += f"{name}, "
        # print(genre)
    return genre

def get_movie_api():
    load_dotenv()
    API_KEY = getenv('API_KEY')
    all_movies = []
    supabase = load_supabase_client()
    for index in range(1, 501):
        url = f'https://api.themoviedb.org/3/discover/movie?api_key={API_KEY}&language=pl-PL'
        response = requests.get(f'{url}&page={index}')
        for movie in response.json()['results']:
            if movie_exists(movie['title'], movie['original_title'], supabase):
                continue
            dict_data = {
                'title': movie['title'],
                'original_title': movie['original_title'],
                'original_language': movie['original_language'],
                'overview': movie['overview'],
                'popularity': movie['popularity'],
                'release_date': movie['release_date'] if movie['release_date'] else '1900-01-01',
                'vote_average': movie['vote_average'],
                'vote_count': movie['vote_count'],
                'keywords': extract_keywords(movie['overview'], 20),
                'poster_path': movie['poster_path'],
                'genres': get_data(movie['genre_ids'])
            }
            print(dict_data)
            all_movies.extend(dict_data)
            add_value('movies', data=dict_data)

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
