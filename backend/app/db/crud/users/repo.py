"""User repo."""
import uuid

from sqlalchemy.exc import NoResultFound

from app.db.models import User
from app.schemas.google.token import GoogleTokenData
from app.schemas.user import UserSchema


class UserRepo:
    async def get_or_create_user_by_email(self, token: GoogleTokenData) -> UserSchema:
        try:
            user = await User.get(email=token.email)
        except NoResultFound:
            await User.create(
                uuid=uuid.uuid4(), email=token.email, full_name=token.name
            )
            user = await User.get(email=token.email)

        return UserSchema.from_orm(user)
