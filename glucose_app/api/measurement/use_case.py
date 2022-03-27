from typing import Dict

from api.measurement.repository import MeasurementRepository
from measurement.models import Measurement


class CreateMeasurementUseCase:
    def __init__(self, *, data, repository: MeasurementRepository) -> None:
        self._data = data
        self._repository = repository

    def execute(self) -> Measurement:
        self._validate()
        return self._repository.create_measurement(data=self._data)

    def _validate(self):
        pass