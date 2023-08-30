from django.urls import path
from app import views
from app.code import Accounts,Logs,Groups,Permission,Content,Case,Report
urlpatterns = [
    path('', views.index, name="index"),
    path('login/', Accounts.login_user, name="login"),
    path('logout/', Accounts.logout_user, name='logout'),
    path('users/', Accounts.users, name='users'),
    path('editAccount/', Accounts.updateAccount, name='editAccount'),
    path('activeAccount/', Accounts.activeAccount, name='activeAccount'),
    path('disableAccount/', Accounts.disableAccount, name='disableAccount'),


    # path("permissions/",Accounts.permissions, name="permissions"),

    #region Groups
    path('groups/', Groups.groups, name='groups'),
    path('user_groups/', Groups.user_groups, name='user_groups'),
    path('assign_user_to_groups/', Groups.assign_user_to_groups, name='assign_user_to_groups'),
    path('get_user_groups/', Groups.get_user_groups, name='get_user_groups'),
    path('update_group/', Groups.update_group, name='update_group'),
    path('delete_group/', Groups.delete_group, name='delete_group'),
    path('group_detail/<int:id>/', Groups.group_detail, name='group_detail'),

    #rwegion Contents
    path('content/', Content.content_type, name='content'),
    path('add_content/', Content.add_content, name='add_content'),
    path('delete_content/', Content.delete_content, name='delete_content'),
    path('edit_content/', Content.update_content, name='edit_content'),
    path('get_content_value/', Content.get_content_value, name='get_content_value'),



    # group permissions
    path("assign_permissions_to_group/",Groups.assign_permissions_to_group, name="assign_permissions_to_group"),
    path("get_permissions/",Groups.get_permissions, name="get_permissions"),
    path("groupPermissions/",Groups.groupPermissions, name="group_Permissions"),
    path("get_group_permissions/",Groups.get_group_permissions, name="get_group_permissions"),
    #endregion
    
    #region Permissions
    path("permissions/",Permission.permissions, name="permissions"),
    path("assign_user_permissions/",Permission.assign_user_permissions, name="assign_user_permissions"),
    path("get-user-info/",Permission.get_user_info, name="get-user-info"),
    path("get_permissions_user/",Permission.get_permissions_user, name="get_permissions_user"),
    path("get_user_permissions/",Permission.get_user_permissions, name="get_user_permissions"),
    path("assign_permissions_to_user/",Permission.assign_permissions_to_user,name="assign_permissions_to_user"),
    path("assign_permissions_to_user/",Permission.assign_permissions_to_user,name="assign_permissions_to_user"),
    path("edit_permission/",Permission.edit_permission, name="edit_permission"),
    path("delete_permission/",Permission.delete_permission, name="delete_permission"),

    #endregion




    #region Logs
    path("AuditLogs/", Logs.audit_logs, name="auditlogs"),
    path("ErrorLogs/", Logs.error_logs, name="errorlogs"),
    #endregion




    #region Pages
    path("500/", views.error_500, name="error500"),
    path("404/", views.error_404, name="error404"),
    #endregion


    path("case/", Case.case_view, name="case"),
    path("add_case/", Case.add_case, name="add_case"),
    path("cases/", Case.cases_list, name="cases"),
    path("case_detail/<int:id>", Case.case_detail, name="case_detail"),

    path("terorist/", Case.case_terorist, name="terorist"),
    path("add_terorist/", Case.add_terorist, name="add_terorist"),


    path("report/", Report.case_report, name="case_report"),




]
