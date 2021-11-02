"""Dependencies."""
from fastapi import Depends

from app.db.users.repo import UserRepo

get_user_repo_dependency = Depends(UserRepo)
