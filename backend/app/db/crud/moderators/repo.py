"""User repo."""
from typing import List

from app.db.models import Moderator
from app.schemas.user import UserSchema


class ModeratorRepo:
    async def get_all_moderators(self) -> List[UserSchema]:
        users = await Moderator.all()
        return [UserSchema.from_orm(user) for user in users]
