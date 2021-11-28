"""Moderator route."""
from typing import Any

from fastapi import APIRouter
from starlette.requests import Request

from app.api.v1.dependencies.google_authentication import get_token_data_dependency
from app.api.v1.dependencies.repo import get_moderator_repo_dependency
from app.db.crud.moderators.repo import ModeratorRepo
from app.schemas.user import UserSchema
from app.settings.config import get_app_settings

router = APIRouter()
config = get_app_settings()


@router.get("/")
async def get_all_moderators(
    request: Request,
    moderator_repo: ModeratorRepo = get_moderator_repo_dependency,
    user: UserSchema = get_token_data_dependency,
) -> Any:
    moderators = await moderator_repo.get_all_moderators()
    return {"moderators": moderators}
