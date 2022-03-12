from django.db import models


class Pacient(models.Model):
    user = models.PrimaryKeyRealtedField("django.contrib.auth.models.User") 
    person = models.PrimaryKeyRelatedField("Person")