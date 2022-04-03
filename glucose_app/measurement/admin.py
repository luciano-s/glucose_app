from django.contrib import admin
from measurement.models import Measurement


class MeasurementAdmin(admin.ModelAdmin):
    model = Measurement


admin.site.register(Measurement, MeasurementAdmin)
