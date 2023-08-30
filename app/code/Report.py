import traceback
from django.shortcuts import render
from django.contrib.auth.decorators import login_required, permission_required
from user_agents import parse
from django.contrib.auth.models import User, Group, Permission
from app.models import UserLog,Case,Files
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required, permission_required
from django.http import JsonResponse
from app.views import error_500


# Create your views here.
@login_required(login_url='login')
@permission_required('app.view_case', raise_exception=False, login_url='login')
def case_report(request):
    device_info = hanldeLog(request)
    try:
        all_cases = Case.objects.all().order_by('flag')
        # user_cases = Case.objects.filter(person=request.user).all()
        content = {
              'all_cases': all_cases
        }
        msg = f"You Visited All Case Report Page"
        UserLog(user=request.user,device=device_info,message=msg,type='info').save()
        return render(request, "Report/case_reports.html",content)
        # return render(request, "Sections/sections.html",content)   
    except Exception as e:
                info = traceback.format_exc()   
                UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
                return redirect(error_500)




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
 