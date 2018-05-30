from django.urls import path
from . import views

app_name = 'categories'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:category_id>/', views.detail, name='detail'),
    path('<int:category_id>/cards', views.cards, name='cards'),
]
