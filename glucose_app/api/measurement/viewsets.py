from http.client import REQUEST_HEADER_FIELDS_TOO_LARGE
from warnings import filters
from rest_framework import response, status, viewsets
from rest_framework.permissions import IsAuthenticated
from api.measurement.use_case import CreateMeasurementUseCase
from measurement.models import Measurement
from .serializer import CreateMeasurementSerializer, MeasurementSerializer
from .repository import MeasurementRepository
from utils.pagination import CustomPagePagination


class MeasurementViewSet(viewsets.GenericViewSet):
    queryset = Measurement.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagePagination

    def get_serializer_class(self):
        return {"GET": MeasurementSerializer, "POST": CreateMeasurementSerializer}[
            self.request.method
        ]

    def get_queryset(self):
        pacient = self.request.query_params.get("pacient", None)

        qs = (
            Measurement.objects.filter(pacient__id=pacient, meal__isnull=True)
            if pacient
            else Measurement.objects.filter(
                pacient__user=self.request.user, meal__isnull=True
            )
        )
        return qs.order_by("-timestamp")

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
