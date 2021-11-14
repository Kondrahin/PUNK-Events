"""SQLAlchemy helpers."""

from typing import Any

from loguru import logger
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.settings.config import get_app_settings

POSTGRES_DSN = get_app_settings().POSTGRES_DSN
SQL_DEBUG = get_app_settings().SQL_DEBUG


def make_url_async(url: str) -> str:
    """Add +asyncpg to url scheme."""
    return "postgresql+asyncpg" + url[url.find(":") :]  # noqa: WPS336


def make_url_sync(url: str) -> str:
    """Remove +asyncpg from url scheme."""
    return "postgresql" + url[url.find(":") :]  # noqa: WPS336


Base = declarative_base()


class AsyncDatabaseSession:
    """Database session class."""

    def __init__(self) -> None:
        """Initialize."""
        self._engine: Any = None

    async def init(self) -> None:
        """Async initialization."""
        if not POSTGRES_DSN:
            logger.warning("Database NOT initialized")
            return
        self._engine = create_async_engine(make_url_async(POSTGRES_DSN), echo=SQL_DEBUG)

        self.make_session = sessionmaker(
            self._engine, expire_on_commit=False, class_=AsyncSession
        )

    async def close(self) -> None:
        assert self._engine is not None
        await self._engine.dispose()

    def get_session(self) -> Any:
        return self.make_session()


session_fabric = AsyncDatabaseSession()
