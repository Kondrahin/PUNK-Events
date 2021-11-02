"""User schemas."""
from uuid import UUID

from pydantic import BaseModel, EmailStr


class UserSchema(BaseModel):
    uuid: UUID
    email: EmailStr
    full_name: str

    class Config:  # noqa: WPS431
        orm_mode = True
