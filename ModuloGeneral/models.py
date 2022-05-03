from django.db import models

from user.models import Usuario

class Region(models.Model):
    id_region = models.AutoField(primary_key=True, verbose_name="Id Region")
    nombre_region = models.CharField(max_length=100, verbose_name="Nombre Region")

class Comuna(models.Model):
    id_comuna = models.AutoField(primary_key=True, verbose_name="Id Comuna")
    nombre_comuna = models.CharField(max_length=100, verbose_name="Nombre comuna")
    id_region = models.ForeignKey(Region, on_delete=models.CASCADE)

class PublicacionForo(models.Model):
    id_publicacion = models.AutoField(primary_key=True, verbose_name="Id Publicación")
    categoria = models.CharField(max_length=100, verbose_name="Categoria Publicación")
    fecha = models.DateTimeField(auto_now_add=True, verbose_name="Fecha")
    mensaje = models.CharField(max_length=1000, verbose_name="Mensaje")
    id_cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE)

class RespuestaForo(models.Model):
    id_respuesta = models.AutoField(primary_key=True)
    fecha = models.DateTimeField(auto_now_add=True)
    comentario = models.CharField(max_length=1000)
    valoracion = models.IntegerField()
    id_cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    id_publicacion = models.ForeignKey(PublicacionForo, on_delete=models.CASCADE)

class PublicacionAdopcion(models.Model):
    id_publicacion = models.AutoField(primary_key=True, verbose_name="Id Publicación")
    tipo_animal = models.CharField(max_length=50)
    nombre = models.CharField(max_length=50)
    correo = models.CharField(max_length=50)
    edad = models.IntegerField()
    comentario = models.CharField(max_length=500)

class Mascota(models.Model):
    id_mascota = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    tipo = models.CharField(max_length=50)
    raza = models.CharField(max_length=50)
    edad = models.IntegerField()
    id_cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE)

class Veterinario(models.Model):
    id_veterinario = models.AutoField(primary_key=True)
    nombre_completo = models.CharField(max_length=100)
    correo = models.CharField(max_length=50)
    celular = models.IntegerField()
    valoracion = models.IntegerField()
    id_cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE)

class CitaMedica(models.Model):
    id_cita = models.AutoField(primary_key=True)
    fecha = models.DateTimeField(auto_now_add=True)
    motivo_consulta = models.CharField(max_length=1000)
    id_mascota = models.ForeignKey(Mascota, on_delete=models.CASCADE)
    id_veterinario = models.ForeignKey(Veterinario, on_delete=models.CASCADE)

class ResultadoCita(models.Model):
    id_cita = models.ForeignKey(CitaMedica, primary_key=True, on_delete=models.CASCADE)
    # id_cita = models.OneToOneField(CitaMedica, on_delete=models.CASCADE)
    comentario = models.CharField(max_length=500)




