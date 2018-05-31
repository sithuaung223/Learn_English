from django.urls import path
from . import views

app_name = 'categories'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:category_id>', views.detail, name='detail'),
    path('<int:category_id>/reminder', views.reminder, name='reminder'),
    path('ajax/update_isLearnedCard', views.update_isLearnedCard, name='update_isLearnedCard'),
    path('ajax/update_rememberedCard', views.update_rememberedCard, name='update_rememberedCard'),
]
