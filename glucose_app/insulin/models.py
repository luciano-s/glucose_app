from django.db import models


class Insulin(models.Model):

    INSULIN_TYPES = (
        (
            "RAPID_ACTING",
            "Rapid Acting",
        ),
        (
            "SHORT_ACTING",
            "Short Acting",
        ),
        (
            "INTERMEDIATE_ACTING",
            "Intermediate Acting",
        ),
        (
            "LONG_ACTING",
            "Long Acting",
        ),
        (
            "ULTRA_LONG_ACTING",
            "Ultra Long Acting",
        ),
        (
            "INHALED",
            "Inhaled",
        ),
    )

    type = models.CharField(choices=INSULIN_TYPES)
    name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return f"Insulin {self.type[1]} {self.name}"
