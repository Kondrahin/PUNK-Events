import httpx
import pytest
from asgi_lifespan import LifespanManager
from fastapi import FastAPI
from pytest_cov.plugin import StoreReport

from app.settings.environments.test import TestAppSettings

pytest_plugins = ["tests.fixtures.printer", "tests.fixtures.database"]


def pytest_addoption(parser):
    """Add options to control coverage."""

    def fake_validate_report(_):  # pragma: no cover
        return "term-missing", "skip-covered"

    group = parser.getgroup(
        "cov", "coverage reporting with distributed testing support"
    )
    group.addoption(
        "--poco",
        action=StoreReport,
        type=fake_validate_report,
        help="Short alias for option term-missing:skip-covered",
    )


@pytest.fixture
def settings() -> TestAppSettings:
    return TestAppSettings()


@pytest.fixture
def app(migrations) -> FastAPI:
    from app.main import get_application

    return get_application()


@pytest.fixture(autouse=True)
async def http_client(app: FastAPI) -> httpx.AsyncClient:
    async with LifespanManager(app):
        async with httpx.AsyncClient(
            base_url="http://testserver", app=app
        ) as app_client:
            yield app_client


@pytest.fixture
def secret_key() -> str:
    return "secret"
