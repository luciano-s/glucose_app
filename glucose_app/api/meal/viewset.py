from rest_framework import response, status, viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from meal.models import Meal
from .serializer import CreateMealSerializer, MealSerializer
from .repository import MealRepository
from .use_case import CreateMealUseCase
from .filterset import MealFilterSet
from utils.pagination import CustomPagePagination


class MealViewSet(viewsets.GenericViewSet):
    queryset = Meal.objects.all()
    pagination_class = CustomPagePagination
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = MealFilterSet

    def get_queryset(self):
        pacient_id = self.request.query_params.get(
            "pacient",
            None,
        )
        if pacient_id:
            return self.filter_queryset(
                super()
                .get_queryset()
                .filter(
                    measurement__pacient__id=pacient_id,
                    injection__pacient__id=pacient_id,
                )
            )
        return super().get_queryset().none()

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
        repository = MealRepository()
        use_case = CreateMealUseCase(
            data=serializer.validated_data, repository=repository
        )
        use_case.execute()

        return response.Response(
            data={"message": "Criado com sucesso!"}, status=status.HTTP_201_CREATED
        )

    def list(self, request):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)
