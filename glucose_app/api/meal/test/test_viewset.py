import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from model_bakery import baker


@pytest.fixture
def default_data():
    user = baker.make("user.User")
    pacient = baker.make("pacient.Pacient", user=user)
    client = APIClient()
    client.force_authenticate(user=user)
    return client, pacient, user


@pytest.mark.django_db
class TestMealViewSet:
    def test_list_meal_for_pacient(self, default_data):
        client, pacient, _ = default_data
        measurement = baker.make(
            "measurement.Measurement", glycemia=115, pacient=pacient
        )
        injection = baker.make("injection.Injection", pacient=pacient, ui=8)
        baker.make(
            "meal.Meal",
            cho=40,
            type="BREAKFAST",
            measurement=measurement,
            injection=injection,
        )

        pacient2 = baker.make("pacient.Pacient")

        measurement2 = baker.make(
            "measurement.Measurement", glycemia=100, pacient=pacient2
        )
        injection2 = baker.make("injection.Injection", pacient=pacient2, ui=6)
        baker.make(
            "meal.Meal",
            cho=20,
            type="LUNCH",
            measurement=measurement2,
            injection=injection2,
        )

        response = client.get(reverse("meal-list"), {"pacient": pacient.id})

        assert response.status_code == 200
        assert len(response.data) == 1
        assert response.data[0]["measurement"]["pacient"] == pacient.id

    def test_list_meal_ordered(self, default_data):
        client, pacient, _ = default_data
        d = {10: "BREAKFAST", 20: "LUNCH", 30: "DINNER"}
        for idx in range(3):
            m = baker.make("measurement.Measurement", glycemia=100, pacient=pacient)
            i = baker.make("injection.Injection", pacient=pacient, ui=8)
            baker.make(
                "meal.Meal",
                cho=(idx + 1) * 10,
                type=d[(idx + 1) * 10],
                measurement=m,
                injection=i,
            )

        response = client.get(
            reverse("meal-list"), {"pacient": pacient.id, "ordering": "cho"}
        )

        assert response.status_code == 200
        assert len(response.data) == 3

        assert response.data[0]["cho"] == "10.00"
        assert response.data[1]["cho"] == "20.00"
        assert response.data[2]["cho"] == "30.00"

        response = client.get(
            reverse("meal-list"), {"pacient": pacient.id, "ordering": "-cho"}
        )

        assert response.status_code == 200
        assert len(response.data) == 3

        assert response.data[0]["cho"] == "30.00"
        assert response.data[1]["cho"] == "20.00"
        assert response.data[2]["cho"] == "10.00"
