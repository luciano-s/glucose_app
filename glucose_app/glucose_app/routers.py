from rest_framework import routers
from api.user.register import RegisterUserViewSet
from api.user.login import LoginUserViewSet
router = routers.DefaultRouter()

router.register(r"user", RegisterUserViewSet, basename="user")
router.register(r"login", LoginUserViewSet, basename="login")