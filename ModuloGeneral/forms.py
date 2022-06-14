
from turtle import width
from django import forms
from pkg_resources import require
from .models import *

class RegistroUsuario(forms.ModelForm):

    password = forms.CharField(label='Contraseña', widget=forms.PasswordInput(
        attrs={
            'class':'form-control',
            'id': 'password',
            'required': 'required'
        }
    ))
    class Meta:
        model = Usuario
        fields = [
            'username',
            'email',
            'nombres',
            'apellidos',
            'edad',
            'celular',
            'direccion',
            'comuna',
            'perfil'
        ]
        widgets = {
            'username': forms.TextInput(
                attrs= {
                    'class': 'form-control'
                }
            ),
            'email': forms.EmailInput(
                attrs= {
                    'class': 'form-control'
                }
            ),
            'nombres': forms.TextInput(
                attrs= {
                    'class': 'form-control'
                }
            ),
            'apellidos': forms.TextInput(
                attrs= {
                    'class': 'form-control'
                }
            ),
            'edad': forms.NumberInput(
                attrs= {
                    'class': 'form-control'
                }
            ),
            'celular': forms.NumberInput(
                attrs= {
                    'class': 'form-control'
                }
            ),
            'direccion': forms.TextInput(
                attrs= {
                    'class': 'form-control'
                }
            ),
            'comuna': forms.Select(
                attrs= {
                    'class': 'form-control'
                }
            ),
            'perfil': forms.Select(
                attrs= {
                    'class': 'form-control'
                }
            )
        }
        
    def save(self, commit = True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user

class EditarUsuario(forms.ModelForm):
    password = forms.CharField(label='Contraseña actual o Nueva contraseña', widget=forms.PasswordInput(
        attrs={
            'class':'form-control col-xs-12 col-lg-6',
            'id': 'password',
            'required': 'required'
        }
    ))
    class Meta:
        model = Usuario
        fields = [
            'username',
            'email',
            'nombres',
            'apellidos',
            'edad',
            'celular',
            'direccion',
            'comuna',
            'perfil'
        ]
        widgets = {
            'username': forms.TextInput(
                attrs= {
                    'class': 'form-control col-xs-12 col-lg-6',
                    'required': 'required'
                }
            ),
            'email': forms.EmailInput(
                attrs= {
                    'class': 'form-control col-xs-12 col-lg-6',
                    'required': 'required'
                }
            ),
            'nombres': forms.TextInput(
                attrs= {
                    'class': 'form-control col-xs-12 col-lg-6',
                    'required': 'required'
                }
            ),
            'apellidos': forms.TextInput(
                attrs= {
                    'class': 'form-control col-xs-12 col-md-6',
                    'required': 'required'
                }
            ),
            'edad': forms.NumberInput(
                attrs= {
                    'class': 'form-control col-xs-12 col-md-6',
                    'required': 'required'
                }
            ),
            'celular': forms.NumberInput(
                attrs= {
                    'class': 'form-control col-xs-12 col-md-6',
                    'required': 'required'
                }
            ),
            'direccion': forms.TextInput(
                attrs= {
                    'class': 'form-control col-xs-12 col-md-6',
                    'required': 'required'
                }
            ),
            'comuna': forms.Select(
                attrs= {
                    'class': 'form-control col-xs-12 col-md-6',
                    'required': 'required'
                }
            ),
            'perfil': forms.Select(
                attrs= {
                    'class': 'form-control col-xs-12 col-md-6',
                    'required': 'required'
                }
            )
        }
        
    def save(self, commit = True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user
        
