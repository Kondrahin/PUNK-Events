"""Dependencies."""
from fastapi import Depends

from app.db.crud.comments.repo import CommentRepo
from app.db.crud.events.repo import EventRepo
from app.db.crud.users.repo import UserRepo

get_user_repo_dependency = Depends(UserRepo)
get_event_repo_dependency = Depends(EventRepo)
get_comment_repo_dependency = Depends(CommentRepo)
