"""User route."""
from typing import Any
from uuid import UUID

from fastapi import APIRouter
from starlette.requests import Request

from app.api.v1.dependencies.domain_repo import get_user_repo_dependency
from app.api.v1.dependencies.google_authentication import get_token_data_dependency
from app.db.crud.users.repo import UserRepo
from app.schemas.user import UserSchema
from app.settings.config import get_app_settings

router = APIRouter()
config = get_app_settings()


@router.get("/")
async def get_user(
    request: Request,
    user_uuid: UUID,
    user_repo: UserRepo = get_user_repo_dependency,
    user: UserSchema = get_token_data_dependency,
) -> Any:
    user = await user_repo.get_user_by_uuid(user_uuid)
    return {"user": user}
