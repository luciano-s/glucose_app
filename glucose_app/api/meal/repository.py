from meal.models import Meal
from measurement.models import Measurement
from injection.models import Injection


class MealRepository:
    def create_meal(self, data):

        injection = Injection.objects.create(**data.pop("injection"))
        measurement = Measurement.objects.create(**data.pop("measurement"))

        Meal.objects.create(**data, measurement=measurement, injection=injection)
