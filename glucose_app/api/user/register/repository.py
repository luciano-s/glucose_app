from pacient.models import Pacient
from user.models import User

from typing import Dict


class RegisterUserRepository:
    def create_user(self, user: Dict) -> User:
        user = User.objects.create(**user)
        Pacient.objects.create(user=user)
        return user

    def get_user(self, email: str) -> bool:
        return User.objects.filter(email=email).exists()
