"""Event repo."""
import uuid
from datetime import datetime
from typing import List, Optional

import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.exc import NoResultFound

from app.db.models import Event, association_table
from app.db.sqlalchemy import session_fabric
from app.schemas.event import CreateUpdateEventSchema, EventSchema


class EventRepo:
    async def create_event(
        self, event_to_create: CreateUpdateEventSchema, creator: uuid.UUID
    ) -> uuid.UUID:
        event_uuid = uuid.uuid4()
        await Event.create(
            **event_to_create.dict(),
            uuid=event_uuid,
            creator=creator,
            created_datetime=datetime.now(),
        )
        session = session_fabric.get_session()
        query = sa.insert(association_table).values(
            user_uuid=creator, event_uuid=event_uuid
        )
        async with session.begin():
            await session.execute(query)

        return event_uuid

    async def update_event(
        self,
        event_uuid: UUID,
        event_to_update: CreateUpdateEventSchema,
    ) -> None:
        await Event.update(
            Event.uuid,
            event_uuid,
            **event_to_update.dict(),
        )

    async def delete_event(
        self,
        event_uuid: UUID,
    ) -> None:
        await Event.delete(
            Event.uuid,
            event_uuid,
        )

    async def get_event(self, event_uuid: UUID) -> Optional[EventSchema]:
        try:
            event = await Event.get(uuid=event_uuid)
        except NoResultFound:
            return None

        return EventSchema.from_orm(event)

    async def get_all_event(self) -> Optional[List[EventSchema]]:
        try:
            events = await Event.all()
        except NoResultFound:
            return None

        events = [EventSchema.from_orm(event) for event in events]
        return sorted(events, key=lambda event: event.event_datetime, reverse=True)

    async def get_user_event(self, user_uuid: UUID) -> Optional[List[EventSchema]]:
        try:
            events = await Event.all(creator=user_uuid)
        except NoResultFound:
            return None

        events = [EventSchema.from_orm(event) for event in events]
        return sorted(events, key=lambda event: event.event_datetime, reverse=True)

    async def add_participant(self, event_uuid: UUID, participant_uuid: UUID) -> None:
        session = session_fabric.get_session()
        query = sa.insert(association_table).values(
            user_uuid=participant_uuid, event_uuid=event_uuid
        )
        async with session.begin():
            await session.execute(query)

    async def delete_participant(
        self, event_uuid: UUID, participant_uuid: UUID
    ) -> None:
        session = session_fabric.get_session()
        query = sa.delete(association_table).where(
            association_table.c.user_uuid == participant_uuid,
            association_table.c.event_uuid == event_uuid,
        )
        async with session.begin():
            await session.execute(query)
