"""App settings for development stage."""

from app.settings.environments.base import AppSettings


class DevAppSettings(AppSettings):
    """Application settings with override params for dev environment."""

    # base kwargs
    DEBUG: bool = False
    SQL_DEBUG: bool = False

    # storages
    POSTGRES_DSN: str = (
        "postgresql+asyncpg://postgres:postgres@localhost/punk_events_dev"
    )
    REDIS_DSN: str = "redis://localhost/0"

    ADMIN_EMAIL: str = "st076704@student.spbu.ru"

    class Config(AppSettings.Config):  # noqa: WPS431
        env_file = ".env"
