"""MundoPatitas URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path

from .views import *

from django.contrib.auth.decorators import login_required

urlpatterns = [
    path('', home, name='home'),
    # path('login', login, name='login'),
    path('registro/', registro, name='registro'),
    path('panel-cliente/', login_required(panelcli), name='panelcli'),
    path('panel-centro-vet/', login_required(panelcenvet), name='panelcentro'),
    path('agendarHora/', login_required(agendarHora), name='agendarHora'),
    path('panel-veterinario/<id>', login_required(panelVeterinario), name='panelVeterinario'),
    path('panel-veterinario/plantillaPanelVet/', login_required(plantillaPanelVeterinario), name='plantillaPanelVet'),
    path('panel-veterinario/crear/<id>', login_required(moduloCrearCita), name='crear'),
    path('panel-veterinario/pendientes/<id>', login_required(moduloPendientesCita), name='pendientes'),
    path('panel-veterinario/estadisticas/<id>', login_required(moduluoEstadisticas), name='estadisticas'),
    path('foro/', foro, name='foro'),

    path('veterinarios', login_required(veterinarios), name='veterinarios'),
    path('prueba_vet/<id>', vetSelect, name='vetSelect'),
    path('adopciones', adopciones, name='adopciones'),
    path('editar-usuario/<id>', login_required(editarUsuario), name='editar-usuario'),
]
