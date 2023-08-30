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
def cases_list(request):
    device_info = hanldeLog(request)
    try:
        all_cases = Case.objects.all().order_by('flag')
        # user_cases = Case.objects.filter(person=request.user).all()
        content = {
              'all_cases': all_cases
        }
        msg = f"You Visited All Case Page"
        UserLog(user=request.user,device=device_info,message=msg,type='info').save()
        return render(request, "Case/case_list.html",content)
        # return render(request, "Sections/sections.html",content)   
    except Exception as e:
                info = traceback.format_exc()   
                UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
                return redirect(error_500)

# Create your views here.
@login_required(login_url='login')
@permission_required('app.add_case', raise_exception=False, login_url='login')
def case_view(request):
    device_info = hanldeLog(request)
    try:
        msg = f"You Visited Add New Case Page"
        UserLog(user=request.user,device=device_info,message=msg,type='info').save()
        return render(request, "Case/case.html",)
        # return render(request, "Sections/sections.html",content)   
    except Exception as e:
                info = traceback.format_exc()   
                UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
                return redirect(error_500)
    
# Create your views here.
@login_required(login_url='login')
@permission_required('app.add_terorist', raise_exception=False, login_url='login')
def case_terorist(request):
    device_info = hanldeLog(request)
    try:
        msg = f"You Visited Add New Terorist Case Page"
        UserLog(user=request.user,device=device_info,message=msg,type='info').save()
        return render(request, "Case/terorist.html",)
        # return render(request, "Sections/sections.html",content)   
    except Exception as e:
                info = traceback.format_exc()   
                UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
                return redirect(error_500)


@login_required(login_url='login')
@permission_required('app.add_case', raise_exception=False, login_url='login')
def add_case(request):
    device_info = hanldeLog(request)
    try:
        if request.method == 'POST' and request.FILES['file'] :
            district = request.POST.get('district')
            unit = request.POST.get('unit')
            case = request.POST.get('case')
            form_type = request.POST.get('form_type')
            sub_unit = request.POST.get('sub_unit')
            type = request.POST.get('type')
            status = request.POST.get('status')
            description = request.POST.get('description')
            file=request.FILES['file']
            flag = 0
            person_info= request.user.person
            print(person_info)
            addCase = Case(district=district, type=type, status=status, description=description, flag=flag,unit=unit, sub_unit=sub_unit,person=person_info,case=case,form=form_type)
            addCase.save()
            if addCase:
                fileSave = Files(file=file,case=addCase)
                fileSave.save()
                if fileSave:
                    msg = f"Successfully added {district} Case"
                    UserLog(user=request.user,device=device_info,message=msg,type='info').save()
                    return JsonResponse({'success': True,'message': msg})
            else:
                msg = f"Ops ! {district} Case Not Saved!"
                return JsonResponse({'success': False,'message': msg})
    except Exception as e:
                info = traceback.format_exc()   
                UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
                return redirect(error_500)


@login_required(login_url='login')
@permission_required('app.add_terorist', raise_exception=False, login_url='login')
def add_terorist(request):
    device_info = hanldeLog(request)
    try:
        if request.method == 'POST' and request.FILES['file'] :
            district = request.POST.get('district')
            unit = request.POST.get('unit')
            form_type = request.POST.get('form_type')
            sub_unit = request.POST.get('sub_unit')
            info = request.POST.get('info')
            status = request.POST.get('status')
            description = request.POST.get('description')
            file=request.FILES['file']
            flag = 0
            person_info= request.user.person
            print(person_info)
            addCase = Case(district=district, status=status, description=description, flag=flag,unit=unit, sub_unit=sub_unit,person=person_info,form=form_type,info=info)
            addCase.save()
            if addCase:
                fileSave = Files(file=file,case=addCase)
                fileSave.save()
                if fileSave:
                    msg = f"Successfully added {district} Terorist Case"
                    UserLog(user=request.user,device=device_info,message=msg,type='info').save()
                    return JsonResponse({'success': True,'message': msg})
            else:
                msg = f"Ops ! {district} Terorist Case Not Saved!"
                return JsonResponse({'success': False,'message': msg})
    except Exception as e:
                info = traceback.format_exc()   
                UserLog.objects.create(user=request.user,device=device_info, message=str(e), info=info, type="error")
                return redirect(error_500)


@login_required(login_url='login')
@permission_required('app.view_case', raise_exception=False, login_url='login')
def case_detail(request,id):
    device_info = hanldeLog(request)
    try:

        get_case = Case.objects.get(id=id)
        print(f'case flag now is {get_case.flag}')
        if get_case.flag == 0:
            get_case.flag = 1
            get_case.save()

        # user_cases = Case.objects.filter(person=request.user).all()
        content = {
              'cases': get_case
        }
        msg = f"You Visited All Case Detail Page"
        UserLog(user=request.user,device=device_info,message=msg,type='info').save()
        return render(request, "Case/case_detail.html",content)
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
 