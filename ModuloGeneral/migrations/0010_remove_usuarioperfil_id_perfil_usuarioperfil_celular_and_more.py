# Generated by Django 4.0.1 on 2022-04-29 00:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ModuloGeneral', '0009_alter_perfilusuario_id_perfil_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuarioperfil',
            name='id_perfil',
        ),
        migrations.AddField(
            model_name='usuarioperfil',
            name='celular',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='usuarioperfil',
            name='comuna',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='usuarioperfil',
            name='direccion',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.DeleteModel(
            name='PerfilUsuario',
        ),
    ]
