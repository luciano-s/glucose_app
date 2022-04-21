from django_filters import (
    BooleanFilter,
    DateTimeFilter,
    DateTimeFromToRangeFilter,
    FilterSet,
    NumericRangeFilter,
    OrderingFilter,
)


class MeasurementFilterSet(FilterSet):
    date = DateTimeFromToRangeFilter(field_name="timestamp")
    date__gt = DateTimeFilter(field_name="timestamp", lookup_expr="gt")
    date__lt = DateTimeFilter(field_name="timestamp", lookup_expr="lt")
    is_glycemia_good = BooleanFilter(field_name="is_glycemia_good")
    glycemia = NumericRangeFilter(field_name="glycemia")
    ordering = OrderingFilter(
        fields=(
            ("timestamp", "date"),
            ("glycemia", "glycemia"),
            ("is_glycemia_good", "is_glycemia_good"),
        )
    )
