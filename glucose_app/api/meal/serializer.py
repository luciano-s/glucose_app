from rest_framework import serializers

from meal.models import Meal
from pacient.models import Pacient
from api.measurement.serializer import MeasurementSerializer


class _InjectionSerializer(serializers.Serializer):
    ui = serializers.DecimalField(max_digits=4, decimal_places=2)
    timestamp = serializers.DateTimeField(format="%Y-%m-%dT%H:%M", required=False)
    pacient = serializers.PrimaryKeyRelatedField(queryset=Pacient.objects.all())


class MealSerializer(serializers.ModelSerializer):
    measurement = MeasurementSerializer()
    injection = _InjectionSerializer()
    type = serializers.SerializerMethodField()

    class Meta:
        model = Meal
        fields = "__all__"

    def get_type(self, obj):
        return obj.get_type_display()


class CreateMealSerializer(serializers.Serializer):
    class _MeasurementSerializer(serializers.Serializer):
        timestamp = serializers.DateTimeField("%Y-%m-%dT%H:%M")
        glycemia = serializers.IntegerField(min_value=0)
        pacient = serializers.PrimaryKeyRelatedField(queryset=Pacient.objects.all())

    cho = serializers.DecimalField(max_digits=6, decimal_places=2, allow_null=True)
    measurement = _MeasurementSerializer()
    injection = _InjectionSerializer()
    type = serializers.ChoiceField(choices=Meal.MEAL_TYPES)
