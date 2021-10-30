"""Configuration of routers for all endpoints."""
from fastapi import APIRouter

from app.api.api_v1.endpoints import login

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(login.router, tags=["login"])
