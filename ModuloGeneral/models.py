from django.db import models

# Create your models here.
class Region(models.Model):
    id_region = models.AutoField(primary_key=True, verbose_name="Id Region")
    nombre_region = models.CharField(max_length=100, verbose_name="Nombre Region")

class Comuna(models.Model):
    id_comuna = models.AutoField(primary_key=True, verbose_name="Id Comuna")
    nombre_comuna = models.CharField(max_length=100, verbose_name="Nombre comuna")
    id_region = models.ForeignKey(Region, on_delete=models.CASCADE)