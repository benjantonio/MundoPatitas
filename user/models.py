from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UsuarioManager(BaseUserManager):
    def cretae_user(self,email,username, nombres, apellidos, password=None ):
        if not email:
            raise ValueError('El usuario debe tener un email')

        usuario = self.model(username=username, 
                             email = self.normalize_email(email), 
                             nombres = nombres, 
                             apellidos = apellidos)
        
        usuario.set_password(password)
        usuario.save()
        return usuario

    def create_superuser(self,email,username, nombres, apellidos, password ):
        usuario = self.cretae_user(
                             email, 
                             username=username, 
                             nombres = nombres, 
                             apellidos = apellidos,
                             password= password
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
    comuna = models.CharField(max_length=250, blank=True, null=True)
    perfil = models.CharField(max_length=50, blank=True, null=True)
    usuario_activo = models.BooleanField(default=True)
    usuario_administrador = models.BooleanField(default=False)
    objects = UsuarioManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'nombres', 'apellidos']

    def __str__(self):
        return f'{self.nombres},{self.apellidos}'

    def has_perm(self,perm,obj=None):
        return True
    
    def has_module_perms(self,app_label):
        return True

    @property
    def is_staff(self):
        return self.usuario_administrador
