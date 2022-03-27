from django.db import models


class Measurement(models.Model):

    timestamp = models.DateTimeField()
    glicemy = models.IntegerField(null=False, blank=False, default=0)
    pacient = models.ForeignKey("pacient.Pacient", null=True, on_delete=models.CASCADE)
