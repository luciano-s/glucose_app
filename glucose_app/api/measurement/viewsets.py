from http.client import REQUEST_HEADER_FIELDS_TOO_LARGE
from warnings import filters
from rest_framework import response, status, viewsets
from rest_framework.permissions import IsAuthenticated
from api.measurement.use_case import CreateMeasurementUseCase
from measurement.models import Measurement
from .serializer import CreateMeasurementSerializer, MeasurementSerializer
from .repository import MeasurementRepository


class MeasurementViewSet(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        return {"get": MeasurementSerializer, "post": CreateMeasurementSerializer}[
            self.request.method.lower()
        ]

    def get_queryset(self):
        pacient = self.request.query_params.get("pacient", None)
        if pacient:
            return Measurement.objects.filter(pacient__id=pacient, meal__isnull=True)
        return Measurement.objects.filter(
            pacient__user=self.request.user, meal__isnull=True
        )

    def list(self, request):
        serializer = self.get_serializer(self.get_queryset(), many=True)
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
