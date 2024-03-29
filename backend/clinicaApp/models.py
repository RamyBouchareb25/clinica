from django.db import models
from django.db.models import Count, Q
from django_enumfield import enum
from django.utils import timezone
from dateutil.relativedelta import relativedelta
from django.core.exceptions import ValidationError
from datetime import datetime
# Create your models here.
class sexe(enum.Enum):
    Homme = 1
    Femme = 2
class Specialite(enum.Enum):
    Cardiologue = 1
    Neurologue = 2
    Urologue = 3
    Rhumatologue = 4
    ORL = 5
    Generaliste = 6

class Patient(models.Model):
    ID_Patient = models.AutoField(primary_key=True)
    Nom = models.CharField(max_length=(50))
    Prenom = models.CharField(max_length=(50))
    DateNaissance = models.DateField(default='2000-01-01')
    sexe = enum.EnumField(sexe)
    Adresse = models.CharField(max_length=(50))
    num_tel = models.IntegerField(default=0)
    email = models.EmailField(default="test@domain.com")
    @property
    def age(self):
        date_naissance_datetime = datetime.combine(self.DateNaissance, datetime.min.time())
        date_naissance_aware = timezone.make_aware(date_naissance_datetime)
        return relativedelta(timezone.now(), date_naissance_aware).years
class Medecin(models.Model):
    ID_Medecin = models.AutoField(primary_key=True)
    Nom = models.CharField(max_length=(50))
    Prenom = models.CharField(max_length=(50))
    DateNaissance = models.DateField(default='2000-01-01')
    sexe = enum.EnumField(sexe)
    Adresse = models.CharField(max_length=(50))
    num_tel = models.IntegerField(default=0)
    email = models.EmailField(default="test@domain.com")
    specialite = enum.EnumField(Specialite)
    
class Salle_Consultation(models.Model):
    ID_Salle = models.AutoField(primary_key=True)
    Numero_de_salle = models.IntegerField(default=0)
    Disponibilite = models.BooleanField(default=False)


class Salle_Operation(models.Model):
    ID_Salle = models.AutoField(primary_key=True)
    Numero_de_salle = models.IntegerField(default=0)
    Disponibilite = models.BooleanField(default=False)

class Medicament(models.Model):
    ID_Medicament = models.AutoField(primary_key=True)
    Nom = models.CharField(max_length=200)
    Description = models.TextField(blank=True)
    Dosage = models.CharField(max_length=100, blank=True)
    
class DossierMedical(models.Model):
    ID_Dossier = models.AutoField(primary_key=True)
    Patient = models.OneToOneField(Patient, on_delete=models.CASCADE,null=True)
    DateCreation = models.DateField(auto_now_add=True, null=True, blank=True)
    Antecedents = models.TextField(blank=True)
    Allergies = models.TextField(blank=True)
    Medicaments = models.ManyToManyField(Medicament, blank=True)

    
class Operation(models.Model):
    ID_Operation = models.AutoField(primary_key=True)
    estPasser = models.BooleanField(default=False)
    Type = models.CharField(max_length=200)
    salle = models.ForeignKey(Salle_Operation, on_delete=models.CASCADE)
    dossier_medical = models.ForeignKey(DossierMedical, on_delete=models.CASCADE, null=True, blank=True)
    remission = models.BooleanField(default=False)
    
class Consultation (models.Model):
    ID_Consultation =models.AutoField(primary_key=True)
    estPasser = models.BooleanField(default=False)
    salle = models.ForeignKey(Salle_Consultation,on_delete=models.CASCADE,null=True)
    Diagnostic = models.CharField(max_length=(50))
    Traitement = models.CharField(max_length=(50))
    commentaire = models.CharField(max_length=(50))
    dossier_medical = models.ForeignKey(DossierMedical, on_delete=models.CASCADE, null=True, blank=True)
    remission = models.BooleanField(default=False)

class Rendez_Vous(models.Model):
    ID_RDV = models.AutoField(primary_key=True)
    Date = models.DateField(default='2000-01-01')
    Heure = models.TimeField(default='00:00:00')
    Patient = models.ForeignKey(Patient,on_delete=models.CASCADE)
    Medecin = models.ForeignKey(Medecin,on_delete=models.CASCADE)
    service = enum.EnumField(Specialite)
    Titre = models.CharField(max_length=(50),default="Consultation")
    consultation = models.ForeignKey(Consultation,on_delete=models.CASCADE,null=True,blank=True)
    operation = models.ForeignKey(Operation,on_delete=models.CASCADE,null=True,blank=True)

    def save(self, *args, **kwargs):
        self.service = self.Medecin.specialite
        if self.consultation and self.operation:
            raise ValidationError("Un rendez-vous ne peut pas avoir à la fois une consultation et une opération.")
        if not self.consultation and not self.operation:
            raise ValidationError("Un rendez-vous doit avoir soit une consultation soit une opération.")
        super().save(*args, **kwargs)



# class PatientStats(models.Model):
#     department = enum.EnumField(Specialite)
#     patient_count = models.IntegerField()

#     @classmethod
#     def update_stats(cls):
#         from .models import Rendez_Vous  # Import here to avoid circular import
#         stats = Rendez_Vous.objects.values('service').annotate(patient_count=Count('Patient', distinct=True))
#         cls.objects.all().delete()
#         cls.objects.bulk_create([cls(specialite=stat['service'], patient_count=stat['patient_count']) for stat in stats])

# class RemissionStats(models.Model):
#     month = models.DateField()
#     remission_count = models.IntegerField()

#     @classmethod
#     def update_stats(cls):
#         from .models import Consultation, Operation  # Import here to avoid circular import
#         month_start = timezone.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
#         remissions = (Consultation.objects.filter(remission=True, date__gte=month_start) |
#                       Operation.objects.filter(remission=True, date__gte=month_start))
#         cls.objects.filter(month=month_start).delete()
#         cls.objects.create(month=month_start, remission_count=remissions.count())