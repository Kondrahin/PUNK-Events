"""Comment repo."""
import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.exc import IntegrityError, NoResultFound

from app.db.models import Comment
from app.schemas.comment import CommentSchema


class CommentRepo:
    async def create_comment(
        self, event_uuid: UUID, comment_data: str, author_uuid: UUID
    ) -> Optional[UUID]:
        comment_uuid = uuid.uuid4()
        try:
            await Comment.create(
                uuid=comment_uuid,
                data=comment_data,
                user_uuid=author_uuid,
                event_uuid=event_uuid,
                created_datetime=datetime.now(),
            )
        except IntegrityError:
            return None

        return comment_uuid

    async def get_comment(
        self,
        comment_uuid: UUID,
    ) -> Optional[CommentSchema]:
        try:
            comment = await Comment.get(uuid=comment_uuid)
        except NoResultFound:
            return None

        return CommentSchema.from_orm(comment)

    async def delete_comment(
        self,
        comment_uuid: UUID,
    ) -> None:
        await Comment.delete(
            Comment.uuid,
            comment_uuid,
        )
