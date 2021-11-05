"""Schemas for token."""
from typing import Dict, Optional

from fastapi import HTTPException
from fastapi.security.oauth2 import (
    OAuth2,
    OAuthFlowsModel,
    get_authorization_scheme_param,
)
from pydantic import BaseModel, EmailStr
from starlette.requests import Request
from starlette.status import HTTP_403_FORBIDDEN


class OAuth2PasswordBearerCookie(OAuth2):
    def __init__(
        self,
        token_url: str,
        scheme_name: str = None,
        scopes: dict = None,
        auto_error: bool = True,
    ):
        if not scopes:
            scopes = {}
        flows = OAuthFlowsModel(password={"tokenUrl": token_url, "scopes": scopes})
        super().__init__(flows=flows, scheme_name=scheme_name, auto_error=auto_error)

    async def __call__(self, request: Request) -> Optional[str]:
        header_authorization: str = request.headers.get("Authorization")
        cookie_authorization: str = request.cookies.get("Authorization")

        header_scheme, header_param = get_authorization_scheme_param(
            header_authorization
        )
        cookie_scheme, cookie_param = get_authorization_scheme_param(
            cookie_authorization
        )

        if header_scheme.lower() == "bearer":
            authorization = True
            scheme = header_scheme
            param = header_param  # noqa: WPS110

        elif cookie_scheme.lower() == "bearer":
            authorization = True
            scheme = cookie_scheme
            param = cookie_param  # noqa: WPS110

        else:
            authorization = False

        if not authorization or scheme.lower() != "bearer":
            if self.auto_error:
                raise HTTPException(
                    status_code=HTTP_403_FORBIDDEN, detail="Not authenticated"
                )

            return None

        return param


oauth2_scheme = OAuth2PasswordBearerCookie(token_url="/api/v1/auth")  # noqa: S106


class GoogleTokenData(BaseModel):
    email: EmailStr
    name: str

    @classmethod
    def from_api(cls, raw_token_data: Dict) -> "GoogleTokenData":
        return cls(email=raw_token_data["email"], name=raw_token_data["name"])
