from app.models import Case

def new_case_count(request):
    new_case_count = Case.objects.filter(flag=0).count()
    return {'new_case_count': new_case_count}