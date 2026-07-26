from pydantic import BaseModel, Field
from typing import List, Optional

class TypingTestCreate(BaseModel):
    duration: int = Field(..., description="Test duration in seconds (e.g. 15, 30, 60)")
    wpm: float = Field(..., ge=0, description="Words Per Minute score")
    accuracy: float = Field(..., ge=0, le=100, description="Accuracy percentage score")
    mistakes: int = Field(..., ge=0, description="Total mistakes count")

class TypingTestResponse(BaseModel):
    id: str
    user_id: str
    duration: int
    wpm: float
    accuracy: float
    mistakes: int
    created_at: str

    class Config:
        from_attributes = True

class UserStatsResponse(BaseModel):
    highest_wpm: Optional[float] = None
    average_wpm: Optional[float] = None
    best_accuracy: Optional[float] = None
    total_tests: int = 0
    total_practice_time_seconds: int = 0

class PaginatedHistoryResponse(BaseModel):
    items: List[TypingTestResponse] = []
    total: int = 0
    page: int = 1
    page_size: int = 10
    total_pages: int = 0
