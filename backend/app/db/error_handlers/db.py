"""Handle db errors."""

from starlette.requests import Request
from starlette.responses import JSONResponse, Response
from starlette.status import HTTP_503_SERVICE_UNAVAILABLE


async def db_not_raise_up_handler(_request: Request, exc: OSError) -> Response:
    """Handle error if db not up."""
    return JSONResponse(status_code=HTTP_503_SERVICE_UNAVAILABLE)
