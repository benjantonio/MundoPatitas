# Generated by Django 3.2.3 on 2022-05-16 00:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ModuloGeneral', '0004_alter_usuario_comuna_alter_usuario_perfil'),
    ]

    operations = [
        migrations.RenameField(
            model_name='veterinario',
            old_name='id_cliente',
            new_name='id_centro',
        ),
    ]
