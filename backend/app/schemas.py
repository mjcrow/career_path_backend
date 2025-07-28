from pydantic import BaseModel


# user schemas base into password and id for user creation
class UserBase(BaseModel):
    username: str
    role: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

        orm_mode = True         # Required for FastAPI response_model compatibility



# authentication schemas structure token, login data, token data
class Token(BaseModel):
    access_token: str
    token_type: str

class Login(BaseModel):
    username: str
    password: str

class TokenData(BaseModel):
    username: str


# task schemas structure task, create new task, user task id
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
