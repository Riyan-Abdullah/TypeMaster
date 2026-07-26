from fastapi import APIRouter, Depends, status, HTTPException, Query
from typing import Optional
from app.utils.auth import get_current_user
from app.schemas.typing import TypingTestCreate, TypingTestResponse, UserStatsResponse, PaginatedHistoryResponse
from app.services.typing_service import TypingService

router = APIRouter(prefix="/api/tests", tags=["Typing Tests"])

@router.post("", response_model=TypingTestResponse, status_code=status.HTTP_201_CREATED)
@router.post("/", response_model=TypingTestResponse, status_code=status.HTTP_201_CREATED)
def save_test_result(
    payload: TypingTestCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Saves a completed typing test result for authenticated user.
    """
    try:
        user_id = current_user["id"]
        access_token = current_user.get("access_token")
        return TypingService.save_test(user_id=user_id, data=payload, access_token=access_token)
    except Exception as err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to save test result: {str(err)}"
        )

@router.get("/latest", response_model=TypingTestResponse)
def get_latest_test_result(
    current_user: dict = Depends(get_current_user)
):
    """
    Returns the most recent typing test result for authenticated user.
    """
    try:
        user_id = current_user["id"]
        access_token = current_user.get("access_token")
        return TypingService.get_latest_test(user_id=user_id, access_token=access_token)
    except Exception as err:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(err)
        )

@router.get("/stats", response_model=UserStatsResponse)
def get_user_stats(
    current_user: dict = Depends(get_current_user)
):
    """
    Returns dashboard statistics (Highest WPM, Avg WPM, Best Accuracy, Total Tests, Practice Time).
    """
    try:
        user_id = current_user["id"]
        access_token = current_user.get("access_token")
        return TypingService.get_user_stats(user_id=user_id, access_token=access_token)
    except Exception as err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to calculate stats: {str(err)}"
        )

@router.get("/history", response_model=PaginatedHistoryResponse)
def get_user_history(
    duration: Optional[str] = Query(None, description="Duration filter: all, 15, 30, 60"),
    sort_by: Optional[str] = Query("newest", description="Sort option: newest, oldest, highest_wpm, lowest_wpm"),
    search: Optional[str] = Query(None, description="Search term for date or duration"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=50, description="Items per page"),
    current_user: dict = Depends(get_current_user)
):
    """
    Returns paginated typing history with filtering, sorting, and search.
    """
    try:
        user_id = current_user["id"]
        access_token = current_user.get("access_token")
        return TypingService.get_user_history(
            user_id=user_id,
            duration=duration,
            sort_by=sort_by,
            search=search,
            page=page,
            page_size=page_size,
            access_token=access_token
        )
    except Exception as err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch history: {str(err)}"
        )
