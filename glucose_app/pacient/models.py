from django.db import models


class Pacient(models.Model):
    user = models.OneToOneField(
        "user.User", on_delete=models.CASCADE, related_name="pacient"
    )
    min_glucose_level = models.IntegerField(null=True)
    max_glucose_level = models.IntegerField(null=True)
    isf = models.IntegerField(null=True, verbose_name="Insulin Sensitivity Factor")
    carb_counting = models.IntegerField(null=True)
