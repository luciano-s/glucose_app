from django.db import models
from django.contrib.auth.models import User

class Pacient(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)