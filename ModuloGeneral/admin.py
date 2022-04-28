from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UsuarioPerfil

admin.site.register(UsuarioPerfil, UserAdmin)

# # Register your models here.
# admin.site.register(Region)
# admin.site.register(Comuna)
