from rest_framework import serializers
from .models import Patient, Medecin, Rendez_Vous, Consultation, Salle_Consultation, Salle_Operation, Operation,DossierMedical,Medicament

class PatientSerializer(serializers.ModelSerializer):
    age = serializers.SerializerMethodField()

    class Meta:
        model = Patient
        fields = ('ID_Patient', 'Nom', 'Prenom', 'DateNaissance', 'sexe', 'Adresse', 'num_tel', 'email', 'age')

    def get_age(self, obj):
        return obj.age
class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medecin
        fields = ('ID_Medecin', 'Nom', 'Prenom', 'DateNaissance', 'sexe', 'Adresse', 'num_tel', 'email', 'specialite')
class RendezVousSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rendez_Vous
        fields = ('ID_RDV', 'Date', 'Heure', 'Patient', 'Medecin', 'service', 'Titre')
        

class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = '__all__'

class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = '__all__'  
        
class OperationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operation
        fields = '__all__'
        
class DossierMedicalSerializer(serializers.ModelSerializer):
    consultations = serializers.SerializerMethodField()
    operations = serializers.SerializerMethodField()
    Medicaments = MedicamentSerializer(many=True, read_only=True)
    class Meta:
        model = DossierMedical
        fields = ['ID_Dossier', 'DateCreation', 'Allergies', 'Antecedents', 'Patient', 'consultations', 'Medicaments', 'operations']
        
    def get_consultations(self, obj):
        consultations = Consultation.objects.filter(dossier_medical=obj)
        return ConsultationSerializer(consultations, many=True).data
    
    def get_operations(self, obj):
        operations = Operation.objects.filter(dossier_medical=obj)
        return OperationsSerializer(operations, many=True).data