from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import RegistroUsuario

def home(request):
    return render(request, 'home.html', {})

def registro(request):
    if request.method == 'POST':
        usuario_form =  RegistroUsuario(request.POST)
        if usuario_form.is_valid():
            usuario_form.save()
            return redirect('home')
    else:
        usuario_form = RegistroUsuario()
    return render(request, 'registration/registro.html', {'usuario_form': usuario_form})
    
    