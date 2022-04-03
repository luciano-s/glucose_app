from rest_framework import serializers
from pacient.models import Pacient
from user.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
        )


class PacientSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Pacient
        fields = ("id", "user")
