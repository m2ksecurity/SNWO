from django.db import models
from django.contrib.auth.models import AbstractUser, User

# Create your models here.

class Person(models.Model):
    user_code = models.CharField(max_length=10)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='person',)
    


class Case(models.Model):
    district = models.CharField(max_length=30)
    unit = models.CharField(max_length=30)
    sub_unit = models.CharField(max_length=30)
    case = models.CharField(max_length=25,null=True) # Nooca Caseka
    type = models.CharField(max_length=25,null=True)
    status = models.CharField(max_length=10,null=True) # casaan Jaale Cagaar
    description = models.TextField(null=False)
    info = models.CharField(max_length=50,null=True) # 0 means hubka Degmada and 1 means Deriska
    flag = models.IntegerField(default=0) # 0 means new case and 1 means readed case
    form = models.IntegerField(null=True) # 0 means form data and 1 means forn terorist
    created_at = models.DateTimeField(auto_now_add=True)
    person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='cases',null=True)

    # modified_user = models.ForeignKey(User, on_delete=models.CASCADE, )
class Files(models.Model):
    file = models.FileField(upload_to='uploads/')
    case = models.ForeignKey(Case, on_delete=models.CASCADE, related_name='files', null=True)

class UserLog(models.Model):
    user = models.TextField()
    device = models.TextField(null=True)
    message = models.TextField()
    info = models.TextField(null=True)
    type = models.CharField(max_length=25,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
