from django.contrib.postgres.fields import ArrayField
from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Vocabulary(models.Model):
    name = models.CharField(max_length=50, blank=False)
    meaning = models.CharField(max_length=200, blank=False)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name',)
