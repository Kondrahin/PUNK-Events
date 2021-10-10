"""Classes and functions to customize logs."""
from __future__ import annotations

import logging
import sys
from copy import deepcopy
from typing import TYPE_CHECKING

from loguru import logger
from loguru._defaults import LOGURU_FORMAT  # noqa: WPS436

from app.settings.config import get_app_settings

if TYPE_CHECKING:
    from loguru import Record  # noqa: WPS433  # pragma: no cover


MAX_PAYLOAD_WIDTH = 88
MAX_FILE_LENGTH = 40
config = get_app_settings()


class InterceptHandler(logging.Handler):
    """
    Logging handler interceptor from loguru documentaion.

    For more info see https://loguru.readthedocs.io/en/stable/overview.html#entirely-compatible-with-standard-logging  # noqa: E501
    """

    def emit(self, record: logging.LogRecord) -> None:  # pragma: no cover
        """Log the specified logging record by loguru logger."""
        try:
            # Get corresponding Loguru level if it exists
            level = logger.level(record.levelname).name
        except ValueError:
            level = str(record.levelno)

        # Find caller from where originated the logged message
        frame, depth = logging.currentframe(), 2
        while frame and (frame.f_code.co_filename == logging.__file__):  # noqa: WPS609
            frame = frame.f_back  # type: ignore
            depth += 1

        logger.opt(depth=depth, exception=record.exc_info).log(
            level, record.getMessage()
        )


def format_record(record: Record) -> str:
    """
    Customize format for loguru loggers.

    Uses pformat for log any data like request or
    response body during debug. Works with logging if loguru handler it.

    Example:
    >>> payload = [
    >>>     {"users":[{"name": "Nick", "age": 87, "is_active": True},
    >>>     {"name": "Alex", "age": 27, "is_active": True}], "count": 2}]
    >>> logger.bind(payload=payload).debug("users payload")
    >>> [   {   'count': 2,
    >>>         'users': [   {'age': 87, 'is_active': True, 'name': 'Nick'},
    >>>                      {'age': 27, 'is_active': True, 'name': 'Alex'}]}]
    """
    return "{0}{1}{2}".format(LOGURU_FORMAT, "", "{exception}\n")


def copy_extra(record: Record) -> None:
    record["extra"] = deepcopy(record["extra"])


def configure_logger() -> None:
    """Add some loggers to loguru and config logging level."""
    # Handle default logs with loguru logger
    logging.getLogger().handlers = [InterceptHandler()]

    # configure uvicorn logs
    for logger_name in ("uvicorn.asgi", "uvicorn.access"):
        logging_logger = logging.getLogger(logger_name)
        logging_logger.handlers = [InterceptHandler()]

    # configure format for all logs
    logger.configure(
        handlers=[
            {
                "sink": sys.stdout,
                "format": format_record,
                "level": logging.DEBUG if config.DEBUG else logging.INFO,
            }
        ],
        patcher=copy_extra,
    )
