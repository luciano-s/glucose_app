from rest_framework import response, status, viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from api.measurement.use_case import CreateMeasurementUseCase
from measurement.models import Measurement
from .serializer import CreateMeasurementSerializer, MeasurementSerializer
from .repository import MeasurementRepository
from utils.pagination import CustomPagePagination
from .filterset import MeasurementFilterSet


class MeasurementViewSet(viewsets.GenericViewSet):
    queryset = Measurement.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagePagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = MeasurementFilterSet

    def get_serializer_class(self):
        return {"GET": MeasurementSerializer, "POST": CreateMeasurementSerializer}[
            self.request.method
        ]

    def get_queryset(self):
        pacient_id = self.request.query_params.get("pacient", None)
        if pacient_id:
            return self.filter_queryset(
                super()
                .get_queryset()
                .filter(
                    pacient__id=pacient_id,
                    meal__isnull=True,
                )
            )

        return super().get_queryset().none()

    def list(self, request):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        repository = MeasurementRepository()

        use_case = CreateMeasurementUseCase(
            data=serializer.validated_data, repository=repository
        )
        use_case.execute()

        return response.Response(serializer.data, status=status.HTTP_201_CREATED)
