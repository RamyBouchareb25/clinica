from rest_framework import serializers
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    age = serializers.SerializerMethodField()

    class Meta:
        model = Patient
        fields = ('ID_Patient', 'Nom', 'Prenom', 'DateNaissance', 'sexe', 'Adresse', 'num_tel', 'email', 'age')

    def get_age(self, obj):
        return obj.age