# Generated by Django 4.2.8 on 2024-01-28 22:40

import clinicaApp.models
from django.db import migrations, models
import django_enumfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('clinicaApp', '0017_alter_dossiermedical_patient'),
    ]

    operations = [
        migrations.CreateModel(
            name='PatientStats',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('department', django_enumfield.db.fields.EnumField(enum=clinicaApp.models.Specialite)),
                ('patient_count', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='RemissionStats',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('month', models.DateField()),
                ('remission_count', models.IntegerField()),
            ],
        ),
        migrations.AddField(
            model_name='consultation',
            name='remission',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='operation',
            name='remission',
            field=models.BooleanField(default=False),
        ),
    ]
