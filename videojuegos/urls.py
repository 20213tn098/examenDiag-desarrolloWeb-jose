from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VideojuegoViewSet

router = DefaultRouter()
router.register(r'', VideojuegoViewSet)

urlpatterns = [
    path('videojuegos/', include(router.urls)),
]