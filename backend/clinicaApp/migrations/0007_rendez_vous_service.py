# Generated by Django 4.2.8 on 2024-01-04 02:31

import clinicaApp.models
from django.db import migrations
import django_enumfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('clinicaApp', '0006_calendrier_date_calendrier_disponibilite_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='rendez_vous',
            name='service',
            field=django_enumfield.db.fields.EnumField(default=6, enum=clinicaApp.models.Specialite),
        ),
    ]
