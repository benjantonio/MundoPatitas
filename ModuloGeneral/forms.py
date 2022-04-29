from cProfile import label
from django import forms
from .models import UsuarioPerfil
from django.contrib.auth.forms import UserCreationForm

class RegistroUsuario(forms.ModelForm):
    class Meta:
        model = UsuarioPerfil
        fields = [
            'username',
            'password',
            'first_name',
            'email',
            'celular',
            'edad',
            'direccion',
            'comuna',
            'perfil'
        ]
        