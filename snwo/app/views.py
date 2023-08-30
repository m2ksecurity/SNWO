import traceback
from django.shortcuts import render
from django.contrib.auth.decorators import login_required, permission_required
from user_agents import parse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User, Group, Permission
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.contenttypes.models import ContentType
from app.models import UserLog,Case,Person
from django.http import HttpResponseRedirect

# Create your views here.
@login_required(login_url='login')
def index(request):
    device_info = hanldeLog(request)
    try:
        success__query = "Successfully added"
        user_logs = UserLog.objects.filter(type='info',message__icontains=success__query).all().order_by('-created_at')[:5][::1]
        users = User.objects.all()
        terorist_case = Case.objects.filter(form=1).all()
        normal = Case.objects.filter(form=0).all()

        person_terorist = Case.objects.filter(person__user=request.user,form=1).count()
        person_cases = Case.objects.filter(person__user=request.user,form=0).count()

        new_case =Case.objects.filter(flag=0).all()

        content = {
             'user_logs':user_logs,
             'total_users':User.objects.count(),
             'totalTerorist':terorist_case.count(),
             'totalCases':normal.count(),
             'user_terorist':person_terorist,
             'user_case':person_cases,
             'new_case':new_case.count(),
        }
        try:
            return render(request,"Pages/main.html",content)
        except Exception as e:
                info = traceback.format_exc()   
                UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
                return redirect(error_404)
    except Exception as e:
                info = traceback.format_exc()   
                UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
                return redirect(error_500)


def error_500(request):
    return render(request, "Pages/error-500.html" )

def error_404(request):
    return render(request, "Pages/error-404.html" )



def hanldeLog(request):
    user_agent_string = request.META.get('HTTP_USER_AGENT')
    ip_address = request.META.get('REMOTE_ADDR')
    user_agent = parse(user_agent_string)
    try:
        device_info = f"{ip_address} / {user_agent}"
        return device_info
    except Exception as e:
        device_info = f"{ip_address} / {user_agent}"
        info = traceback.format_exc()  
        UserLog.objects.create(user="AnonymousUser",device=device_info, message=str(e), info=info, type="error")
        return redirect(error_500)
 