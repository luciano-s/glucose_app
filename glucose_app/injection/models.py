from django.db import models

class Injection(models.Model):

    ui = models.DecimalField(max_digits=4, decimal_places=2)
    timestamp = models.DateTimeField()
    pacient = models.ForeignKey("pacient.Pacient", null=True, on_delete=models.CASCADE)