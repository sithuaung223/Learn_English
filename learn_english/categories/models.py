from django.contrib.postgres.fields import ArrayField
from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=50)
    vocabularies = ArrayField(models.CharField(max_length=50, blank=False))
    
    def __str__(self):
        return self.name

class Vocabulary(models.Model):
    vocabulary = models.CharField(max_length=50, blank=False)
    meaning = models.CharField(max_length=200, blank=False)

    def __str__(self):
        return self.vocabulary

# do i need sth to relate vocabulary with vocabulairies[]
