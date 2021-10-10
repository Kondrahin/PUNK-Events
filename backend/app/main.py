"""Application with configuration for events, routers and middleware."""
from fastapi import FastAPI

from app.api.routers import router
from app.settings.config import get_app_settings
from app.settings.events import shutdown, startup

config = get_app_settings()


def get_application() -> FastAPI:
    """Create configured server application instance."""
    application = FastAPI(title="punk-events")

    application.add_event_handler(
        "startup",
        startup(
            redis_dsn=config.REDIS_DSN,
            redis_prefix="punk-events",
        ),
    )

    application.add_event_handler("shutdown", shutdown())

    application.include_router(router)

    return application


app = get_application()
