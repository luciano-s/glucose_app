import json
from rest_framework import response, status, viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from user.models import User
from pacient.models import Pacient
from .serializer import PacientSerializer


class AuthUserViewSet(viewsets.ViewSet):
    queryset = User.objects.all()

    def get_object(self, request):
        try:
            user = User.objects.get(
                email=request.data.get("email", None),
                password=request.data.get("password", None),
            )
        except Exception:
            return False
        return user

    @action(methods=["POST"], detail=False, url_name="login")
    def login(self, request):
        user = self.get_object(request)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            pacient = Pacient.objects.get(user=user)
            serializer = PacientSerializer(pacient)

            return response.Response(
                data={"pacient": serializer.data, "token": token.key},
                status=status.HTTP_200_OK,
            )

        return response.Response(
            {"message": f"Usuário ou senha inválidos"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    @permission_classes([IsAuthenticated])
    @action(methods=["GET"], detail=False, url_name="logout")
    def logout(self, request, pk=None):
        token = Token.objects.filter(user=request.user)
        if token:
            token.delete()
            return response.Response(
                {"message": "Logout realizado com sucesso"}, status=status.HTTP_200_OK
            )

        return response.Response(
            {"message": "Erro ao fazer logout"}, status=status.HTTP_400_BAD_REQUEST
        )

    def create_user():
        pass