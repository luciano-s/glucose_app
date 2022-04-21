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

    type = models.CharField(choices=INSULIN_TYPES, max_length=50)
    name = models.CharField(max_length=100)
    dosis = models.DecimalField(max_digits=4, decimal_places=2, null=True)
    pacient = models.ForeignKey("pacient.Pacient", on_delete=models.CASCADE, null=True)
    
    def __str__(self) -> str:
        return f"Insulin {self.type[1]} {self.name}"
