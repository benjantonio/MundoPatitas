from django.db import models
from datetime import datetime, date
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


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
        return f'{self.nombre_comuna},{self.id_comuna}'

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
    fecha = models.DateTimeField(auto_now_add=True, verbose_name="Fecha")
    mensaje = models.CharField(max_length=1000, verbose_name="Mensaje")
    id_cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return self.categoria

class RespuestaForo(models.Model):
    id_respuesta = models.AutoField(primary_key=True)
    fecha = models.DateTimeField(auto_now_add=True)
    comentario = models.CharField(max_length=1000)
    valoracion = models.IntegerField()
    id_cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    id_publicacion = models.ForeignKey(PublicacionForo, on_delete=models.CASCADE)

    def __str__(self):
        return self.fecha

class PublicacionAdopcion(models.Model):
    id_publicacion = models.AutoField(primary_key=True, verbose_name="Id Publicación")
    tipo_animal = models.CharField(max_length=50)
    nombre = models.CharField(max_length=50)
    correo = models.CharField(max_length=50)
    edad = models.IntegerField()
    comentario = models.CharField(max_length=500)

    def __str__(self):
        return self.tipo_animal

class Mascota(models.Model):
    id_mascota = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    tipo = models.CharField(max_length=50)
    raza = models.CharField(max_length=50)
    edad = models.IntegerField()
    id_cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.nombre},{self.tipo}'

class Veterinario(models.Model):
    id_veterinario = models.AutoField(primary_key=True)
    nombre_completo = models.CharField(max_length=100)
    tipo_atencion = models.CharField(max_length=11, default="")
    correo = models.CharField(max_length=50)
    celular = models.IntegerField()
    id_centro = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre_completo

class CitaDisponible(models.Model):
    id_cita = models.AutoField(primary_key=True)
    fecha = models.DateField(auto_now_add=False, auto_now=False)
    hora = models.DateField(auto_now_add=False, auto_now=False)
    estado = models.CharField(max_length=10, default="LIBRE")
    id_veterinario = models.ForeignKey(Veterinario, on_delete=models.CASCADE)

    def __str__(self):
        return self.fecha

class CitaTomada(models.Model):

    id_cita_tomada = models.AutoField(primary_key=True)
    id_cita_disponible = models.ForeignKey(CitaDisponible, on_delete=models.CASCADE)
    motivo_consulta = models.CharField(max_length=1000)
    id_mascota = models.ForeignKey(Mascota, on_delete=models.CASCADE)



class CitaConcluida(models.Model):
    id_cita = models.ForeignKey(CitaTomada, primary_key=True, on_delete=models.CASCADE)
    # id_cita = models.OneToOneField(CitaMedica, on_delete=models.CASCADE)
    tratamiento = models.CharField(max_length=600)
    comentario = models.CharField(max_length=1000)
    valoracion = models.IntegerField()

    def __str__(self):
        return self.id_cita



