from django.db import models

class Pacient(models.Model):
    user = models.ForeignKey("user.User", on_delete=models.CASCADE)
