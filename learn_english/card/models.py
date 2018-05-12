from django.db import models
from categories.models import Category, Vocabulary
from django.db.models.signals import post_save
from django.utils import timezone

# Create your models here.
class Card(models.Model):
    front_side = models.CharField(max_length=50, blank=False)
    flipped_side = models.CharField(max_length=200, blank=False)
    isLearned = models.BooleanField(default=False)
    dateIsLearned = models.DateTimeField(auto_now=False, auto_now_add=False, blank=False)
    remindingDayCount = models.IntegerField(default=1)

    def __str__(self):
        return "front_side: %s, flipped_side: %s" % (self.front_side, self.flipped_side)


def create_card(sender, instance, created, **kwargs):
	if instance and created:
		print("create card", "name: ", instance.name, "meaning: ", instance.meaning)
		Card.objects.create(front_side = instance.name, flipped_side= instance.meaning, dateIsLearned= timezone.now())

# signal call when Vocabulary instance model is created
post_save.connect(create_card, sender=Vocabulary)