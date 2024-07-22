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

def get_books():
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    return supabase.table('books').select("*").execute()
def get_genres(id):
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    return supabase.table('genres').select("name").eq('id', id).execute().data[0]


def create_df():
    data = get_movies().data
    return pd.DataFrame(data)
def create_df_books():
    data = get_books().data
    return pd.DataFrame(data)
def get_title():
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    return supabase.table('movies').select("title, moviegenres(genre_id)").execute()

def add_value(name_table: str, data: dict):
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    response = supabase.table(name_table).insert(data).execute()
    return response

def book_exists(title):
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    response = supabase.table('books').select('*').eq('title', title).execute()
    return len(response.data) > 0