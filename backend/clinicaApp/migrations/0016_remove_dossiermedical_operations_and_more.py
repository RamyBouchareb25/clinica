# Generated by Django 4.2.8 on 2024-01-08 22:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clinicaApp', '0015_remove_dossiermedical_consultations_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dossiermedical',
            name='Operations',
        ),
        migrations.AddField(
            model_name='operation',
            name='dossier_medical',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='clinicaApp.dossiermedical'),
        ),
    ]
