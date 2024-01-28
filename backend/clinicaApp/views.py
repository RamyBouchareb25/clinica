from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PatientSerializer,DoctorSerializer,RendezVousSerializer,ConsultationSerializer,DossierMedicalSerializer
from .models import Patient,Medecin,Rendez_Vous,Consultation,DossierMedical,Salle_Consultation
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status


class RendezVousView(viewsets.ModelViewSet):
    serializer_class = RendezVousSerializer
    queryset = Rendez_Vous.objects.all()
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    def perform_create(self, serializer):
        serializer.save()
        
    def update(self, request, pk=None):
        rdv = self.get_object()
        serializer = self.get_serializer(rdv, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def partial_update(self, request, pk=None):
        rdv = self.get_object()
        serializer = self.get_serializer(rdv, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def perform_update(self, serializer):
        serializer.save()


class DoctorView(viewsets.ModelViewSet):
    serializer_class = DoctorSerializer
    queryset = Medecin.objects.all()
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    def perform_create(self, serializer):
        serializer.save()
        
    def update(self, request, pk=None):
        doctor = self.get_object()
        serializer = self.get_serializer(doctor, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def partial_update(self, request, pk=None):
        doctor = self.get_object()
        serializer = self.get_serializer(doctor, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def perform_update(self, serializer):
        serializer.save()


class ConsultationView(viewsets.ModelViewSet):
    serializer_class = ConsultationSerializer
    queryset = Consultation.objects.all()
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    def perform_create(self, serializer):
        serializer.save()
        
    def update(self, request, pk=None):
        consultation = self.get_object()
        serializer = self.get_serializer(consultation, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def partial_update(self, request, pk=None):
        consultation = self.get_object()
        serializer = self.get_serializer(consultation, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def perform_update(self, serializer):
        serializer.save()
class DossierMedicalView(viewsets.ModelViewSet):
    serializer_class = DossierMedicalSerializer
    queryset = DossierMedical.objects.all()
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        dossier = self.perform_create(serializer)
        
        headers = self.get_success_headers(serializer.data)
        return Response(DossierMedicalSerializer(dossier).data, status=status.HTTP_201_CREATED, headers=headers)
    def perform_create(self, serializer):
        return serializer.save()
        
    def update(self, request, pk=None):
        dossier = self.get_object()
        serializer = self.get_serializer(dossier, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(DossierMedicalSerializer(dossier).data, status=status.HTTP_200_OK)

    def perform_update(self, serializer):
        serializer.save()
        
    def destroy(self, request, *args, **kwargs):
        dossier = self.get_object()
        dossier.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PatientView(viewsets.ModelViewSet):
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    def perform_create(self, serializer):
        serializer.save()
        
    def update(self, request, pk=None):
        patient = self.get_object()
        serializer = self.get_serializer(patient, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def partial_update(self, request, pk=None):
        patient = self.get_object()
        serializer = self.get_serializer(patient, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def perform_update(self, serializer):
        serializer.save()
