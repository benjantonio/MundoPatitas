from django.http import HttpResponse
from django.shortcuts import render


def home(request):
    return render(request, 'home.html', {})

def login(request):
    return render(request, 'login.html', {})

def registro(request):
    return render(request,'registro.html', {})

def panelcli(request):
    return render(request,'panelcli.html', {})