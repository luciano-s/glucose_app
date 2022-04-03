from django.contrib import admin
from pacient.models import Pacient


class PacientAdmin(admin.ModelAdmin):
    model = Pacient


admin.site.register(Pacient, PacientAdmin)
