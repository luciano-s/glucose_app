from .repository import MealRepository


class CreateMealUseCase:
    def __init__(self, *, data, repository: MealRepository):
        self._data = data
        self._repository = repository

    def execute(self):
        self._repository.create_meal(data=self._data)
