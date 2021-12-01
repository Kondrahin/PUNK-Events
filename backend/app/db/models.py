"""Database models declarations."""

from datetime import datetime
from typing import Any, Generic, List, TypeVar
from uuid import UUID

import sqlalchemy as sa
from pydantic import EmailStr
from sqlalchemy.dialects import postgresql
from sqlalchemy.future import select
from sqlalchemy.orm import relationship

from app.db.sqlalchemy import Base, session_fabric

T = TypeVar("T")  # noqa: WPS111


class CRUDMixin(Generic[T]):
    """Mixin for CRUD operations for models."""

    id: int

    @classmethod
    async def create(cls, **kwargs: Any) -> None:
        """Create object."""
        session = session_fabric.get_session()
        query = sa.insert(cls).values(**kwargs)
        async with session.begin():
            await session.execute(query)

    @classmethod
    async def update(cls, key_column: Any, key_value: Any, **kwargs: Any) -> None:
        """Update object by key column."""
        session = session_fabric.get_session()
        query = (
            sa.update(cls)
            .where(key_column == key_value)
            .values(**kwargs)
            .execution_options(synchronize_session="fetch")
        )
        async with session.begin():
            await session.execute(query)

    @classmethod
    async def get(cls, **kwargs: Any) -> T:
        """Get object by kwargs."""
        session = session_fabric.get_session()
        query = select(cls).filter_by(**kwargs)
        async with session.begin():
            rows = await session.execute(query)
        return rows.scalars().unique().one()

    @classmethod
    async def delete(cls, key_column: Any, key_value: Any) -> None:
        """Delete object by key_column."""
        session = session_fabric.get_session()
        query = sa.delete(cls).where(key_column == key_value)
        async with session.begin():
            await session.execute(query)

    @classmethod
    async def all(cls, **kwargs: Any) -> List[T]:
        """Get all objects."""
        session = session_fabric.get_session()
        query = select(cls).filter_by(**kwargs)
        async with session.begin():
            rows = await session.execute(query)
        return rows.scalars().unique().all()


association_table = sa.Table(
    "user_event_association",
    Base.metadata,
    sa.Column(
        "user_uuid",
        postgresql.UUID(as_uuid=True),
        sa.ForeignKey("user.uuid", ondelete="CASCADE"),
        primary_key=True,
    ),
    sa.Column(
        "event_uuid",
        postgresql.UUID(as_uuid=True),
        sa.ForeignKey("event.uuid", ondelete="CASCADE"),
        primary_key=True,
    ),
)


class User(Base, CRUDMixin):
    """User database model."""

    __tablename__ = "user"

    id: int = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    uuid: UUID = sa.Column(postgresql.UUID(as_uuid=True), nullable=False, unique=True)
    email: EmailStr = sa.Column(sa.String, nullable=False)
    full_name: str = sa.Column(sa.String, nullable=False)
    events = relationship(
        "Event",
        secondary=association_table,
        back_populates="participants",
        lazy="joined",
        cascade="all,delete",
    )
    comments = relationship("Comment", lazy="joined")


class Event(Base, CRUDMixin):
    """Event database model."""

    __tablename__ = "event"

    id: int = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    uuid: UUID = sa.Column(postgresql.UUID(as_uuid=True), nullable=False, unique=True)
    creator: UUID = sa.Column(
        postgresql.UUID(as_uuid=True), sa.ForeignKey("user.uuid"), nullable=False
    )
    title: str = sa.Column(sa.String, nullable=False)
    description: str = sa.Column(sa.String, nullable=True)
    location: str = sa.Column(sa.String, nullable=False)
    participants = relationship(
        "User",
        secondary=association_table,
        back_populates="events",
        lazy="joined",
        passive_deletes=True,
    )
    scope: str = sa.Column(sa.String, nullable=False)
    created_datetime: datetime = sa.Column(sa.DateTime(timezone=True), nullable=False)
    event_datetime: datetime = sa.Column(sa.DateTime(timezone=True), nullable=False)
    comments = relationship(
        "Comment",
        lazy="joined",
        cascade="all,delete",
    )


class Comment(Base, CRUDMixin):
    """Comment database model."""

    __tablename__ = "comment"

    id: int = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
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

    id: int = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    user_uuid: UUID = sa.Column(
        postgresql.UUID(as_uuid=True), sa.ForeignKey("user.uuid")
    )
