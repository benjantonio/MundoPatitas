from django.http import HttpResponse
from django.shortcuts import render, redirect
from .models import  *
from .forms import RegistroUsuario

def home(request):
    return render(request, 'home.html', {})

def registro(request):
    comunaV = Comuna.objects.filter(id_region=3)
    comunaM =  Comuna.objects.filter(id_region=2)
    perfil = Perfil.objects.exclude(descripcion="Generico")
    
    
    if request.method == 'POST':
        usuario_form =  RegistroUsuario(request.POST)
        if usuario_form.is_valid():
            usuario_form.save()
            return redirect('login')
    else:
        usuario_form = RegistroUsuario()
    return render(request, 'registration/registro.html', {'usuario_form': usuario_form, 'comunaV': comunaV, 'comunaM':comunaM, 'perfil': perfil})
    


def panelcli(request):
    mascotas = Mascota.objects.filter(id_cliente_id = request.user.id_usuario)

    return render(request,'panelcli.html', {'mascotas': mascotas})

def panelcenvet(request):
    return render(request,'centro.html', {})

def panelvet(request):
    return render(request, 'veterinario.html', {})


#### PANEL VETERINARIO ####
def plantillaPanelVeterinario(request):
    mascotas = Mascota.objects.filter(id_cliente_id = request.user.id_usuario)
    return render(request, 'panelVeterinario/plantillaPanelVet.html', {'mascotas': mascotas})

def moduloCrearCita(request):
    return render(request,'panelVeterinario/crear.html',{})


#### FIN PANEL VETERINARIO ####