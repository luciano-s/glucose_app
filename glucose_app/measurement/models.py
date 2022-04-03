from django.db import models


class Measurement(models.Model):

    timestamp = models.DateTimeField()
    glycemia = models.IntegerField(null=False, blank=False, default=0)
    pacient = models.ForeignKey("pacient.Pacient", null=True, on_delete=models.CASCADE)

    @property
    def is_glycemia_good(self) -> bool or None:
        if None not in [self.pacient.min_glucose_level, self.pacient.max_glucose_level]:
            return (
                self.pacient.min_glucose_level
                <= self.glycemia
                <= self.pacient.max_glucose_level
            )
