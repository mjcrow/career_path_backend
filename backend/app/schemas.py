# backend/app/schemas.py

from pydantic import BaseModel

class UserBase(BaseModel):
    username: str
    role: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class Login(BaseModel):
    username: str
    password: str

class TokenData(BaseModel):
    username: str

class TaskBase(BaseModel):
    title: str
    description: str
    time_needed: int
    category: str
    priority: bool = False  # added value

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
