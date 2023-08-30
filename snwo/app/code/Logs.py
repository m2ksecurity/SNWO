from django.shortcuts import render
from app.models import UserLog
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, permission_required

# Create your views here.
@login_required(login_url='login')
@permission_required('app.view_userlog',raise_exception=False,login_url='login')
def audit_logs(request):
    logs_users = UserLog.objects.filter(type='info').all().order_by('-created_at')
    content = {
        'user_logs': logs_users
    }
    return render(request, "Logs/auditLogs.html",content )

@login_required(login_url='login')
@permission_required('app.view_userlog',raise_exception=False,login_url='login')
def error_logs(request):
    logs_error = UserLog.objects.filter(type='error').all().order_by('-created_at')
    content = {
        'eroor_logs': logs_error
    }
    return render(request, "Logs/errorlogs.html",content )