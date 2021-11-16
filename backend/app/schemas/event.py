"""Event schema."""
from datetime import datetime
from typing import Any, List, Optional
from uuid import UUID

from pydantic import BaseModel

from app.schemas.comment import CommentSchema
from app.schemas.user import UserSchema


class CreateUpdateEventSchema(BaseModel):
    title: str
    description: Optional[str]
    location: str
    scope: Any
    event_datetime: datetime


class EventSchema(BaseModel):
    uuid: UUID
    creator: UUID
    title: str
    description: Optional[str]
    location: str
    scope: Any
    event_datetime: datetime
    participants: List[UserSchema]
    comments: List[CommentSchema]

    class Config:
        orm_mode = True
