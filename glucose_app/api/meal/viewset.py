from rest_framework import response, status, viewsets
from rest_framework.permissions import IsAuthenticated
from meal.models import Meal
from .serializer import CreateMealSerializer, MealSerializer
from .repository import MealRepository
from .use_case import CreateMealUseCase


class MealViewSet(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            Meal.objects.filter(
                measurement__pacient__id=self.request.query_params["pacient"]
            )
            .select_related("measurement__pacient", "injection")
            .order_by("-measurement__timestamp")
        )

    def get_serializer_class(self):
        return {"GET": MealSerializer, "POST": CreateMealSerializer}[
            self.request.method
        ]

    def create(self, request):
        timestamp = request.data.pop("timestamp")
        pacient = request.data.pop("pacient")

        request.data["injection"] = {
            "pacient": pacient,
            "timestamp": timestamp,
            "ui": request.data.pop("ui"),
        }

        request.data["measurement"] = {
            "pacient": pacient,
            "timestamp": timestamp,
            "glycemia": request.data.pop("glycemia"),
        }

        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        print(serializer.validated_data)
        repository = MealRepository()
        use_case = CreateMealUseCase(
            data=serializer.validated_data, repository=repository
        )
        use_case.execute()

        return response.Response(
            data={"message": "Criado com sucesso!"}, status=status.HTTP_201_CREATED
        )

    def list(self, request):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)
