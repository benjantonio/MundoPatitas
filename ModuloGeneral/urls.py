from django.urls import path
from .views import ejemploHtml, ejemplo

urlpatterns = [
    path('', ejemploHtml),
    path('ejemplo/', ejemplo),
    
]