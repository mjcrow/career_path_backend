from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

import models
import schemas
import database
from hashing import Hash
from .auth_token import create_access_token, verify_token


# create router instance
router = APIRouter(
    tags=['Authentication']
)
# retrieve and verify tokens
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# provide SQLA session to interact with db
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# login endpoint take query for user, hash verify stored password, create and send token
@router.post('/token', response_model=schemas.Token)
def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == request.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Credentials")
    if not Hash.verify(user.password, request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incorrect Password")
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


# user creation endpoint take user schema, hash and store password, store and create user
@router.post('/users/', response_model=schemas.User)
def create_user(request: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed_password = Hash.bcrypt(request.password)
    new_user = models.User(username=request.username, password=hashed_password, role=request.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# use token, verify token, query db, error, return user
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_data = verify_token(token, credentials_exception)
    user = db.query(models.User).filter(models.User.username == token_data.username).first()
    if user is None:
        raise credentials_exception
    return user


# current user endpoint, return authenticated user, return user object
@router.get('/users/me', response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user
