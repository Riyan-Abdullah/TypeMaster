from fastapi import APIRouter, Depends
from app.utils.auth import get_current_user
from app.schemas.user import UserProfileResponse
from app.services.user_service import UserService

router = APIRouter(prefix="/api/user", tags=["User Profile"])

@router.get("/profile", response_model=UserProfileResponse)
def get_user_profile(current_user: dict = Depends(get_current_user)):
    """
    Get authenticated user profile details.
    """
    return UserService.get_user_profile(
        user_id=current_user["id"],
        email=current_user["email"],
        metadata=current_user.get("user_metadata", {}),
        access_token=current_user.get("access_token")
    )
