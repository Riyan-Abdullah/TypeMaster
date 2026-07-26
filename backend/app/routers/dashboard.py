from fastapi import APIRouter, Depends
from app.utils.auth import get_current_user
from app.schemas.dashboard import DashboardResponse
from app.services.dashboard_service import DashboardService

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("", response_model=DashboardResponse)
@router.get("/", response_model=DashboardResponse)
def get_dashboard(current_user: dict = Depends(get_current_user)):
    """
    Get protected dashboard data for the authenticated user.
    """
    return DashboardService.get_user_dashboard(
        user_id=current_user["id"],
        email=current_user["email"],
        metadata=current_user.get("user_metadata", {}),
        access_token=current_user.get("access_token")
    )
