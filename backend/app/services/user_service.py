from app.database.supabase import get_supabase_client
from app.schemas.user import UserProfileResponse
from datetime import datetime

class UserService:
    @staticmethod
    def get_user_profile(user_id: str, email: str, metadata: dict, access_token: str = None) -> UserProfileResponse:
        """
        Retrieves user profile from database. Fallbacks to Auth metadata if profile row isn't created yet.
        """
        try:
            supabase = get_supabase_client(access_token)
            res = supabase.table("profiles").select("*").eq("id", user_id).execute()
            if res.data and len(res.data) > 0:
                profile_data = res.data[0]
                return UserProfileResponse(
                    id=profile_data["id"],
                    full_name=profile_data.get("full_name") or metadata.get("full_name") or "TypeMaster User",
                    email=profile_data.get("email") or email,
                    created_at=str(profile_data.get("created_at") or datetime.utcnow().isoformat())
                )
        except Exception as err:
            print(f"Error fetching profile from Supabase profiles table: {err}")

        # Fallback using JWT metadata
        return UserProfileResponse(
            id=user_id,
            full_name=metadata.get("full_name") or "TypeMaster User",
            email=email,
            created_at=datetime.utcnow().isoformat()
        )
