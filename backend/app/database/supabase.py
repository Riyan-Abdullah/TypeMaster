import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
SUPABASE_ANON_KEY: str = os.getenv("SUPABASE_ANON_KEY", "")
SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

def get_supabase_client(access_token: str = None) -> Client:
    """
    Returns an initialized Supabase Client.
    If access_token is provided, authenticates postgrest requests for RLS evaluation.
    """
    key = SUPABASE_SERVICE_ROLE_KEY if SUPABASE_SERVICE_ROLE_KEY else SUPABASE_ANON_KEY
    client = create_client(SUPABASE_URL or "https://placeholder.supabase.co", key or "placeholder-key")
    if access_token:
        try:
            client.postgrest.auth(access_token)
        except Exception as err:
            print(f"Error setting postgrest auth header: {err}")
    return client
