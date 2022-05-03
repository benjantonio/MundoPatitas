from django import forms
from user.models import Usuario

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
        
    def save(self, commit = True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user