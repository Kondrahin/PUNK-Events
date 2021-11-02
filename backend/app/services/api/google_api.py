"""Google api adapter."""
from httpx import AsyncClient

from app.schemas.google.token import GoogleTokenData


class GoogleApiAdapter:
    GOOGLE_API_BASE_URL = "https://oauth2.googleapis.com/"  # noqa: WPS115
    GET_TOKEN_INFO_SUFFIX = "tokeninfo"  # noqa: S105, WPS115

    def __init__(self) -> None:
        """Init client."""
        self.client = AsyncClient(base_url=self.GOOGLE_API_BASE_URL)

    async def get_token_data(self, id_token: str) -> GoogleTokenData:
        response = await self.client.get(
            self.GET_TOKEN_INFO_SUFFIX, params={"id_token": id_token}
        )
        return GoogleTokenData.from_api(response.json())
