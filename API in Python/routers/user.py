from fastapi import APIRouter, HTTPException
from datebase import get_data_user, get_data_user_witch_relaction, add_value
from models import User

router = APIRouter()

@router.get("/user")
def get_user():
    return get_data_user()

@router.get('/user/info/{name}')
def get_user_infor(name: str):
    return [user for user in get_data_user_witch_relaction() if user['username'] == name]

@router.post('/user')
def add_user(request: User):
    return add_value('users', request.to_dict())