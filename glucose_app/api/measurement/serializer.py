from rest_framework import serializers

from measurement.models import Measurement
from pacient.models import Pacient


class MeasurementSerializer(serializers.ModelSerializer):
    is_glycemia_good = serializers.BooleanField()
    
    class Meta:
        model = Measurement
        fields = "__all__"


class CreateMeasurementSerializer(serializers.Serializer):
    timestamp = serializers.DateTimeField("%Y-%m-%dT%H:%M")
    glycemia = serializers.IntegerField(min_value=0)
    pacient = serializers.PrimaryKeyRelatedField(queryset=Pacient.objects.all())
    is_glycemia_good = serializers.BooleanField(read_only=True)
