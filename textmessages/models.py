from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.CharField(max_length=500)
    is_sent = models.BooleanField(default=False)

    def __str__(self):
        return self.message
