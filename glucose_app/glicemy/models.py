from django.db import models


class Glicemy(models.Model):

    level = models.IntegerField()

    def __str__(self) -> str:
        return f"glucose level: {self.level}"
