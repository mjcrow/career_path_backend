# backend/app/routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from sqlalchemy import asc, desc
from . import models, schemas, database
from .auth_routes import get_current_user

# create router add prefix and tag
router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)

# add database session for routes
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# create task bind to schema, handle db session
@router.post("/", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_task = models.Task(**task.dict(), user_id=current_user.id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


# get multiple tasks, sort by user
@router.get("/", response_model=List[schemas.Task])
def read_tasks(skip: int = 0, limit: int = 10, sort_by: str = 'title', order: str = 'asc', db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if order == 'asc':
        tasks = db.query(models.Task).filter(models.Task.user_id == current_user.id).order_by(asc(getattr(models.Task, sort_by))).offset(skip).limit(limit).all()
    else:
        tasks = db.query(models.Task).filter(models.Task.user_id == current_user.id).order_by(desc(getattr(models.Task, sort_by))).offset(skip).limit(limit).all()
    return tasks

# get single task, sort ny user
@router.get("/{task_id}", response_model=schemas.Task)
def read_task(task_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    task = db.query(models.Task).filter(models.Task.id == task_id, models.Task.user_id == current_user.id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

# get task, update task, return updated task
@router.put("/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, task: schemas.TaskCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id, models.Task.user_id == current_user.id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    for key, value in task.dict().items():
        setattr(db_task, key, value)
    db.commit()
    db.refresh(db_task)
    return db_task


# get task, delete task
@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id, models.Task.user_id == current_user.id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return {"detail": "deleted"}

@router.get("/check-testuser")
def check_testuser(db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == "testuser").first()
    return {"user_exists": bool(user)}

