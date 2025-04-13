# app/models/post.py

from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional


class PostCreate(BaseModel):
    text: str
    media_url: Optional[str] = None
    tags: Optional[List[str]] = []
    scheduled_time: datetime


class PostOut(BaseModel):
    id: int
    text: str
    media_url: Optional[str]
    tags: List[str]
    scheduled_time: datetime
    created_at: datetime
