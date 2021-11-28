import pytest
from pydantic import ValidationError

from app.settings.environments.test import AppSettings


def test_credentials_validation():
    AppSettings(
        DEBUG=True,
        SQL_DEBUG=True,
        POSTGRES_DSN="postgres://postgres:postgres@localhost/postgres",
        REDIS_DSN="redis://localhost/0",
        SECRET_KEY="secret",
        GOOGLE_CLIENT_ID="client_id",
        GOOGLE_CLIENT_SECRET="client_secret",
        ADMIN_EMAIL="example@email.com",
    )
    with pytest.raises(ValidationError):
        AppSettings(
            DEBUG=True,
            SQL_DEBUG=True,
            REDIS_DSN="redis://localhost/0",
        )
