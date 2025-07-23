from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Load DB connection from environment
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# Create engine — no connect_args needed for PostgreSQL
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Create session — disables autocommit and autoflush, just like before
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for ORM models
Base = declarative_base()