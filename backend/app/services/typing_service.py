from app.database.supabase import get_supabase_client
from app.schemas.typing import TypingTestCreate, TypingTestResponse, UserStatsResponse, PaginatedHistoryResponse
from datetime import datetime
import uuid
import math

class TypingService:
    @staticmethod
    def save_test(user_id: str, data: TypingTestCreate, access_token: str = None) -> TypingTestResponse:
        """
        Saves completed typing test result to Supabase typing_tests table.
        """
        created_at_str = datetime.utcnow().isoformat()
        new_id = str(uuid.uuid4())

        record = {
            "id": new_id,
            "user_id": user_id,
            "duration": data.duration,
            "wpm": round(data.wpm, 2),
            "accuracy": round(data.accuracy, 2),
            "mistakes": data.mistakes,
            "created_at": created_at_str
        }

        try:
            supabase = get_supabase_client(access_token)
            res = supabase.table("typing_tests").insert(record).execute()
            if res.data and len(res.data) > 0:
                inserted = res.data[0]
                return TypingTestResponse(
                    id=str(inserted.get("id", new_id)),
                    user_id=str(inserted.get("user_id", user_id)),
                    duration=int(inserted.get("duration", data.duration)),
                    wpm=float(inserted.get("wpm", data.wpm)),
                    accuracy=float(inserted.get("accuracy", data.accuracy)),
                    mistakes=int(inserted.get("mistakes", data.mistakes)),
                    created_at=str(inserted.get("created_at", created_at_str))
                )
        except Exception as err:
            print(f"Database insert error: {err}")

        return TypingTestResponse(
            id=new_id,
            user_id=user_id,
            duration=data.duration,
            wpm=data.wpm,
            accuracy=data.accuracy,
            mistakes=data.mistakes,
            created_at=created_at_str
        )

    @staticmethod
    def get_latest_test(user_id: str, access_token: str = None) -> TypingTestResponse:
        """
        Retrieves the most recent typing test result for user.
        """
        try:
            supabase = get_supabase_client(access_token)
            res = supabase.table("typing_tests") \
                .select("*") \
                .eq("user_id", user_id) \
                .order("created_at", desc=True) \
                .limit(1) \
                .execute()

            if res.data and len(res.data) > 0:
                item = res.data[0]
                return TypingTestResponse(
                    id=str(item["id"]),
                    user_id=str(item["user_id"]),
                    duration=int(item["duration"]),
                    wpm=float(item["wpm"]),
                    accuracy=float(item["accuracy"]),
                    mistakes=int(item["mistakes"]),
                    created_at=str(item["created_at"])
                )
        except Exception as err:
            print(f"Database select error: {err}")

        raise Exception("No recent test results found for user.")

    @staticmethod
    def get_user_stats(user_id: str, access_token: str = None) -> UserStatsResponse:
        """
        Calculates aggregate statistics for user dashboard.
        """
        try:
            supabase = get_supabase_client(access_token)
            res = supabase.table("typing_tests").select("*").eq("user_id", user_id).execute()

            if res.data and len(res.data) > 0:
                tests = res.data
                total_tests = len(tests)
                highest_wpm = max(float(t.get("wpm", 0)) for t in tests)
                avg_wpm = round(sum(float(t.get("wpm", 0)) for t in tests) / total_tests, 2)
                best_accuracy = max(float(t.get("accuracy", 0)) for t in tests)
                total_practice_time = sum(int(t.get("duration", 0)) for t in tests)

                return UserStatsResponse(
                    highest_wpm=highest_wpm,
                    average_wpm=avg_wpm,
                    best_accuracy=best_accuracy,
                    total_tests=total_tests,
                    total_practice_time_seconds=total_practice_time
                )
        except Exception as err:
            print(f"Error fetching stats from Supabase: {err}")

        return UserStatsResponse(
            highest_wpm=None,
            average_wpm=None,
            best_accuracy=None,
            total_tests=0,
            total_practice_time_seconds=0
        )

    @staticmethod
    def get_user_history(
        user_id: str,
        duration: str = None,
        sort_by: str = "newest",
        search: str = None,
        page: int = 1,
        page_size: int = 10,
        access_token: str = None
    ) -> PaginatedHistoryResponse:
        """
        Retrieves paginated history for user with sorting, filtering, and search.
        """
        try:
            supabase = get_supabase_client(access_token)
            res = supabase.table("typing_tests").select("*").eq("user_id", user_id).execute()

            items = res.data or []

            # Filter by duration if specified
            if duration and duration != "all":
                try:
                    dur_val = int(duration)
                    items = [t for t in items if int(t.get("duration", 0)) == dur_val]
                except ValueError:
                    pass

            # Search filter (by date or duration text)
            if search and search.strip():
                query = search.strip().lower()
                filtered = []
                for t in items:
                    date_str = str(t.get("created_at", "")).lower()
                    dur_str = f"{t.get('duration', '')}s".lower()
                    wpm_str = f"{t.get('wpm', '')} wpm".lower()
                    if query in date_str or query in dur_str or query in wpm_str:
                        filtered.append(t)
                items = filtered

            # Sorting
            if sort_by == "oldest":
                items.sort(key=lambda x: str(x.get("created_at", "")))
            elif sort_by == "highest_wpm":
                items.sort(key=lambda x: float(x.get("wpm", 0)), reverse=True)
            elif sort_by == "lowest_wpm":
                items.sort(key=lambda x: float(x.get("wpm", 0)))
            else:  # newest (default)
                items.sort(key=lambda x: str(x.get("created_at", "")), reverse=True)

            total = len(items)
            total_pages = max(1, math.ceil(total / page_size))
            start_idx = (page - 1) * page_size
            end_idx = start_idx + page_size
            page_items = items[start_idx:end_idx]

            response_items = [
                TypingTestResponse(
                    id=str(t["id"]),
                    user_id=str(t["user_id"]),
                    duration=int(t["duration"]),
                    wpm=float(t["wpm"]),
                    accuracy=float(t["accuracy"]),
                    mistakes=int(t["mistakes"]),
                    created_at=str(t["created_at"])
                )
                for t in page_items
            ]

            return PaginatedHistoryResponse(
                items=response_items,
                total=total,
                page=page,
                page_size=page_size,
                total_pages=total_pages
            )
        except Exception as err:
            print(f"Error fetching typing history from Supabase: {err}")

        return PaginatedHistoryResponse(
            items=[],
            total=0,
            page=1,
            page_size=page_size,
            total_pages=0
        )
