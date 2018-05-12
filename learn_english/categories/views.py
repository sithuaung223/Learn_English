# Create your views here.
from django.http import HttpResponse
from django.template import loader
from .models import Category, Vocabulary
from card.models import Card
import json
from django.core import serializers

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
    return HttpResponse(template.render(context, request))
