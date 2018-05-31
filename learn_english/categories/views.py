# Create your views here.
from django.shortcuts import render
from .models import Category, Vocabulary
from card.models import Card
import json
from django.core import serializers
from django.http import JsonResponse
from django.utils import timezone
import datetime
import math

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


def reminder(request, category_id):
    selected_category_obj = Category.objects.get(id = category_id)
    vocabularies = Vocabulary.objects.filter(category=selected_category_obj)

    meaning_dict = {}
    remind_card_dict = {}
    for vocab in vocabularies:
        card = Card.objects.get(front_side=vocab.name)
        today = timezone.localtime(timezone.now()).date()
        # reminderDate = card.dateIsLearned + datetime.timedelta(days=card.remindingDayCount)
        # TODO: testing, NEED to change back to above line for real prototype
        reminderDate = card.dateIsLearned + datetime.timedelta(days=0)
        if (card.isLearned and (reminderDate <= today)):
            meaning_dict[vocab.name] = vocab.meaning
            reminder_card_data = serializers.serialize("json", [card])
            remind_card_dict[vocab.name] = reminder_card_data

    context = {
        'meaning_dict': meaning_dict,
        'remind_card_dict': remind_card_dict,
        'category_id': category_id,
    }
    return render(request, 'categories/reminder.html',context)


def update_isLearnedCard(request):
    front_side = request.GET.get('front_side', None)
    isLearned = request.GET.get('isLearned', None)

    card = Card.objects.get(front_side = front_side)
    card.isLearned = (isLearned == 'true')

    # change datetime to local timezone
    local_time = timezone.localtime(timezone.now())
    local_date = local_time.date()
    card.dateIsLearned = local_date
    card.remindingDayCount = 1

    card.save(update_fields = ["isLearned", "dateIsLearned", "remindingDayCount"])

    data = {
        'name': card.front_side,
        'val': card.isLearned,
        'dateIsLearned': card.dateIsLearned,
    }
    return JsonResponse(data)


def update_rememberedCard(request):
    front_side = request.GET.get('front_side', None)
    isRemembered = request.GET.get('isRemembered', None)

    card = Card.objects.get(front_side = front_side)
    if (isRemembered == 'true'):
        card.remindingDayCount *= 2
    else:
        card.remindingDayCount *= 1/2

    card.remindingDayCount = math.ceil(card.remindingDayCount)
    card.save(update_fields = ["remindingDayCount"])

    data = {
        'name': card.front_side,
        'dateIsLearned': card.dateIsLearned,
        'remindingDayCount': card.remindingDayCount,
        'isRemembered': isRemembered,
    }
    return JsonResponse(data)

