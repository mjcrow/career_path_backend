from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.database import engine
from backend.app import models
from backend.app.routes import router as task_router
from backend.app.auth_routes import router as auth_router


# create db tables, bind models to db
models.Base.metadata.create_all(bind=engine)


app = FastAPI()

'''
# middleware for request troubleshooting

@app.middleware("http")
async def log_request_time(request, call_next):
    start = time.time()
    response = await call_next(request)
    duration = time.time() - start
    print(f"{request.url.path} took {duration:.3f}s")
    return response

'''


# add cors configuration for testing frontend and deployed
app.add_middleware(
    CORSMiddleware,
    
    allow_origins=[
        "http://localhost:5173",   # local frontend for testing
        "https://career-path-frontend-c7y6.onrender.com"  # deployed
    ],

    
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# include two routers one for tasks, one for user info
app.include_router(task_router)
app.include_router(auth_router)

