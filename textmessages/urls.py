from django.urls import path

from textmessages import views


app_name = 'textmessages'

urlpatterns = [
    path('', views.home, name='home'),
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('notify/', views.notify, name='notify'),
    path('notification/', views.showbox, name='showbox'),
    path('post/', views.post, name='post')
]