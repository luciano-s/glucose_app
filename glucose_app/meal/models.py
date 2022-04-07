from django.db import models


class Meal(models.Model):

    MEAL_TYPES = (
        ("BREAKFAST", "Café da manhã"),
        ("LUNCH", "Almoço"),
        ("SNACK", "Lanche"),
        ("DINNER", "Jantar"),
    )

    cho = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    measurement = models.ForeignKey(
        "measurement.Measurement", null=True, on_delete=models.SET_NULL
    )
    injection = models.ForeignKey(
        "injection.Injection", null=True, on_delete=models.SET_NULL
    )
    type = models.CharField(choices=MEAL_TYPES, max_length=32, null=True)
