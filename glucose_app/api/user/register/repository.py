from xmlrpc.client import Boolean
from user.models import User
from typing import Dict

class RegisterUserRepository:
    def create_user(self, user: Dict) -> User:
        return User.objects.create(**user)

    def get_user(self, email: str) -> Boolean:
        return User.objects.filter(email=email).exists()