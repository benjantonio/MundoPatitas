from re import template
from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import RegistroUsuario

from .models import UsuarioPerfil

def home(request):
    return render(request, 'home.html', {})

def login(request):
    return render(request, 'login.html', {})

def registro(request):
    return render(request,'registro.html', {})

def registro_dos(request):
    if request.method == 'POST':
        usuario_form =  RegistroUsuario(request.POST)
        if usuario_form.is_valid():
            usuario_form.save()
            return redirect('home')
    else:
        usuario_form = RegistroUsuario()
    return render(request, 'registro-prueba.html', {'usuario_form': usuario_form})
    
    