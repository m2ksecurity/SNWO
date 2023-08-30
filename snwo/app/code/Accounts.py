import traceback
from django.shortcuts import render
from django.contrib.auth.decorators import login_required, permission_required
from user_agents import parse
from app.models import UserLog,Person
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
def login_user(request):
    
    try:
        device_info = hanldeLog(request)
        if request.user.is_authenticated:

            # messages.info(request, 'alredy login')
            return redirect(index)
        if request.method == 'POST':
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(username=username, password=password)
            
            if user is not None:
                login(request, user)
                msg = f"{request.user.first_name} {request.user.last_name} Logged System"
                # print(f'{request.user} - {device_info} - {msg}')
                UserLog(user=request.user,device=device_info,message=msg,type="info").save()
                return redirect(index)
            else:
                messages.info( request, 'User or Password are Incorrect.')
                msg = f"{request.POST['username']} Failed Logged System"
                UserLog(user=request.POST['username'],device=device_info,message=msg,type="info").save()
                return render(request,'accounts/login.html')
            
        return render(request, 'accounts/login.html')
    
    except Exception as e:
        device_info = hanldeLog(request)
        info = traceback.format_exc()   
        UserLog.objects.create(user="AnonymousUser",device=device_info, message=str(e), info=info, type="error")
        return redirect(error_500)
     

@login_required(login_url='login')
def logout_user(request):
    try: 
        device_info = hanldeLog(request)
        msg = f"{request.user.first_name} {request.user.last_name} Logged Out System"
        # print(f'{request.user} - {device_info} - {msg}')
        UserLog(user=request.user,device=device_info,message=msg,type='info').save()
        logout(request)
        return redirect('login')
    
    except Exception as e:
        device_info = hanldeLog(request)
        info = traceback.format_exc()   
        UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
        return redirect(error_500)
    

@login_required(login_url='login')
@permission_required('auth.add_user',raise_exception=False,login_url='login')
def users(request):
    device_info = hanldeLog(request)
    try: 
        if request.method == 'POST':
            first_name = request.POST['first_name']
            last_name = request.POST['last_name']
            email = request.POST['email']
            username = request.POST['user_name']
            password = "123"
            status = False
            role = request.POST['role']
            last_user_id = User.objects.order_by('-id').values('id').first()['id']
            gen_num = int(last_user_id)+1
            code = f'aar-00{gen_num}'
            if role == "superuser":
                try:

                    superuser = User.objects.create_superuser(
                    first_name=first_name, last_name=last_name,
                    username=username,password=password,
                    email=email, is_active=status
                )
                    if superuser:
                        person = Person(user_code=code,user=superuser)
                        person.save()
                        if person:
                            msg = f"You Has Been Successfully Created {first_name} {last_name}'s Account as {role}"
                            UserLog(user=request.user,device=device_info,message=msg,type='info').save()
                except Exception as e:
                    info = traceback.format_exc()   
                    UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
                    return redirect(error_500)

                # User.objects.create_superuser(username=username, password=password, email=username)
            else:
                try:
                    group = Group.objects.get(name=role)
                    user = User.objects.create_user(first_name=first_name, last_name=last_name, username=username,password=password,
                    email=email, is_active=status)
                    user.groups.add(group)
                    person = Person(user_code=code,user=user)
                    person.save()
                    msg = f"You Has Been Successfully Created {first_name} {last_name}'s Account as {role}"
                    UserLog(user=request.user,device=device_info,message=msg,type='info').save()
                    return redirect('users')
                except Exception as e:
                    info = traceback.format_exc()   
                    UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
                    return redirect(error_500)
        users = User.objects.all()
        roles = Group.objects.all()
        context = {
            "users":users,
            "roles":roles
        }
        msg = f"You Visted List Of User Accounts"
        UserLog(user=request.user,device=device_info,message=msg,type='info').save()

        return render(request,'accounts/users.html', context)
    
    except Exception as e:
        info = traceback.format_exc()   
        UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
        return redirect(error_500)


@login_required(login_url='login')
@permission_required('auth.change_user', raise_exception=False,login_url='login')
def updateAccount(request):
    device_info = hanldeLog(request)
    try:
        if request.method == 'POST':
            id = request.POST.get('id')
            first_name = request.POST.get('first_name')
            last_name = request.POST.get('last_name')
            email = request.POST.get('email')

            userUpdate = User.objects.get(id=id)

            userUpdate.first_name = first_name
            userUpdate.last_name = last_name
            userUpdate.email = email

            userUpdate.save()

            success = True
            if userUpdate:
                info = f'{userUpdate.first_name} {userUpdate.last_name} has been Successfuly Updated'
                msg = f"You has been Successfuly Updated {userUpdate.first_name} {userUpdate.last_name} to the system"
                UserLog.objects.create(
                user=request.user,
                device=device_info,
                message=msg,
                type='info'
            )

                return JsonResponse({'success': True, 'message': info})
            else:
                msg = f"You has Not Successfuly Updated {userUpdate.first_name} {userUpdate.last_name} to the system"
                UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
                return JsonResponse({'success': False, 'message':'Not Successfully Activted'})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid request method'})
    
    except Exception as e:
        info = traceback.format_exc()   
        UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
        return redirect(error_500)


@login_required(login_url='user_login')
@permission_required('auth.change_user', raise_exception=False,login_url='login')
def activeAccount(request):

    device_info = hanldeLog(request)
    try:
   
        if request.method == 'POST':
            id = request.POST.get('id')
            password = request.POST.get('password')
            status = True
            user = User.objects.get(id=id)
            user.is_active = status
            user.set_password(password)
            user.save()
            if user:
                info = f'{user.first_name} {user.last_name} has been Successfuly Activated'
                msg = f"You has been Successfuly Activated {user.first_name} {user.last_name} to the system"

                UserLog.objects.create(
                user=request.user,
                device=device_info,
                message=msg,
                type='info'
            )

                return JsonResponse({'success': True, 'message': info})
            else:
                msg = f"User has Not Successfuly Activated {user.first_name} {user.last_name} to the system"
                UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
                return JsonResponse({'success': False, 'message': msg})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid request method'})
    
    except Exception as e:
        info = traceback.format_exc()   
        UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
        return redirect(error_500)

@login_required(login_url='user_login')
@permission_required('auth.change_user', raise_exception=False,login_url='login')
def disableAccount(request):

    device_info = hanldeLog(request)
    try:
   
        if request.method == 'POST':
            id = request.POST.get('id')
            status = False

            user = User.objects.get(id=id)
            user.is_active = status
            user.save()
            if user:
                # print(first_name,last_name,email,user_name)
                info = f'{user.first_name} {user.last_name} has been Successfuly Disabled'
                msg = f"You has been Successfuly Disabled {user.first_name} {user.last_name} to the system"
                UserLog.objects.create(
                user=request.user,
                device=device_info,
                message=msg,
                type='info'
            )
                
                return JsonResponse({'success': True, 'message': info})
            else:
                msg = f"You has Not Successfuly Disabled {user.first_name} {user.last_name} to the system"
                info = traceback.format_exc()   
                UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
                return JsonResponse({'success': False, 'message': 'Not Successfully Disabled'})
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
 