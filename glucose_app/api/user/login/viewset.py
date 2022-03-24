from codecs import lookup
from rest_framework import response, status, viewsets
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token
from user.models import User

class LoginUserViewSet(viewsets.GenericViewSet):
    queryset = User.objects.all()

    def get_object(self):
        try:
            user = User.objects.get(email=self.request.data.get("email", None), password=self.request.data.get("password", None))
        except Exception:
            return False
        return user

    def list(self, request):
        
        user = self.get_object()

        if user:
            token = Token.objects.create(user=user)
            return response.Response(data={"token": token.key}, status=status.HTTP_200_OK)

        return response.Response({"message": "Usuário ou senha inválidos"}, status=status.HTTP_400_BAD_REQUEST)