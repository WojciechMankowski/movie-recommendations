import requests

API_KEY = '063b44ede48c3329634e389ca6ee34f5'  # Wstaw tutaj swój klucz API TMDb
BASE_URL = 'https://api.themoviedb.org/3'

def get_latest_movies(api_key):
    url = f'{BASE_URL}/movie/now_playing'
    params = {
        'api_key': api_key,
        'language': 'en-US',
        'page': 1
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()['results']
    else:
        return None

def get_movie_details(movie_id, api_key):
    url = f'{BASE_URL}/movie/{movie_id}'
    params = {
        'api_key': api_key,
        'language': 'en-US'
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def main():
    movies = get_latest_movies(API_KEY)
    if movies:
        for movie in movies:
            movie_id = movie['id']
            title = movie['title']
            details = get_movie_details(movie_id, API_KEY)
            if details:
                print(details)
                rating = details.get('vote_average', 'No rating')
                # print(f'Title: {title}, Rating: {rating}')
    else:
        print('Failed to retrieve movies.')

if __name__ == '__main__':
    main()
