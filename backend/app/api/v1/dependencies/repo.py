"""Repo dependencies."""

from fastapi import Depends

from app.db.crud.comments.repo import CommentRepo
from app.db.crud.events.repo import EventRepo
from app.db.crud.moderators.repo import ModeratorRepo
from app.db.crud.users.repo import UserRepo
from app.settings.config import get_app_settings

config = get_app_settings()

get_user_repo_dependency = Depends(UserRepo)
get_event_repo_dependency = Depends(EventRepo)
get_comment_repo_dependency = Depends(CommentRepo)
get_moderator_repo_dependency = Depends(ModeratorRepo)
