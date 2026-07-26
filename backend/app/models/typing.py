from dataclasses import dataclass
from datetime import datetime

@dataclass
class TypingTest:
    id: str
    user_id: str
    duration: int
    wpm: float
    accuracy: float
    mistakes: int
    created_at: datetime
