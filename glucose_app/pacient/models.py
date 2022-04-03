from django.db import models


class Pacient(models.Model):
    user = models.OneToOneField(
        "user.User", on_delete=models.CASCADE, related_name="pacient"
    )
