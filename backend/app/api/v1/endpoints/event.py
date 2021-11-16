"""Event Endpoints."""
from typing import Any, Optional
from uuid import UUID

from fastapi import APIRouter, HTTPException
from starlette import status
from starlette.requests import Request

from app.api.v1.dependencies.domain_repo import get_event_repo_dependency
from app.api.v1.dependencies.google_authentication import get_token_data_dependency
from app.db.crud.events.repo import EventRepo
from app.resources import strings
from app.schemas.event import CreateUpdateEventSchema
from app.schemas.user import UserSchema
from app.settings.config import get_app_settings

router = APIRouter()
config = get_app_settings()


@router.post("/")
async def create_event(
    request: Request,
    event_data: CreateUpdateEventSchema,
    event_repo: EventRepo = get_event_repo_dependency,
    user: UserSchema = get_token_data_dependency,
) -> Any:
    event_uuid = await event_repo.create_event(event_data, user.uuid)
    return {"event_uuid": event_uuid}


@router.get("/")
async def get_event(
    request: Request,
    event_uuid: Optional[UUID] = None,
    event_repo: EventRepo = get_event_repo_dependency,
) -> Any:
    if not event_uuid:
        events = await event_repo.get_all_event()
        return {"events": events}

    event = await event_repo.get_event(event_uuid)
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=strings.EVENT_NOT_FOUND_ERROR,
        )
    return {"event": event}


@router.put("/")
async def update_event(
    request: Request,
    event_uuid: UUID,
    event_data: CreateUpdateEventSchema,
    event_repo: EventRepo = get_event_repo_dependency,
    user: UserSchema = get_token_data_dependency,
) -> Any:
    await event_repo.update_event(event_uuid, event_data)
    return {"event_uuid": event_uuid}


@router.delete("/")
async def delete_event(
    request: Request,
    event_uuid: UUID,
    event_repo: EventRepo = get_event_repo_dependency,
    user: UserSchema = get_token_data_dependency,
) -> Any:
    await event_repo.delete_event(event_uuid)
    return {"result": True}
