from django.forms import ValidationError
from rest_framework import mixins, response, status, viewsets
from .serializer import UserRegisterSerializer
from user.models import User
from .use_case import RegisterUserUseCase
from .repository import RegisterUserRepository

class RegisterUserViewSet(viewsets.GenericViewSet):

    def get_serializer_class(self):
        return UserRegisterSerializer
    
    def get_queryset(self):
        return User.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        repository = RegisterUserRepository()
        use_case = RegisterUserUseCase(data=serializer.validated_data, repository=repository)
        try:
            use_case.execute()
        except ValidationError:
            return response.Response(data={"message": "Usuário já cadastrado"}, status=status.HTTP_400_BAD_REQUEST)
            
        return response.Response(serializer.data, status=status.HTTP_201_CREATED)    
    