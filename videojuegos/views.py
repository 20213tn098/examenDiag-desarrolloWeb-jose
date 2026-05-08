from django.shortcuts import render
from rest_framework import viewsets
from .models import Videojuego
from .serializer import VideojuegoSerializer
# Create your views here.

class VideojuegoViewSet(viewsets.ModelViewSet):
    queryset = Videojuego.objects.all()
    serializer_class = VideojuegoSerializer