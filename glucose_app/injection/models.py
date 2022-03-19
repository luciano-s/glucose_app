from django.db import models

class Injection(models.Model):

    ui = models.IntegerField()
    timestamp = models.DateTimeField()
    pacient = models.ForeignKey("pacient.Pacient", null=True, on_delete=models.CASCADE)