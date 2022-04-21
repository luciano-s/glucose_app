from typing import Dict
from measurement.models import Measurement
from injection.models import Injection


class MeasurementRepository:
    def create_measurement(self, data: Dict) -> Measurement:
        Measurement.objects.create(**data)
        if data.get("ui_correction"):
            Injection.objects.create(
                pacient=data["pacient"],
                timestamp=data["timestamp"],
                ui=data["ui_correction"],
            )
