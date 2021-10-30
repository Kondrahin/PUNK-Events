"""User schemas."""
from uuid import UUID

from pydantic import BaseModel, EmailStr

from app.db.models import User


class UserSchema(BaseModel):
    uuid: UUID
    email: EmailStr
    full_name: str

    @classmethod
    def from_orm(cls, raw_user: User) -> "UserSchema":
        return cls(
            uuid=raw_user.uuid, email=raw_user.email, full_name=raw_user.full_name
        )
