from typing import OrderedDict
import pytest

from model_bakery import baker
from datetime import datetime, timezone
from api.measurement import CreateMeasurementSerializer, CreateMeasurementUseCase


@pytest.mark.django_db
class TestCreateMeasurementUseCase:
    def test_execute(self, mocker):
        p = baker.make("pacient.Pacient")

        data = {"glycemia": 100, "pacient": p.id, "timestamp": f"2022-03-27 15:30"}
        serializer = CreateMeasurementSerializer(data=data)

        assert serializer.is_valid(raise_exception=True)
        repository = repository = mocker.Mock()
        use_case = CreateMeasurementUseCase(
            data=serializer.validated_data, repository=repository
        )

        use_case.execute()
        d = OrderedDict(
            {
                "timestamp": datetime(
                    year=2022, month=3, day=27, hour=15, minute=30, tzinfo=timezone.utc
                ),
                "glycemia": 100,
                "pacient": p,
            }
        )
        repository.create_measurement.assert_called_once_with(data=d)

