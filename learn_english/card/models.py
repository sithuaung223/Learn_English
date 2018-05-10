from django.db import models

# Create your models here.
class Card(models.Model):
    front_side = models.CharField(max_length=50)
    flipped_side = models.CharField(max_length=200, blank=False) 
    isLearned = models.BooleanField(default=False)
    dateIsLearned = models.DateTimeField(auto_now=False, auto_now_add=False, blank=True)
    remindingDayCount = models.IntegerField(default=1)

    def __str__(self):
        return 'front_side: %s, flipped_side: %s' % (self.front_side, self.flipped_side)
