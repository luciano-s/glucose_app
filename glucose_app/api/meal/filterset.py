from django_filters import (
    FilterSet,
    NumberFilter,
    DateTimeFilter,
    DateTimeFromToRangeFilter,
    OrderingFilter,
)
from meal.models import Meal


class MealFilterSet(FilterSet):
    cho__gt = NumberFilter(field_name="cho", lookup_expr="gt")
    cho__lt = NumberFilter(field_name="cho", lookup_expr="lt")
    date__lt = DateTimeFilter(
        field_name="measurment__timestamp",
        lookup_expr="lt",
    )
    date__gt = DateTimeFilter(
        field_name="measurment__timestamp",
        lookup_expr="gt",
    )
    date_bewteen = DateTimeFromToRangeFilter(field_name="measurement__timestamp")

    ordering = OrderingFilter(
        fields=(
            ("measurement__timestamp", "date"),
            ("cho", "cho"),
            ("injection__ui", "UI"),
        )
    )

    class Meta:
        model = Meal
        fields = [
            "cho",
            "type",
        ]
