# Generated by Django 4.0.1 on 2022-04-25 22:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Region',
            fields=[
                ('id_region', models.AutoField(primary_key=True, serialize=False, verbose_name='Id Region')),
                ('nombre_region', models.CharField(max_length=100, verbose_name='Nombre Region')),
            ],
        ),
    ]
