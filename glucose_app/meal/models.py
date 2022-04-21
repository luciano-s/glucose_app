from django.db import models


class Meal(models.Model):

    MEAL_TYPES = (
        ("CAFE_DA_MANHA", "Café da manhã"),
        ("ALMOCO", "Almoço"),
        ("LANCHE", "Lanche"),
        ("JANTAR", "Jantar"),
    )

    cho = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    measurement = models.ForeignKey(
        "measurement.Measurement", null=True, on_delete=models.SET_NULL
    )
    injection = models.ForeignKey(
        "injection.Injection", null=True, on_delete=models.SET_NULL
    )
    type = models.CharField(choices=MEAL_TYPES, max_length=32, null=True)
    obs = models.TextField(verbose_name="Meal description", null=True)
