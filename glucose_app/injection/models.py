from django.db import models

class Injection(models.Model):

    ui = models.IntegerField()
    timestamp = models.DateTimeField()
