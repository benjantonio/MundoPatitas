# Generated by Django 4.0.1 on 2022-05-18 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ModuloGeneral', '0004_alter_usuario_comuna_alter_usuario_perfil'),
    ]

    operations = [
        migrations.AlterField(
            model_name='veterinario',
            name='valoracion',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]