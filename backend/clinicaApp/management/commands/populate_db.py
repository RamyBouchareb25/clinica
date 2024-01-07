from django.core.management.base import BaseCommand
from faker import Faker
from ...models import Patient, sexe, Consultation, Salle_Consultation, Rendez_Vous, Medecin, Specialite, Salle_Operation, Operation, Medicament, DossierMedical
from random import choice

class Command(BaseCommand):
    help = 'Create random patients'

    def handle(self, *args, **options):
        fake = Faker()

        for _ in range(20):  
            faker_name = fake.name().split(" ")
            name = faker_name[0]
            prenom = faker_name[1]
            patient = Patient.objects.create(
                Nom=name,
                Prenom=prenom,
                DateNaissance=fake.date_of_birth(minimum_age=18, maximum_age=90),
                sexe=fake.random_element(elements=(sexe.Homme, sexe.Femme)),
                Adresse=fake.address(),
                num_tel=fake.random_int(min=500000000, max=799999999),
                email=fake.email(),
            )
            faker_name = fake.name().split(" ")
            name = faker_name[0]
            prenom = faker_name[1]
            medecin = Medecin.objects.create(
                Nom=name,
                Prenom=prenom,
                DateNaissance=fake.date_of_birth(minimum_age=18, maximum_age=90),
                sexe=fake.random_element(elements=(sexe.Homme, sexe.Femme)),
                Adresse=fake.address(),
                num_tel=fake.random_int(min=500000000, max=799999999),
                email=fake.email(),
                specialite=fake.random_element(elements=(Specialite.Cardiologue, Specialite.Neurologue, Specialite.Urologue, Specialite.Rhumatologue, Specialite.ORL, Specialite.Generaliste)),
            )
            salle_consultation = Salle_Consultation.objects.create(
                Numero_de_salle=fake.random_int(min=1, max=100),
                Disponibilite=fake.random_element(elements=(True, False)),
            )
            consultation = Consultation.objects.create(
                estPasser=fake.random_element(elements=(True, False)),
                salle=salle_consultation,
                Diagnostic=fake.text(),
                Traitement=fake.text(),
                commentaire=fake.text(),
            )
            salle_operation = Salle_Operation.objects.create(
                Numero_de_salle=fake.random_int(min=1, max=100),
                Disponibilite=fake.random_element(elements=(True, False)),
            )
            operation = Operation.objects.create(
                estPasser=fake.random_element(elements=(True, False)),
                salle=salle_operation,
                Type = fake.text(),
            )
            # List of medicament names
            medicament_names = [
                "Ibuprofen", "Paracetamol", "Amoxicillin", "Citalopram", "Amlodipine",
                "Aspirin", "Lisinopril", "Omeprazole", "Simvastatin", "Metformin",
                "Gabapentin", "Prednisone", "Diazepam", "Warfarin", "Ciprofloxacin",
                "Levothyroxine", "Albuterol", "Furosemide", "Losartan", "Atorvastatin"
            ]

            # List of medicament descriptions
            medicament_Description = [
                "Relieves pain and reduces inflammation.", 
                "Effective for reducing fever and mild to moderate pain.",
                "An antibiotic used to treat various bacterial infections.",
                "Treats depression and related conditions.",
                "Manages high blood pressure and chest pain.",
                "Commonly used as a pain reliever and anti-inflammatory agent.",
                "Lowers blood pressure and reduces the risk of stroke and heart attack.",
                "Reduces stomach acid production.",
                "Lowers cholesterol levels in the blood.",
                "Manages type 2 diabetes by improving insulin sensitivity.",
                "Treats nerve pain caused by herpes virus or shingles.",
                "Reduces inflammation and treats various conditions.",
                "Calms anxiety and helps with muscle spasms.",
                "Prevents blood clots and treats certain conditions.",
                "An antibiotic effective against various bacterial infections.",
                "Replaces or provides more thyroid hormone.",
                "Relaxes the muscles in the airways and improves breathing.",
                "Diuretic that helps the body get rid of excess water and salt.",
                "Lowers blood pressure and reduces the risk of stroke.",
                "Lowers cholesterol levels and reduces the risk of cardiovascular events."
            ]

            # List of medicament dosages
            medicament_Dosage = [
                "200mg", "500mg", "250mg", "20mg", "5mg",
                "81mg", "10mg", "40mg", "20mg", "1000mg",
                "300mg", "5mg", "10mg", "2.5mg", "500mg",
                "50mcg", "90mcg", "200mcg", "40mcg", "10mg"
            ]
            medicament = Medicament.objects.create(
                Nom=fake.random_element(medicament_names),
                Description=fake.random_element(medicament_Description),
                Dosage=fake.random_element(medicament_Dosage),
            )
            # List of antecedents
            Antecedents = [
                "Hypertension", "Diabetes", "Asthma", "Hyperlipidemia", "Arthritis",
                "Heart disease", "Thyroid disorder", "Chronic kidney disease", "Migraines", "Osteoporosis",
                "Gastroesophageal reflux disease (GERD)", "Depression", "Anxiety", "Chronic obstructive pulmonary disease (COPD)", "Stroke",
                "Rheumatoid arthritis", "Cancer", "Epilepsy", "Ulcerative colitis", "Crohn's disease"
            ]

            # List of allergies
            Allergies = [
                "Penicillin", "Aspirin", "Shellfish", "Nuts", "Latex",
                "Sulfa drugs", "Eggs", "Milk", "Insect stings", "Dust mites",
                "Pet dander", "Mold", "Pollen", "Cigarette smoke", "Ibuprofen",
                "Codeine", "Peanuts", "Tree nuts", "Fish", "Wheat"
            ]
            dossier_medical = DossierMedical.objects.create(
                Patient=patient,
                DateCreation = fake.date_of_birth(minimum_age=18, maximum_age=90),
                Antecedents = fake.random_element(Antecedents),
                Allergies = fake.random_element(Allergies),
            )
            dossier_medical.Medicaments.set([medicament])
            dossier_medical.Consultations.set([consultation])
            dossier_medical.Operations.set([operation])
            if choice([True, False]):
                Rendez_Vous.objects.create(
                    Date=fake.future_date(end_date="+30d"),
                    Heure=fake.time(),
                    Patient=patient,
                    Medecin=medecin,
                    service=fake.random_element(elements=(Specialite.Cardiologue, Specialite.Neurologue, Specialite.Urologue, Specialite.Rhumatologue, Specialite.ORL, Specialite.Generaliste)),
                    Titre=fake.text(),
                    operation=operation,
                )
            else:
                Rendez_Vous.objects.create(
                    Date=fake.future_date(end_date="+30d"),
                    Heure=fake.time(),
                    Patient=patient,
                    Medecin=medecin,
                    service=fake.random_element(elements=(Specialite.Cardiologue, Specialite.Neurologue, Specialite.Urologue, Specialite.Rhumatologue, Specialite.ORL, Specialite.Generaliste)),
                    Titre=fake.text(),
                    consultation=consultation,
                )
            
            