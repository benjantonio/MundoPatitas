# Generated by Django 3.2.3 on 2022-05-18 18:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModuloGeneral', '0013_alter_citadisponible_fecha'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='citadisponible',
            name='fecha',
        ),
        migrations.RemoveField(
            model_name='citadisponible',
            name='hora',
        ),
    ]
