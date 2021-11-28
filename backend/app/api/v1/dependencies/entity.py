"""Entity dependencies."""
from uuid import UUID

from fastapi import Depends, HTTPException
from starlette import status

from app.api.v1.dependencies.google_authentication import get_token_data_dependency
from app.api.v1.dependencies.repo import (
    get_comment_repo_dependency,
    get_event_repo_dependency,
    get_moderator_repo_dependency,
)
from app.db.crud.comments.repo import CommentRepo
from app.db.crud.events.repo import EventRepo
from app.db.crud.moderators.repo import ModeratorRepo
from app.resources import strings
from app.schemas.comment import CommentSchema
from app.schemas.event import EventSchema
from app.schemas.user import UserSchema
from app.settings.config import get_app_settings

config = get_app_settings()


async def get_event(
    event_uuid: UUID,
    event_repo: EventRepo = get_event_repo_dependency,
    moderator_repo: ModeratorRepo = get_moderator_repo_dependency,
    user: UserSchema = get_token_data_dependency,
) -> EventSchema:
    event = await event_repo.get_event(event_uuid)
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=strings.EVENT_NOT_FOUND_ERROR,
        )

    moderators = await moderator_repo.get_all_moderators()
    moderators_uuids = [moderator.uuid for moderator in moderators]
    if (  # noqa: WPS337
        user.uuid != event.creator
        and user.email != config.ADMIN_EMAIL  # noqa: W503
        and user.uuid not in moderators_uuids  # noqa: W503
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=strings.ACCESS_DENIED_ERROR,
        )
    return event


get_event_dependency = Depends(get_event)


async def get_comment(
    comment_uuid: UUID,
    comment_repo: CommentRepo = get_comment_repo_dependency,
    moderator_repo: ModeratorRepo = get_moderator_repo_dependency,
    user: UserSchema = get_token_data_dependency,
) -> CommentSchema:
    comment = await comment_repo.get_comment(comment_uuid)
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=strings.COMMENT_NOT_FOUND_ERROR,
        )

    moderators = await moderator_repo.get_all_moderators()
    moderators_uuids = [moderator.uuid for moderator in moderators]
    if (  # noqa: WPS337
        user.uuid != comment.user_uuid
        and user.email != config.ADMIN_EMAIL  # noqa: W503
        and user.uuid not in moderators_uuids  # noqa: W503
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=strings.ACCESS_DENIED_ERROR,
        )
    return comment


get_comment_dependency = Depends(get_comment)
