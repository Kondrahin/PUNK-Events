"""add_test_data

Revision ID: 3cac6a6f6059
Revises: 45d98cfa7cc7
Create Date: 2021-12-19 01:24:04.614132

Doc: https://alembic.sqlalchemy.org/en/latest/tutorial.html#create-a-migration-script
"""
from alembic import op

revision = "3cac6a6f6059"
down_revision = "45d98cfa7cc7"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute(
        'INSERT INTO user VALUES (1, "06589735-4742-482d-a411-fd1c638854a8", "st000000.student.spbu.ru", "Test name");'
        'INSERT INTO user VALUES (2, "72f2fb7d-aa01-4175-81a2-8749876cec6d", "st000001.student.spbu.ru", "Test name 2");'
        'INSERT INTO user VALUES (2, "68bfb166-f32c-4af6-9e71-0ed28b09eb1d", "st000002.student.spbu.ru", "Test name 3");'
    )
    op.execute(
        'INSERT INTO moderator VALUES (1, "06589735-4742-482d-a411-fd1c638854a8");'
    )
    op.execute(
        'INSERT INTO event VALUES (1, "4fc6109f-91b8-443d-a50c-4c58f8343878", "06589735-4742-482d-a411-fd1c638854a8", "Title", "Decription", "Location", "Scope", "2021-12-06 07:18:33", "2021-12-06 07:18:33");'
        'INSERT INTO event VALUES (2, "a3790e46-a07e-415b-ada3-46dc8a19fa00", "72f2fb7d-aa01-4175-81a2-8749876cec6d", "Title 2", "Decription 2", "Location 2", "Scope", "2021-12-06 07:18:33", "2021-12-06 07:18:33");'
    )
    op.execute(
        'INSERT INTO comment VALUES (1, "4fdb91b5-ee16-4b8f-9e21-ad79d1356f52", "Comment", "06589735-4742-482d-a411-fd1c638854a8", "4fc6109f-91b8-443d-a50c-4c58f8343878", "2021-12-06 07:18:33");'
        'INSERT INTO comment VALUES (2, "3c6b0da0-5952-42a9-a80e-d0a155f5ee49", "Comment 2", "72f2fb7d-aa01-4175-81a2-8749876cec6d", "4fc6109f-91b8-443d-a50c-4c58f8343878", "2021-12-07 07:18:33");'
        'INSERT INTO comment VALUES (2, "792082bf-cbd9-4210-bc2b-41e440204bec", "Comment 3", "72f2fb7d-aa01-4175-81a2-8749876cec6d", "a3790e46-a07e-415b-ada3-46dc8a19fa00", "2021-12-08 07:18:33");'
    )
    op.execute(
        'INSERT INTO user_event_association VALUES (1, "06589735-4742-482d-a411-fd1c638854a8", "4fc6109f-91b8-443d-a50c-4c58f8343878");'
        'INSERT INTO user_event_association VALUES (1, "68bfb166-f32c-4af6-9e71-0ed28b09eb1d", "a3790e46-a07e-415b-ada3-46dc8a19fa00");'
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###