from sqlalchemy import Column, Integer, String, ForeignKey, Boolean  # Add Boolean here
from sqlalchemy.orm import relationship
from database import Base


# define models for user and tasks set relationships for sql, ADDED define priority setting
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String)
    tasks = relationship("Task", back_populates="user")

class Task(Base):
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    time_needed = Column(Integer)
    category = Column(String)
    priority = Column(Boolean, default=False)  # added the priority column
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="tasks")
