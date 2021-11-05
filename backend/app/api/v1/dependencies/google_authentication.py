"""Dependencies for google authentication."""
import json

from fastapi import Depends, HTTPException
from httpx import HTTPStatusError
from starlette import status

from app.api.v1.dependencies.domain_repo import get_user_repo_dependency
from app.db.crud.users.repo import UserRepo
from app.schemas.google.token import oauth2_scheme
from app.schemas.user import UserSchema
from app.services.api.google_api import GoogleApiAdapter
from app.settings.config import get_app_settings

config = get_app_settings()


def get_google_api_adapter() -> GoogleApiAdapter:
    return GoogleApiAdapter()


get_google_api_adapter_dependency = Depends(get_google_api_adapter)


async def get_token_data(
    token: str = Depends(oauth2_scheme),
    api_adapter: GoogleApiAdapter = get_google_api_adapter_dependency,
    user_repo: UserRepo = get_user_repo_dependency,
) -> UserSchema:
    credentials_exception = HTTPException(  # noqa: F841
        status_code=status.HTTP_403_FORBIDDEN, detail="Could not validate credentials"
    )
    token_data_dict = json.loads(token.replace("'", '"'))
    try:
        token_data = await api_adapter.get_token_data(token_data_dict["id_token"])
    except HTTPStatusError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

    return await user_repo.get_or_create_user_by_email(token_data)


get_token_data_dependency = Depends(get_token_data)
