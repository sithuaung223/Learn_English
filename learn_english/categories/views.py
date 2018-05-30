# Create your views here.
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.core import serializers

from .models import Category, Vocabulary
from card.models import Card
import json


def index(request):
    category_list = Category.objects.all();
    context = {
        'category_list' : category_list,
    }
    return render(request, 'categories/index.html',context)


def detail(request, category_id):
    selected_category_obj = get_object_or_404(Category, pk=category_id) 
    vocabularies = Vocabulary.objects.filter(category=selected_category_obj)

    card_list = list()
    for vocab in vocabularies:
        card = Card.objects.get(front_side= vocab.name)
        card_list.append(card)

    return HttpResponseRedirect(reverse('categories:cards', args=(category_id, )))


def cards(request, category_id):
    context = {}

    return render(request, 'categories/detail.html', context)
