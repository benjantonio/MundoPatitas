from typing import cast
from django.db import models
from datetime import datetime, date
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db.models.base import ModelBase
from django.db.models.fields import NullBooleanField


class Region(models.Model):
    id_region = models.AutoField(primary_key=True, verbose_name="Id Region")
    nombre_region = models.CharField(max_length=100, verbose_name="Nombre Region")

    def __str__(self):
        return f'{self.nombre_region},{self.id_region}'

class Comuna(models.Model):
    id_comuna = models.AutoField(primary_key=True, verbose_name="Id Comuna")
    nombre_comuna = models.CharField(max_length=100, verbose_name="Nombre comuna")
    id_region = models.ForeignKey(Region, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.nombre_comuna}'

class Perfil(models.Model):
    id_perfil= models.AutoField(primary_key=True, verbose_name="ID Perfil")
    descripcion =models.CharField(max_length=50)

    def __str__(self):
        return self.descripcion

class UsuarioManager(BaseUserManager):
    def cretae_user(self,email,username, nombres, apellidos, comuna, perfil,password=None ):
        if not email:
            raise ValueError('El usuario debe tener un email')

        usuario = self.model(username=username, 
                             email = self.normalize_email(email), 
                             nombres = nombres, 
                             apellidos = apellidos,
                             comuna= Comuna.objects.get(id_comuna = comuna),
                             perfil = Perfil.objects.get(id_perfil= perfil))
                             
        
        usuario.set_password(password)
        usuario.save()
        return usuario

    def create_superuser(self,email,username, nombres, apellidos, comuna, perfil, password ):
        usuario = self.cretae_user(
                             email, 
                             username=username, 
                             nombres = nombres, 
                             apellidos = apellidos,
                             comuna=comuna,
                             perfil=perfil,
                             password= password,
                             
        )
        usuario.usuario_administrador = True
        usuario.save()
        return usuario


class Usuario(AbstractBaseUser):
    id_usuario = models.AutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=100)
    email = models.EmailField(unique=True, max_length=250)
    nombres = models.CharField(max_length=100, blank=True, null=True)
    apellidos = models.CharField(max_length=100, blank=True, null=True)
    edad = models.IntegerField(blank=True, null=True)
    celular = models.IntegerField(blank=True, null=True)
    direccion = models.CharField(max_length=250, blank=True, null=True)
    comuna = models.ForeignKey(Comuna, blank=True, null=True, on_delete=models.CASCADE)
    perfil = models.ForeignKey(Perfil,blank=True, null=True,on_delete=models.CASCADE)
    usuario_activo = models.BooleanField(default=True)
    usuario_administrador = models.BooleanField(default=False)
    objects = UsuarioManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'nombres', 'apellidos', 'perfil', 'comuna']

    def __str__(self):
        return f'{self.nombres},{self.apellidos}'

    def has_perm(self,perm,obj=None):
        return True
    
    def has_module_perms(self,app_label):
        return True

    @property
    def is_staff(self):
        return self.usuario_administrador


class PublicacionForo(models.Model):
    id_publicacion = models.AutoField(primary_key=True, verbose_name="Id Publicación")
    categoria = models.CharField(max_length=100, verbose_name="Categoria Publicación")
    titulo = models.CharField(max_length=1000, verbose_name="titulo", default="")
    fecha = models.DateField(max_length=11, default='')
    hora = models.CharField(max_length=9,verbose_name="Hora",default="")
    mensaje = models.CharField(max_length=1000, verbose_name="Mensaje")
    
    cantRespuestas = models.IntegerField(default='0')
    id_cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return self.id_publicacion

class RespuestaForo(models.Model):
    id_respuesta = models.AutoField(primary_key=True)
    fecha = models.DateField(max_length=11, default='')
    hora = models.CharField(max_length=9,verbose_name="Hora",default="")
    comentario = models.CharField(max_length=1000)
    valoracion = models.IntegerField()
    id_cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    id_publicacion = models.ForeignKey(PublicacionForo, on_delete=models.CASCADE)

    def __str__(self):
        return self.id_respuesta

class PublicacionAdopcion(models.Model):
    id_publicacion = models.AutoField(primary_key=True, verbose_name="Id Publicación")
    tipo_animal = models.CharField(max_length=50)
    nombre = models.CharField(max_length=50)
    correo = models.CharField(max_length=50)
    celular = models.IntegerField(blank=True, null=True)
    edad = models.IntegerField()
    comentario = models.CharField(max_length=500)
    img = models.CharField(max_length=500,blank=True, null=True)
    id_cliente = models.ForeignKey(Usuario,blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.tipo_animal

class Mascota(models.Model):
    id_mascota = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    img = models.CharField(max_length=1000, blank=True, null=True)
    tipo = models.CharField(max_length=50)
    raza = models.CharField(max_length=50)
    edad = models.IntegerField()
    id_cliente = models.ForeignKey(Usuario,  on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.nombre},{self.tipo}'



class Veterinario(models.Model):
    id_veterinario = models.AutoField(primary_key=True)
    nombre_completo = models.CharField(max_length=100)
    correo = models.CharField(max_length=50)
    celular = models.IntegerField(blank=True, null=True)
    clave = models.CharField(max_length=50,blank=True, null=True)
    id_perfil = models.ForeignKey(Perfil,blank=True, null=True, on_delete=models.CASCADE)
    id_cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre_completo

class CitaDisponible(models.Model):
    id_cita = models.AutoField(primary_key=True)
    fecha = models.CharField(max_length=11, default='')
    hora = models.CharField(max_length=5, default='')
    id_veterinario = models.ForeignKey(Veterinario, on_delete=models.CASCADE, default='')
    actualizacion = models.CharField(max_length=30, default='', null=False)

    def __str__(self):
        return self.fecha

class CitaTomada(models.Model):

    id_cita = models.AutoField(primary_key=True)
    fecha = models.DateField(max_length=11, default='')
    hora = models.CharField(max_length=5, default='')
    motivo_consulta = models.CharField(max_length=1000, default='')
    estado = models.CharField(max_length=20, default='En Espera')
    id_mascota = models.ForeignKey(Mascota, on_delete=models.CASCADE, default='')
    id_veterinario = models.ForeignKey(Veterinario, on_delete=models.CASCADE, default='')

def __str__(self):
        return self.fecha


class CitaConcluida(models.Model):
    id_cita = models.AutoField(primary_key=True)
    fecha = models.DateField(max_length=11, default='')
    hora = models.CharField(max_length=5, default='')
    motivo_consulta = models.CharField(max_length=1000, default='')
    tratamiento = models.CharField(max_length=600, default='No se registraron tratamientos.')
    comentario = models.CharField(max_length=1000, default='No se registraron comentarios.')
    valoracion = models.IntegerField(default=0, )
    id_mascota = models.ForeignKey(Mascota, on_delete=models.CASCADE, default='')
    id_cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE, default='')
    id_veterinario = models.ForeignKey(Veterinario, on_delete=models.CASCADE, default='')
    duracion = models.CharField(max_length=9, default='?')
    

    def __str__(self):
        return self.id_cita



