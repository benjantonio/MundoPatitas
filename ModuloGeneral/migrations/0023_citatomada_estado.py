# Generated by Django 4.0.3 on 2022-05-28 02:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ModuloGeneral', '0022_alter_citadisponible_actualizacion'),
    ]

    operations = [
        migrations.AddField(
            model_name='citatomada',
            name='estado',
            field=models.CharField(default='', max_length=20),
        ),
    ]