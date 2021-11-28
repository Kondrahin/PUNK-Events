"""Comment Endpoints."""
from typing import Any
from uuid import UUID

from fastapi import APIRouter, Body, HTTPException
from starlette import status
from starlette.requests import Request

from app.api.v1.dependencies.entity import get_comment_dependency
from app.api.v1.dependencies.google_authentication import get_token_data_dependency
from app.api.v1.dependencies.repo import get_comment_repo_dependency
from app.db.crud.comments.repo import CommentRepo
from app.resources import strings
from app.schemas.comment import CommentSchema
from app.schemas.user import UserSchema

router = APIRouter()


@router.post("/")
async def create_comment(
    request: Request,
    event_uuid: UUID,
    comment_data: str = Body(...),
    comment_repo: CommentRepo = get_comment_repo_dependency,
    user: UserSchema = get_token_data_dependency,
) -> Any:
    comment_uuid = await comment_repo.create_comment(
        event_uuid, comment_data, user.uuid
    )
    if not comment_uuid:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=strings.EVENT_NOT_FOUND_ERROR,
        )
    return {"comment_uuid": comment_uuid}


@router.get("/")
async def get_comment(
    request: Request,
    comment_uuid: UUID,
    comment_repo: CommentRepo = get_comment_repo_dependency,
    user: UserSchema = get_token_data_dependency,
) -> Any:
    comment = await comment_repo.get_comment(comment_uuid)
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=strings.COMMENT_NOT_FOUND_ERROR,
        )
    return {"comment": comment}


@router.delete("/")
async def delete_comment(
    request: Request,
    comment_uuid: UUID,
    comment: CommentSchema = get_comment_dependency,
    user: UserSchema = get_token_data_dependency,
    comment_repo: CommentRepo = get_comment_repo_dependency,
) -> Any:
    await comment_repo.delete_comment(comment_uuid)
    return {"result": True}
