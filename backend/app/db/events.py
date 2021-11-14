"""Functions to create and close connections to db."""
from typing import Optional

from starlette.datastructures import URL

from app.db.redis.repo import RedisRepo
from app.db.sqlalchemy import session_fabric


async def init_db() -> None:
    """Create connection to db and init orm models."""
    await session_fabric.init()


async def init_redis(
    redis_dsn: URL, prefix: Optional[str] = None, expire: Optional[int] = None
) -> RedisRepo:
    """Create connection to redis."""
    return await RedisRepo.init(dsn=redis_dsn, prefix=prefix, expire=expire)


async def close_redis(redis: Optional[RedisRepo]) -> None:
    """Close redis connections."""
    if redis:
        await redis.close()


async def close_db() -> None:
    """Close connection to db."""
    await session_fabric.close()
