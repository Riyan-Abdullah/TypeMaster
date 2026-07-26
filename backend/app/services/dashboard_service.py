from app.schemas.dashboard import DashboardResponse
from app.services.user_service import UserService

class DashboardService:
    @staticmethod
    def get_user_dashboard(user_id: str, email: str, metadata: dict, access_token: str = None) -> DashboardResponse:
        """
        Builds Phase 1 Dashboard payload with user details and empty stats (ready for Phase 2).
        """
        profile = UserService.get_user_profile(user_id, email, metadata, access_token)
        welcome_msg = f"Welcome back, {profile.full_name}!"

        return DashboardResponse(
            welcome_message=welcome_msg,
            user=profile,
            highest_wpm=None,
            average_wpm=None,
            best_accuracy=None,
            recent_tests=[]
        )
