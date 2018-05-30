# Create your views here.
from django.shortcuts import render
from .models import Category, Vocabulary
from card.models import Card
import json
from django.core import serializers
from django.http import JsonResponse

def index(request):
    category_list = Category.objects.all();
    context = {
        'category_list' : category_list,
    }
    return render(request, 'categories/index.html',context)

def detail(request, category_id):
    selected_category_obj = Category.objects.get(id = category_id)
    vocabularies = Vocabulary.objects.filter(category=selected_category_obj)

    meaning_dict = {}
    card_dict = {}
    for vocab in vocabularies:
        meaning_dict[vocab.name] = vocab.meaning
        card = Card.objects.filter(front_side=vocab.name)
        card_data = serializers.serialize("json", card)
        card_dict[vocab.name] = card_data

    context = {
        'meaning_dict' : json.dumps(meaning_dict),
        'card_dict' : card_dict,
    }
    return render(request, 'categories/detail.html', context)

def update_isLearnedCard(request):
    front_side = request.GET.get('front_side', None)
    isLearned = request.GET.get('isLearned', None)

    card = Card.objects.get(front_side = front_side)
    card.isLearned = (isLearned == 'true')
    card.save(update_fields = ["isLearned"])

    data = {
        'name': card.front_side,
        'val': card.isLearned,
    }
    return JsonResponse(data)