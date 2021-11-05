"""
Functions wrappers for startup and shutdown events for server.

For more info see https://fastapi.tiangolo.com/advanced/events/
"""
from typing import Callable

from app.db.events import close_db, close_redis, init_db, init_redis
from app.settings.logger import configure_logger


def startup(redis_dsn: str, redis_prefix: str) -> Callable:
    """
    Create startup events handler.

    Should be run before the app starts. Here should be init for db, redis, etc.
    """

    async def start_app() -> None:  # noqa: WPS430
        configure_logger()
        await init_db()
        await init_redis(redis_dsn, redis_prefix)

    return start_app


def shutdown() -> Callable:
    """
    Shutdown events handler.

    Should be run when the app is shutting down. Here should close db, redis, etc.
    """

    async def stop_app() -> None:  # noqa: WPS430
        await close_db()
        await close_redis(redis=None)

    return stop_app
