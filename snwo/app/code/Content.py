from django.shortcuts import render, HttpResponse, redirect
import json,traceback
from user_agents import parse
from datetime import datetime
from django.http import JsonResponse
from app.models import UserLog
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User, Group, Permission
from django.contrib.contenttypes.models import ContentType
from app.views import error_500,error_404
from django.contrib.auth.decorators import login_required, permission_required


@login_required(login_url='login')
@permission_required('contenttypes.change_contenttype', raise_exception=False, login_url='login')
def update_content(request):
    device_info = hanldeLog(request)
    try:
        if request.method == 'POST':
            id = request.POST.get('id')
            app_label = request.POST.get('app_label')
            model = request.POST.get('model')
            updateContent = ContentType.objects.get(id=id)
            updateContent.app_label = app_label
            updateContent.model = model
            updateContent.save()
            if updateContent:
                info = f'{updateContent.app_label} has been Successfuly Update'
                msg = f"You has been Successfuly Update {updateContent.app_label} to the system"
                UserLog.objects.create(
                user=request.user,
                device=device_info,
                message=msg,
                type='info'
            )
                return JsonResponse({'success': True, 'message': info})
            else:
                msg = f"You has Not Successfuly Update {updateContent.name} to the system"
                info = traceback.format_exc()   
                UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
                return JsonResponse({'success': False, 'message': 'Not Successfully Update'})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid request method'})

    except Exception as e:
        info = traceback.format_exc()   
        UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
        return redirect(error_500)
    
@login_required(login_url='login')
@permission_required('contenttypes.delete_group', raise_exception=False, login_url='login')
def delete_content(request):
    device_info = hanldeLog(request)
    try:
        if request.method == 'POST':
            id = request.POST.get('id')
            deleteContent = ContentType.objects.get(id=id)
            deleteContent.delete()
            if deleteContent:
                info = f'{deleteContent.app_label} has been Successfuly Deleted'
                msg = f"You has been Successfuly Deleted {deleteContent.app_label} to the system"
                UserLog.objects.create(
                user=request.user,
                device=device_info,
                message=msg,
                type='info'
            )
                
                return JsonResponse({'success': True, 'message': info})
            else:
                msg = f"You has Not Successfuly Deleted {deleteContent.app_label} to the system"
                info = traceback.format_exc()   
                UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
                return JsonResponse({'success': False, 'message': 'Not Successfully Deleted'})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid request method'})

    except Exception as e:
        info = traceback.format_exc()   
        UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
        return redirect(error_500)

@login_required(login_url='login')
@permission_required('contenttypes.view_contenttype', raise_exception=False, login_url='login')
def content_type(request):
    device_info = hanldeLog(request)
    try:
        content = ContentType.objects.all()
        context = {
            "contents":content
        }
        msg = f"You Visted Content Type Page"
        UserLog(user=request.user,device=device_info,message=msg,type='info').save()

        return render(request,'accounts/content.html', context)
    except Exception as e:
                info = traceback.format_exc()   
                UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
                return redirect(error_500)


@login_required(login_url='login')
@permission_required('contenttypes.add_contenttype', raise_exception=False, login_url='login')           
def add_content(request):
    device_info = hanldeLog(request)
    try:
        if request.method == 'POST':
            app_label = request.POST.get('app_label')
            model = request.POST.get('model')

            addContent = ContentType(app_label=app_label,model=model)
            addContent.save()
            if addContent:
                msg = f"Successfully added {addContent.model} Content"
                UserLog(user=request.user,device=device_info,message=msg,type='info').save()
                return JsonResponse({'success': True,'message': msg})
            else:
                msg = f"Ops ! {addContent.model} Content Not Saved!"
                return JsonResponse({'success': False,'message': msg})
    except Exception as e:
                info = traceback.format_exc()   
                UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
                return redirect(error_500)


def get_content_value(request):
     id = request.GET.get('id')
     content_type = ContentType.objects.get(id=id)
     print(content_type)
     response = {
          'source':True,
          'id':content_type.id,
          'app_label':content_type.app_label,
          'model':content_type.model

     }
     return JsonResponse(response)





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
 