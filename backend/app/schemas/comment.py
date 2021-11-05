"""Comment schema."""
from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class CommentSchema(BaseModel):
    uuid: UUID
    user_uuid: UUID
    created_datetime: datetime
    data: str  # noqa: WPS110
    event_uuid: UUID

    class Config:  # noqa: WPS431
        orm_mode = True
