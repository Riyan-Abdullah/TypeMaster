from pydantic import BaseModel
from typing import List, Optional
from app.schemas.user import UserProfileResponse

class RecentTestItem(BaseModel):
    id: str
    wpm: float
    accuracy: float
    duration_seconds: int
    created_at: str

class DashboardResponse(BaseModel):
    welcome_message: str
    user: UserProfileResponse
    highest_wpm: Optional[float] = None
    average_wpm: Optional[float] = None
    best_accuracy: Optional[float] = None
    recent_tests: List[RecentTestItem] = []
