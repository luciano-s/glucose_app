from measurement.models import Measurement
from typing import Dict


class MeasurementRepository:
    def create_measurement(self, data: Dict) -> Measurement:
        Measurement.objects.create(**data)
