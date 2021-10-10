"""App settings for test stage."""
from app.settings.environments.base import AppSettings


class TestAppSettings(AppSettings):
    """Application settings with override params for test environment."""

    # base kwargs
    DEBUG: bool = True
    SQL_DEBUG: bool = True
    # storages
    POSTGRES_DSN: str = "postgresql://postgres:postgres@localhost/postgres"
    REDIS_DSN: str = "redis://localhost/0"

    class Config(AppSettings.Config):  # noqa: WPS431
        env_file = ".env"
