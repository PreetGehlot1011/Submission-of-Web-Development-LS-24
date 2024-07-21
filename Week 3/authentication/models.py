from django.db import models
from django.contrib.auth.models import User

class user(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    username = models.CharField(max_length=30)
    email = models.EmailField()
    password = models.CharField(max_length=30)