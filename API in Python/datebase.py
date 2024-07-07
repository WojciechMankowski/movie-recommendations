import os, csv
import pandas as pd
from supabase import create_client, Client
from dotenv import load_dotenv
from models import User


def add_value(name_table: str, data: dict | User):
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    response = supabase.table(name_table).insert(data).execute()
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
    response = supabase.table('users').select("*, usermovies(*)").execute()
    return response.data



def create_df():
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    response = supabase.table('movies').select("*, moviegenres(*), genres(*)").execute()
    all_data = []
    for item in response.data:
        print(item['genres'])
        item['genres'] = ", ".join(genre['name'] for genre in item['genres'])
        item.pop('moviegenres', None)
        print(item)
        all_data.append(item)
    return pd.DataFrame(all_data)



def get_movies():
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    return supabase.table('movies').select("*, moviegenres(*)").execute()


if __name__ == '__main__':
    df = create_df()
    print(df)
    print(type(df))
