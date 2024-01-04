# Generated by Django 4.2.8 on 2024-01-03 20:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clinicaApp', '0005_medecin_datenaissance_medecin_email_medecin_num_tel_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='calendrier',
            name='Date',
            field=models.DateField(default='2000-01-01'),
        ),
        migrations.AddField(
            model_name='calendrier',
            name='Disponibilite',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='calendrier',
            name='HeureDebut',
            field=models.TimeField(default='00:00:00'),
        ),
        migrations.AddField(
            model_name='calendrier',
            name='HeureFin',
            field=models.TimeField(default='00:00:00'),
        ),
        migrations.AddField(
            model_name='rendez_vous',
            name='Date',
            field=models.DateField(default='2000-01-01'),
        ),
        migrations.AddField(
            model_name='rendez_vous',
            name='Heure',
            field=models.TimeField(default='00:00:00'),
        ),
        migrations.AddField(
            model_name='salle_consultation',
            name='Disponibilite',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='salle_consultation',
            name='Numero_de_salle',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='medecin',
            name='email',
            field=models.EmailField(default='test@domain.com', max_length=254),
        ),
        migrations.AlterField(
            model_name='medecin',
            name='num_tel',
            field=models.IntegerField(default=0),
        ),
    ]
