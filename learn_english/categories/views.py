# Create your views here.
from django.http import HttpResponse
from django.template import loader
from .models import Category, Vocabulary

def index(request):
    category_list = Category.objects.all();
    template = loader.get_template('categories/index.html')
    context = {
        'category_list' : category_list,
    }
    return HttpResponse(template.render(context, request))

def detail(request, category_id):
    template = loader.get_template('categories/detail.html')
    selected_category_obj = Category.objects.get(id = category_id)
    deck = Vocabulary.objects.filter(category=selected_category_obj)
    context = {
        'deck' : deck,
    }
    return HttpResponse(template.render(context, request))
