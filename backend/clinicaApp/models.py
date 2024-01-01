from django.db import models
from django_enumfield import enum

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

class Medecin(models.Model):
    ID_Medecin = models.AutoField(primary_key=True)
    Nom = models.CharField(max_length=(50))
    Prenom = models.CharField(max_length=(50))
    DateNaissance = models.DateField
    sexe = models.CharField(max_length=(50))
    Adresse = models.CharField(max_length=(50))
    num_tel = models.IntegerField
    email = models.EmailField
    specialite = enum.EnumField(Specialite)

class Rendez_Vous(models.Model):
    ID_RDV = models.AutoField(primary_key=True)
    Date = models.DateField
    Heure = models.TimeField
    Patient = models.ForeignKey(Patient,on_delete=models.CASCADE)
    Medecin = models.ForeignKey(Medecin,on_delete=models.CASCADE)

class Consultation (models.Model):
    ID_Consultation =models.AutoField(primary_key=True)
    Rendez_Vous = models.ForeignKey(Rendez_Vous,on_delete=models.CASCADE)
    Diagnostic = models.CharField(max_length=(50))
    Traitement = models.CharField(max_length=(50))
    commentaire = models.CharField(max_length=(50))
    
class DossierMedical(models.Model):
    ID_Dossier = models.AutoField(primary_key=True)
    Patient = models.ForeignKey(Patient,on_delete=models.CASCADE)
    Consultation = models.ForeignKey(Consultation,on_delete=models.CASCADE)
    
class Salle_Consultation(models.Model):
    ID_Salle = models.AutoField(primary_key=True)
    Numero_de_salle = models.IntegerField
    Disponibilite = models.BooleanField

class Calendrier(models.Model):
    ID_Calendrier = models.AutoField(primary_key=True)
    Medecin = models.ForeignKey(Medecin,on_delete=models.CASCADE)
    Salle_Consultation = models.ForeignKey(Salle_Consultation,on_delete=models.CASCADE)
    HeureDebut = models.TimeField
    HeureFin = models.TimeField
    Date = models.DateField
    Disponibilite = models.BooleanField
    
class SuiviPostOperatoire(models.Model):
    ID_Suivi = models.AutoField(primary_key=True)
    Patient = models.ForeignKey(Patient,on_delete=models.CASCADE)
    Medecin = models.ForeignKey(Medecin,on_delete=models.CASCADE)
    Evolution = models.CharField(max_length=(50))
    Recommandation = models.CharField(max_length=(50))