from django.contrib import admin
from .models import Patient,Medecin,Rendez_Vous,Consultation,DossierMedical,Salle_Consultation,Operation,Salle_Operation,Medicament
# Register your models here.

admin.site.register(Patient)
admin.site.register(Medecin)
admin.site.register(Rendez_Vous)
admin.site.register(Consultation)
admin.site.register(DossierMedical)
admin.site.register(Salle_Consultation)
admin.site.register(Operation)
admin.site.register(Salle_Operation)
admin.site.register(Medicament)

