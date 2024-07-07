import requests
from os import getenv
from dotenv import load_dotenv
from extract_keywords import extract_keywords
# def get_movie_api():
#     load_dotenv()
#     API_KEY = getenv('API_KEY')
#     BASE_URL = 'https://api.themoviedb.org/3'
#     url = f'{BASE_URL}/movie/now_playing'
#     params = {
#         'api_key': API_KEY,
#         'language': 'pl-Pl',
#         'page': 1
#     }
#     all_movies = []
#     while True:
#         response = requests.get(url, params=params).json()
#         all_movies.append(response['results'][0])
#         print(len(response['results'][0]))
#         if params['page'] >= response['total_pages']:
#             break
#         params['page'] += 1
#     return  all_movies

def get_movie_api():
    load_dotenv()
    API_KEY = getenv('API_KEY')
    url = f'https://api.themoviedb.org/3/discover/movie?api_key={API_KEY}&language=pl-PL'
    all_movies = []
    index = 1

    while True:
        response = requests.get(f'{url}&page={index}')
        data = response.json()

        results = data['results']
        for movie in results:
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
        if index == 250:
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