# app/models/user.py

from pydantic import BaseModel
from passlib.context import CryptContext


class User(BaseModel):
    id: int
    username: str
    email: str
    hashed_password: str
    is_active: bool = True

    def set_password(self, password: str):
        self.hashed_password = pwd_context.hash(password)

    def verify_password(self, password: str) -> bool:
        return pwd_context.verify(password, self.hashed_password)


# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
