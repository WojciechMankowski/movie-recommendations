from fastapi import APIRouter
from datebase import get_data_user, get_data_user_witch_relaction
from models import User

router = APIRouter()

@router.get("/user")
def get_user():
    return get_data_user()

@router.get('user/info/{name}')
def get_user_infor(name: str):
    return [user for user in get_data_user_witch_relaction() if user[name] == name]

@router.post('/user')
def add_user(request: User):
    pass