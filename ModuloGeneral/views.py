from django.http import HttpResponse
from django.shortcuts import render

def ejemplo(request):
    return HttpResponse("vista de ejemplo")

def ejemploHtml(request):
    return render(request, 'ejemplo.html', {})