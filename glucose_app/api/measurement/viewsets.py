from warnings import filters
from rest_framework import response, status, viewsets
from rest_framework.permissions import IsAuthenticated
from measurement.models import Measurement
from .serializer import MeasurementSerializer


class MeasurementViewSet(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        return MeasurementSerializer

    def get_queryset(self):
        return Measurement.objects.filter(pacient__user=self.request.user)

    def list(self, request):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        pass