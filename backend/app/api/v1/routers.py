"""Configuration of routers for all endpoints."""
from fastapi import APIRouter

from app.api.v1.endpoints import comment, event, login, user

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(login.router, tags=["login"])
api_router.include_router(user.router, prefix="/user", tags=["user"])
api_router.include_router(event.router, prefix="/events", tags=["events"])
api_router.include_router(comment.router, prefix="/comments", tags=["comments"])
