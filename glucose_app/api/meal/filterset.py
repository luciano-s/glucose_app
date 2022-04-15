from django_filters import (
    DateTimeFilter,
    DateTimeFromToRangeFilter,
    FilterSet,
    NumberFilter,
    NumericRangeFilter,
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
    date_bewteen = DateTimeFromToRangeFilter(
        field_name="measurement__timestamp",
    )
    glycemia_between = NumericRangeFilter(field_name="measurement__glycemia")
    ordering = OrderingFilter(
        fields=(
            ("measurement__timestamp", "date"),
            ("cho", "cho"),
            ("injection__ui", "ui"),
            ("injection__timestamp", "injection_date"),
            ("measurement__glycemia", "glycemia"),
            ("type", "meal")
        )
    )
