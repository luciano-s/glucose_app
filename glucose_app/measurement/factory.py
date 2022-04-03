from measurement.models import Measurement


class MeasurementFactory:
    @classmethod
    def get_measurememnt(cls, data):
        return Measurement(**data)
