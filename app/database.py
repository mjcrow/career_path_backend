from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


# db location
SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"

# create db set flag
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# create and bind session, disable auto commit and changes
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# create base, allow for table creation
Base = declarative_base()
