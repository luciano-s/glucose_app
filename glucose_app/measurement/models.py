from django.db import models


class Measurement(models.Model):
    POST_LUNCH = "POS_ALMOCO"
    POST_BREAKFAST = "POS CAFE"
    POST_SNACK = "POST_LANCHE"
    POST_DINNER = "POST_JANTAR"
    DAWN = "MADRUGADA"
    OTHER = "OUTRO"
    MEASUREMENT_TYPE = (
        (POST_BREAKFAST, "Pós café"),
        (POST_LUNCH, "Pós almoço"),
        (POST_SNACK, "Pós lanche"),
        (POST_DINNER, "Pós jantar"),
        (DAWN, "Madrugada"),
        (OTHER, "Outro"),
    )

    timestamp = models.DateTimeField()
    glycemia = models.IntegerField(null=False, blank=False, default=0)
    pacient = models.ForeignKey("pacient.Pacient", null=True, on_delete=models.CASCADE)
    measurement_type = models.CharField(
        choices=MEASUREMENT_TYPE, max_length=200, default=OTHER
    )
    obs = models.TextField(verbose_name="Measurement description", null=True)
    ui_correction = models.DecimalField(max_digits=4, decimal_places=2, default=0)

    @property
    def is_glycemia_good(self) -> bool or None:
        if None not in [self.pacient.min_glucose_level, self.pacient.max_glucose_level]:
            return (
                self.pacient.min_glucose_level
                <= self.glycemia
                <= self.pacient.max_glucose_level
            )

    class Meta:
        ordering = ["timestamp"]
