import os
from supabase import create_client, Client
from dotenv import load_dotenv

def get_id_movie(title):
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    result = supabase.from_('movies').select('id').eq('title', title).execute()
    if len(result.data) != 0:
        return result.data[0]['id']
    else:
        return []

def get_id_genere(id):
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    result = supabase.from_('genres').select('id').eq('id_generes', id).execute()
    return result.data[0]['id']