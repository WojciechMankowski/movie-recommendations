import os
import pandas as pd
from supabase import create_client, Client
from dotenv import load_dotenv


def get_movies():
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    return supabase.table('movies').select("*").execute()

def get_genres(id):
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    return supabase.table('genres').select("name").eq('id', id).execute().data[0]


def create_df():
    data = get_movies().data
    return pd.DataFrame(data)

def get_title():
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    return supabase.table('movies').select("title, moviegenres(genre_id)").execute()