# Generated by Django 4.2.8 on 2024-01-04 18:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clinicaApp', '0008_alter_rendez_vous_service'),
    ]

    operations = [
        migrations.AddField(
            model_name='rendez_vous',
            name='Titre',
            field=models.CharField(default='Consultation', max_length=50),
        ),
    ]