from posixpath import basename
from rest_framework import routers
from api.user.register import RegisterUserViewSet
from api.user.login import AuthUserViewSet
from api.measurement import MeasurementViewSet
from api.meal.viewset import MealViewSet

router = routers.DefaultRouter()

router.register(r"user", RegisterUserViewSet, basename="user")
router.register(r"auth", AuthUserViewSet, basename="auth")
router.register(r"measurement", MeasurementViewSet, basename="measurement")
router.register(r"meal", MealViewSet, basename="meal")
