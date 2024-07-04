import os, csv
import pandas as pd
from supabase import create_client, Client
from dotenv import load_dotenv



def add_value(name_table: str, data: dict):
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    response = (
        supabase.table(name_table)
        .insert(data)
        .execute()
    )
    return response

def get_movie(name_table='movies'):
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    response = supabase.table(name_table).select("*").execute()
    return response

def get_data_user():
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    response = supabase.table('users').select("*").execute()
    return response

def get_data_user_witch_relaction():
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    response = supabase.table('users').select("*, usermovies(id)").execute()
    return response

def insert_data_movie(file_path: str):
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    with open(file_path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            # Konwersja pustych wartości na None dla pól liczbowych
            budget = float(row["budget"]) if row["budget"] else None
            revenue = float(row["revenue"]) if row["revenue"] else None
            vote_average = float(row["vote_average"]) if row["vote_average"] else None
            vote_count = row["vote_count"] if row["vote_count"] else None

            movie_data = {
                "title": row["title"],
                "genres": row["genres"],
                "original_language": row["original_language"],
                "overview": row["overview"],
                "popularity": float(row["popularity"]) if row["popularity"] else None,
                "production_companies": row["production_companies"],
                "release_date": row["release_date"] if row['release_date']  else None,
                "budget": budget,
                "revenue": revenue,
                "runtime": float(row["runtime"]) if row["runtime"] else None,
                "status": row["status"],
                "tagline": row["tagline"],
                "vote_average": vote_average,
                "vote_count": vote_count,
                "credits": row["credits"],
                "keywords": row["keywords"],
                "poster_path": row["poster_path"],
                "backdrop_path": row["backdrop_path"],
                "recommendations": row["recommendations"]
            }

            existing_movie = supabase.table('movies').select('id').eq('title', movie_data["title"]).execute()
            if existing_movie.data:
                continue
            else:
                print(movie_data)
            response = supabase.table('movies').insert(movie_data).execute()
            print(response)

def create_df():
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    response = supabase.table('movies').select("*").execute()
    return pd.DataFrame(response.data)


if __name__ == '__main__':
    file = '../data/movies.csv'
    insert_data_movie(file)