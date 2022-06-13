from re import A
from django.http import HttpResponse
from django.shortcuts import render, redirect
from .models import  *
from .forms import RegistroUsuario
import time

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


def foro(request):

    try:
        usuarioOnline = Usuario.objects.filter(id_usuario = request.user.id_usuario)
    except:
        usuarioOnline = 0

    
    publicacionesAll = PublicacionForo.objects.filter().order_by('fecha','hora')
    respuestasAll = RespuestaForo.objects.filter().order_by('fecha','hora')
    
    return render(request,'foro.html',{'usuarioOnline': usuarioOnline,'publicacionesAll': publicacionesAll,'respuestasAll': respuestasAll})

def panelcli(request):
    mascotas = Mascota.objects.filter(id_cliente_id = request.user.id_usuario)
    return render(request,'panelcli.html', {'mascotas': mascotas})

def panelcenvet(request):
    return render(request,'centro.html', {})

def panelvet(request):
    return render(request, 'veterinario.html', {})


#### PANEL VETERINARIO ####
def plantillaPanelVeterinario(request):
    
    return render(request, 'panelVeterinario/plantillaPanelVet.html',{})

def panelVeterinario(request):
    citasPendientes = CitaTomada.objects.filter(id_veterinario_id = 1).order_by('fecha','hora') ## AQUÍ VA EL ID DEL VETERINARIO
    veterinario = Veterinario.objects.filter(id_veterinario = 1) ## AQUÍ VA EL ID DEL VETERINARIO
    return render(request,'panelVeterinario/inicio.html',{'citasPendientes':citasPendientes,'veterinario':veterinario})

def moduloCrearCita(request):
    citasDisponibles = CitaDisponible.objects.filter(id_veterinario_id = 1).order_by('fecha','hora') ## AQUÍ VA EL ID DEL VETERINARIO
    veterinario = Veterinario.objects.filter(id_veterinario = 1) ## AQUÍ VA EL ID DEL VETERINARIO
    return render(request,'panelVeterinario/crear.html',{'citasDisponibles':citasDisponibles,'veterinario':veterinario})

def moduloPendientesCita(request):
    citasPendientes = CitaTomada.objects.filter(id_veterinario_id = 1).order_by('fecha', 'hora') ## AQUÍ VA EL ID DEL VETERINARIO
    veterinario = Veterinario.objects.filter(id_veterinario = 1) ## AQUÍ VA EL ID DEL VETERINARIO
    return render(request,'panelVeterinario/pendientes.html',{'citasPendientes':citasPendientes,'veterinario':veterinario})

def moduluoEstadisticas(request):
    veterinario = Veterinario.objects.filter(id_veterinario = 1) ## AQUÍ VA EL ID DEL VETERINARIO
    return render(request,'panelVeterinario/estadisticas.html',{'veterinario':veterinario})



#### FIN PANEL VETERINARIO ####