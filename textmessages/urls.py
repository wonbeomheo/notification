from django.urls import path

from textmessages import views


app_name = 'textmessages'

urlpatterns = [
    path('', views.home, name='home'),
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('stream/', views.stream, name='stream'),
    path('chat/', views.showbox, name='showbox'),
    path('post/', views.post, name='post')
]