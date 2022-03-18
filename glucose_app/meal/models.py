from django.db import models

class Meal(models.Model):

    cho = models.IntegerField()
    measurement = models.ForeignKey("measurement.Measurement", null=True, on_delete=models.SET_NULL)
    injection = models.ForeignKey("injection.Injection", null=True, on_delete=models.SET_NULL)

