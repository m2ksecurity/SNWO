import traceback
from django.shortcuts import render
from django.contrib.auth.decorators import login_required, permission_required
from user_agents import parse
from app.models import UserLog
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User, Group, Permission
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.contenttypes.models import ContentType
from app.views import index,error_500


# Create your views here.


@login_required(login_url='login')
@permission_required('auth.view_permission', raise_exception=False,login_url='login')
def assign_user_permissions(request):

    device_info = hanldeLog(request)
    try: 

        content_types = ContentType.objects.all()
        context = {
            "content_types":content_types
        }
        msg = f"You Visted List Of User Assign user to permissions"
        UserLog(user=request.user,device=device_info,message=msg,type='info').save()
        return render (request, "accounts/user_permissions.html", context)
    
    except Exception as e:
        info = traceback.format_exc()             
        UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
        return redirect(error_500)

@login_required(login_url='login')
@permission_required('auth.view_permission', raise_exception=False,login_url='login')
def permissions(request):

    device_info = hanldeLog(request)
    try: 
        if request.method == 'POST':
            content_type = request.POST.get('content_type')
            code_name = request.POST.get('code_name')
            name = request.POST.get('name')
            content_id = ContentType.objects.get(id=content_type)
            try:
                addPermission = Permission(name=name, content_type=content_id,codename=code_name)
                addPermission.save()
                msg = f"You Has Been Successfully Created Permission {name} to {code_name}"
                UserLog(user=request.user,device=device_info,message=msg,type='info').save()
            except Exception as e:
                info = traceback.format_exc()   
                UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
                return redirect(error_500)
        content_types = ContentType.objects.all()
        permission = Permission.objects.all()
        context = {
            "permissions":permission,
            "content_types":content_types
        }
        msg = f"You Visted List Of User Permissions"
        UserLog(user=request.user,device=device_info,message=msg,type='info').save()
        return render (request, "accounts/permissions.html", context)
    
    except Exception as e:
        info = traceback.format_exc()             
        UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
        return redirect(error_500)


@login_required(login_url='login')
@csrf_exempt
@permission_required('auth.view_user', raise_exception=False, login_url='login')
def get_user_info(request):
    device_info = hanldeLog(request)
    try: 
        search_value = request.POST.get('search_value')
        users = User.objects.filter(username__icontains=search_value)# Only retrieve the first matching user
        user_list = []
        for user in users:
            user_list.append({
                'name': user.username,
                'email': user.email,
                'user_id':user.id
            })

        return JsonResponse(user_list, safe=False)
    
    except Exception as e:
        info = traceback.format_exc()             
        UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
        return redirect(error_500)


@login_required(login_url='login')
@permission_required('auth.change_user', raise_exception=False, login_url='login')
def get_permissions_user(request):
    try:
        device_info = hanldeLog(request)
        content_type_id = request.GET.get('content_type_id')
        content_type = ContentType.objects.get(id=content_type_id)
        permissions = Permission.objects.filter(content_type=content_type)
        # permissions_list = [{'id': p.id, 'name': p.name} for p in permissions ]
        # return JsonResponse(permissions_list, safe=False)
        context = {
            "permissions":permissions
        }
        msg = f"You Displayed User Permissions Table"
        UserLog(user=request.user,device=device_info,message=msg,type='info').save()
        return render(request, 'accounts/user_permissions_table.html', context)
    
    except Exception as e:
        info = traceback.format_exc()   
        UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
        return redirect(error_500)    


@login_required(login_url='login')
@permission_required('auth.add_user', raise_exception=False,login_url='login')
# get user permissions according to selected user and content type.
def get_user_permissions(request):
    device_info = hanldeLog(request)
    try:
        user_id = request.GET.get('user_id')
        print(user_id)
        content_type_id =  request.GET.get('content_type_id')
        user = User.objects.get(username=user_id)
        content_type = ContentType.objects.get(id=content_type_id)
        user_permissions = user.user_permissions.all()
        permissions_list = [p.id for p in user_permissions ]
        print(permissions_list)
        return JsonResponse({'permissions': permissions_list})
    
    except Exception as e:
        info = traceback.format_exc()   
        UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
        return redirect(error_500)


# assigns permission to user
@permission_required('auth.add_user', raise_exception=False, login_url='login')
def assign_permissions_to_user(request):
    device_info = hanldeLog(request)
    try:
        if request.method == 'POST':
            permission_id = request.POST.get('permission_id')
            user_id = request.POST.get('user_id')
            is_checked = request.POST.get('is_checked')

            user = User.objects.get(username=user_id)
            permission = Permission.objects.get(id=permission_id)
            if is_checked == "true":
                user.user_permissions.add(permission)
                
            else:
                user.user_permissions.remove(permission)
            UserLog.objects.create(
                user=request.user,
                device=device_info,
                message=f"{request.user}  give permission {permission.name}  to user {user.username}",
                type='info'
            )
            return JsonResponse({'status': 'success'})
        
        else:
            return JsonResponse({'status': 'error'})
    
    except Exception as e:
        info = traceback.format_exc()   
        UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
        return redirect(error_500)

@login_required(login_url='login')
@permission_required('auth.change_permission', raise_exception=False, login_url='login')
def edit_permission(request):
   device_info = hanldeLog(request)
   try:
        if request.method == 'POST':
            id = request.POST.get('id')
            content = request.POST.get('content_type')
            codename = request.POST.get('codename')
            name = request.POST.get('name')
            content_id = ContentType.objects.get(id=content)
            updatePermission = Permission.objects.get(id=id)
            updatePermission.content_type = content_id
            updatePermission.codename = codename
            updatePermission.name = name
            updatePermission.save()
            if updatePermission:
                info = f'{updatePermission.codename} has been Successfuly Update'
                msg = f"You has been Successfuly Update {updatePermission.codename} to the system"
                UserLog.objects.create(
                user=request.user,
                device=device_info,
                message=msg,
                type='info'
            )
                return JsonResponse({'success': True, 'message': info})
            else:
                msg = f"You has Not Successfuly Update {updatePermission.name} to the system"
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
@permission_required('auth.delete_permission', raise_exception=False, login_url='login')
def delete_permission(request):
    device_info = hanldeLog(request)
    try:
        if request.method == 'POST':
            id = request.POST.get('id')
            deletePerrmission = Permission.objects.get(id=id)
            deletePerrmission.delete()
            if deletePerrmission:
                info = f'{deletePerrmission.codename} has been Successfuly Deleted'
                msg = f"You has been Successfuly Deleted {deletePerrmission.codename} to the system"
                UserLog.objects.create(
                user=request.user,
                device=device_info,
                message=msg,
                type='info'
            )
                
                return JsonResponse({'success': True, 'message': info})
            else:
                msg = f"You has Not Successfuly Deleted {deletePerrmission.codename} to the system"
                info = traceback.format_exc()   
                UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
                return JsonResponse({'success': False, 'message': 'Not Successfully Deleted'})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid request method'})

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
 