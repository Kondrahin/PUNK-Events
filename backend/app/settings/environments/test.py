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

    ADMIN_EMAIL: str = "example@email.com"

    # Google authentication
    SECRET_KEY: str = "secret"
    GOOGLE_CLIENT_ID: str = "client_id"
    GOOGLE_CLIENT_SECRET: str = "client_secret"

    class Config(AppSettings.Config):  # noqa: WPS431
        env_file = ".env"
