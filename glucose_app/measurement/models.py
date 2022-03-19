from django.db import models

class Measurement(models.Model):

    timestamp = models.DateTimeField()
    glicemy = models.ForeignKey("glicemy.Glicemy", null=True, on_delete=models.CASCADE)
    pacient = models.ForeignKey("pacient.Pacient", null=True, on_delete=models.CASCADE)
