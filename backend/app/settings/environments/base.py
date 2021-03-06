"""Base app settings."""

from enum import Enum

from pydantic import BaseSettings


class AppEnvTypes(str, Enum):  # noqa:WPS600, WPS115
    """Types of stages."""

    PROD: str = "prod"
    DEV: str = "dev"
    TEST: str = "test"


class BaseAppSettings(BaseSettings):
    """Allows to determine the current application environment."""

    APP_ENV: AppEnvTypes

    class Config:  # noqa: WPS431
        env_file = ".env"


class AppSettings(BaseAppSettings):
    """Main settings for splitting."""

    class Config:  # noqa: WPS431
        env_file = ".env"

    # base kwargs
    DEBUG: bool
    SQL_DEBUG: bool

    # storages
    POSTGRES_DSN: str
    REDIS_DSN: str

    ADMIN_EMAIL: str

    # Google authentication
    CONF_URL: str = "https://accounts.google.com/.well-known/openid-configuration"
    SECRET_KEY: str
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    TOKEN_EXPIRES: int = 1800
