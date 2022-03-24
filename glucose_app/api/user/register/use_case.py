from typing import Dict

from django.forms import ValidationError

from api.user.register.repository import RegisterUserRepository


class RegisterUserUseCase:

    def __init__(self, data: Dict, repository: RegisterUserRepository) -> None:
        self._data = data
        self._repository = repository

    def execute(self):
        self._validate()
        self._repository.create_user(user=self._data)

    def _validate(self):
        if self._repository.get_user(email=self._data["email"]):
            raise ValidationError("Usuário já existe!")
