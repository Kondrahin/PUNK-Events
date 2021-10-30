"""Login Endpoints."""
from typing import Any, Union

from authlib.integrations.starlette_client import OAuth, OAuthError
from fastapi import APIRouter, HTTPException
from loguru import logger
from starlette import status
from starlette.config import Config
from starlette.requests import Request
from starlette.responses import HTMLResponse, RedirectResponse

from app.api.api_v1.dependencies.google_authentication import (
    get_google_api_adapter_dependency,
    get_token_data_dependency,
)
from app.schemas.user import UserSchema
from app.services.api.google_api import GoogleApiAdapter
from app.settings.config import get_app_settings

router = APIRouter()
config = get_app_settings()
google_config = Config(".env")
oauth = OAuth(google_config)


oauth.register(
    name="google",
    server_metadata_url=config.CONF_URL,
    client_kwargs={"scope": "openid email profile"},
)


@router.get("/")
async def homepage(request: Request) -> HTMLResponse:
    return HTMLResponse('<a href="/api_v1/login">login</a>')


@router.get("/login")
async def login(request: Request) -> None:
    redirect_uri = request.url_for("auth")
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/auth")
async def auth(
    request: Request, api_adapter: GoogleApiAdapter = get_google_api_adapter_dependency
) -> Union[HTMLResponse, RedirectResponse]:
    try:
        token = await oauth.google.authorize_access_token(request)
    except OAuthError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

    logger.warning(token)
    id_token = token["id_token"]
    await api_adapter.get_token_data(id_token)

    response = RedirectResponse(url="/api/v1")

    response.set_cookie(
        "Authorization",
        value=f"Bearer {token}",
        httponly=True,
        max_age=config.TOKEN_EXPIRES,
        expires=config.TOKEN_EXPIRES,
    )
    return response


@router.get("/logout")
async def logout(request: Request) -> RedirectResponse:
    response = RedirectResponse(url="/")
    response.delete_cookie("Authorization")
    return response


@router.get("/me")
async def read_users_me(user: UserSchema = get_token_data_dependency) -> Any:
    return user
