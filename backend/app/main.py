# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app import models
from app.routes import router as task_router
from app.auth_routes import router as auth_router


# create db tables, bind models to db
models.Base.metadata.create_all(bind=engine)

# create instance
app = FastAPI()

# add cors configuration allow all origins, methods, headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://career-path-frontend-c7y6.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# include routers one for tasks, one for user info
app.include_router(task_router)
app.include_router(auth_router)

