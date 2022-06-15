from re import A
from django.http import HttpResponse
from django.contrib import messages
from django.shortcuts import render, redirect
from .models import  *
from .forms import RegistroUsuario, EditarUsuario
import time

def home(request):
    return render(request, 'home.html', {})

def registro(request):
    comunaV = Comuna.objects.filter(id_region=2)
    comunaM =  Comuna.objects.filter(id_region=1)
    
    
    if request.method == 'POST':
        usuario_form =  RegistroUsuario(request.POST)
        if usuario_form.is_valid():
            usuario_form.save()
            # messages.add_message(request, messages.SUCCESS, 'Usuario registrado con exito.')
            return redirect('login')
        else:
            messages.add_message(request, messages.ERROR, 'Usuario y/o Correo ya existentes. Cambie sus datos y vuelva a intentralo')
    else:
        
        usuario_form = RegistroUsuario()
    return render(request, 'registration/registro.html', {'usuario_form': usuario_form, 'comunaV': comunaV, 'comunaM':comunaM})
    
def editarUsuario(request, id):
    usuario = Usuario.objects.get(id_usuario = id)
    if request.method == 'GET':
        edit_form_usuario = EditarUsuario( instance=usuario)
    else:
        edit_form_usuario = EditarUsuario(request.POST, instance=usuario)
        if edit_form_usuario.is_valid():
            edit_form_usuario.save()
            messages.add_message(request, messages.SUCCESS, 'Usuario actualizado con exito. Vuelva a iniciar sesión')
            return redirect('login')
        else:
            messages.add_message(request, messages.ERROR, 'Ha ocurrido un error. Vuelva a intentarlo')
    return render(request, 'editarUsu.html', {'form': edit_form_usuario})

def foro(request):

    try:
        usuarioOnline = Usuario.objects.filter(id_usuario = request.user.id_usuario)
    except:
        usuarioOnline = 0

    try:
        publicacionesOnline = PublicacionForo.objects.filter(id_cliente_id = request.user.id_usuario).order_by('fecha','hora')
    except:
        publicacionesOnline = 0

    
    publicacionesAll = PublicacionForo.objects.filter().order_by('fecha','hora')
    respuestasAll = RespuestaForo.objects.filter().order_by('fecha','hora')
    
    return render(request,'foro.html',{'usuarioOnline': usuarioOnline,'publicacionesAll': publicacionesAll,'respuestasAll': respuestasAll,'publicacionesOnline': publicacionesOnline})

def panelcli(request):
    mascotas = Mascota.objects.filter(id_cliente_id = request.user.id_usuario)
    historialConcluidas = CitaConcluida.objects.filter(id_cliente_id = request.user.id_usuario).order_by('-fecha','-hora')
    historialPendientes = CitaTomada.objects.filter().order_by('fecha','hora')
    publicacion = PublicacionAdopcion.objects.filter(id_cliente_id = request.user.id_usuario)
    return render(request,'panelcli.html', {'mascotas': mascotas, 'historialConcluidas': historialConcluidas, 'historialPendientes': historialPendientes,'publicacion':publicacion})

def panelcenvet(request):
    veterinarios = Veterinario.objects.filter(id_cliente_id = request.user.id_usuario)
    return render(request,'centro.html', {'veterinarios': veterinarios})

def vetSelect(request, id):
    veterinario = Veterinario.objects.filter(id_veterinario = id)
    print(veterinario)
    return render(request,'prueba_vet.html', {'vet': veterinario})

def veterinarios(request):
    veterinarios = Veterinario.objects.filter(id_cliente_id = request.user.id_usuario)

    return render(request,'veterinarios.html', {'veterinarios': veterinarios})

def adopciones(request):
    adopciones = PublicacionAdopcion.objects.exclude(id_cliente_id = request.user.id_usuario)

    return render(request,'adopciones.html', {'adopciones': adopciones})



def agendarHora(request):
    comunaV = Comuna.objects.filter(id_region=3)
    comunaM =  Comuna.objects.filter(id_region=2)
    centro = Usuario.objects.filter(perfil=3)
    mascotas = Mascota.objects.filter(id_cliente_id = request.user.id_usuario)
    
    return render(request,'agendarHora.html', {'comunaV': comunaV, 'comunaM':comunaM, 'centro':centro, 'mascotas':mascotas})

def panelvet(request):
    return render(request, 'veterinario.html', {})


#### PANEL VETERINARIO ####
def plantillaPanelVeterinario(request):
    
    return render(request, 'panelVeterinario/plantillaPanelVet.html',{})

def panelVeterinario(request, id):
    citasPendientes = CitaTomada.objects.filter(id_veterinario_id = id).order_by('fecha','hora') ## AQUÍ VA EL ID DEL VETERINARIO
    veterinario = Veterinario.objects.filter(id_veterinario = id) ## AQUÍ VA EL ID DEL VETERINARIO
    return render(request,'panelVeterinario/inicio.html',{'citasPendientes':citasPendientes,'veterinario':veterinario})

def moduloCrearCita(request, id):
    citasDisponibles = CitaDisponible.objects.filter(id_veterinario_id = id).order_by('fecha','hora') ## AQUÍ VA EL ID DEL VETERINARIO
    veterinario = Veterinario.objects.filter(id_veterinario = id) ## AQUÍ VA EL ID DEL VETERINARIO
    return render(request,'panelVeterinario/crear.html',{'citasDisponibles':citasDisponibles,'veterinario':veterinario})

def moduloPendientesCita(request, id):
    citasPendientes = CitaTomada.objects.filter(id_veterinario_id = id).order_by('fecha', 'hora') ## AQUÍ VA EL ID DEL VETERINARIO
    veterinario = Veterinario.objects.filter(id_veterinario = id) ## AQUÍ VA EL ID DEL VETERINARIO
    return render(request,'panelVeterinario/pendientes.html',{'citasPendientes':citasPendientes,'veterinario':veterinario})

def moduluoEstadisticas(request, id):
    veterinario = Veterinario.objects.filter(id_veterinario = id) ## AQUÍ VA EL ID DEL VETERINARIO
    return render(request,'panelVeterinario/estadisticas.html',{'veterinario':veterinario})



#### FIN PANEL VETERINARIO ####
