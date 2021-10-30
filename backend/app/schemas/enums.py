"""Module for enums."""
from enum import Enum


class StrEnum(str, Enum):  # noqa: WPS600
    """Base enum."""


class ScopeEnum(StrEnum):
    cultural = "Культурные мероприятия"
    board_games = "Настольные игры"
