"""Database models declarations."""

from datetime import datetime
from typing import Any, Generic, List, TypeVar
from uuid import UUID

import sqlalchemy as sa
from pydantic import EmailStr
from sqlalchemy.dialects import postgresql
from sqlalchemy.future import select
from sqlalchemy.orm import relationship

from app.db.sqlalchemy import Base, session
from app.schemas.enums import ScopeEnum

T = TypeVar("T")  # noqa: WPS111


class CRUDMixin(Generic[T]):
    """Mixin for CRUD operations for models."""

    id: int  # noqa: WPS125

    @classmethod
    async def create(cls, **kwargs: Any) -> None:
        """Create object."""
        query = sa.insert(cls).values(**kwargs)
        async with session.begin():
            await session.execute(query)

    @classmethod
    async def update(cls, id: int, **kwargs: Any) -> None:  # noqa: WPS125
        """Update object by id."""
        query = (
            sa.update(cls)
            .where(cls.id == id)
            .values(**kwargs)
            .execution_options(synchronize_session="fetch")
        )
        async with session.begin():
            await session.execute(query)

    @classmethod
    async def get(cls, **kwargs: Any) -> T:  # noqa: WPS125
        """Get object by kwargs."""
        query = select(cls).filter_by(**kwargs)
        async with session.begin():
            rows = await session.execute(query)
        return rows.scalars().unique().one()

    @classmethod
    async def all(cls) -> List[T]:  # noqa: WPS125
        """Get all objects."""
        query = select(cls)
        async with session.begin():
            rows = await session.execute(query)
        return rows.scalars().all()


association_table = sa.Table(
    "user_event_association",
    Base.metadata,
    sa.Column(
        "user_uuid", postgresql.UUID, sa.ForeignKey("user.uuid"), primary_key=True
    ),
    sa.Column(
        "event_uuid", postgresql.UUID, sa.ForeignKey("event.uuid"), primary_key=True
    ),
)


class User(Base, CRUDMixin):
    """User database model."""

    __tablename__ = "user"

    id: int = sa.Column(
        sa.Integer, primary_key=True, autoincrement=True
    )  # noqa: WPS125
    uuid: UUID = sa.Column(postgresql.UUID(as_uuid=True), nullable=False, unique=True)
    email: EmailStr = sa.Column(sa.String, nullable=False)
    full_name: str = sa.Column(sa.String, nullable=False)
    events = relationship(
        "Event",
        secondary=association_table,
        back_populates="participants",
        lazy="joined",
    )
    comments = relationship("Comment", lazy="joined")


class Event(Base, CRUDMixin):
    """Event database model."""

    __tablename__ = "event"

    id: int = sa.Column(
        sa.Integer, primary_key=True, autoincrement=True
    )  # noqa: WPS125
    uuid: UUID = sa.Column(postgresql.UUID(as_uuid=True), nullable=False, unique=True)
    creator: UUID = sa.Column(postgresql.UUID(as_uuid=True), sa.ForeignKey("user.uuid"))
    title: str = sa.Column(sa.String, nullable=False)
    description: str = sa.Column(sa.String, nullable=True)
    location: str = sa.Column(sa.String, nullable=False)
    participants = relationship(
        "User", secondary=association_table, back_populates="events", lazy="joined"
    )
    scope: ScopeEnum = sa.Column(sa.Enum(ScopeEnum), nullable=False)
    created_datetime: datetime = sa.Column(sa.DateTime(timezone=True), nullable=False)
    event_datetime: datetime = sa.Column(sa.DateTime(timezone=True), nullable=False)
    comments = relationship("Comment", lazy="joined")
    is_approved: bool = sa.Column(sa.Boolean, default=False)


class Comment(Base, CRUDMixin):
    """Comment database model."""

    __tablename__ = "comment"

    id: int = sa.Column(
        sa.Integer, primary_key=True, autoincrement=True
    )  # noqa: WPS125
    uuid: UUID = sa.Column(postgresql.UUID(as_uuid=True), nullable=False, unique=True)
    data: str = sa.Column(sa.String(), nullable=False)  # noqa: WPS110
    user_uuid: UUID = sa.Column(
        postgresql.UUID(as_uuid=True), sa.ForeignKey("user.uuid")
    )
    event_uuid: UUID = sa.Column(
        postgresql.UUID(as_uuid=True), sa.ForeignKey("event.uuid")
    )
    created_datetime: datetime = sa.Column(sa.DateTime(timezone=True), nullable=False)


class Moderator(Base, CRUDMixin):
    """Moderator database model."""

    __tablename__ = "moderator"

    id: int = sa.Column(
        sa.Integer, primary_key=True, autoincrement=True
    )  # noqa: WPS125
    user_uuid: UUID = sa.Column(
        postgresql.UUID(as_uuid=True), sa.ForeignKey("user.uuid")
    )
