from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from .models import User, Message
from django.http import StreamingHttpResponse

import time


def home(request):
    return render(request, 'base.html')


def signup(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        if User.objects.filter(username=username):
            messages.error(request, "Username already exist! Please try some other username.")
            return redirect('textmessages:signup')

        user = User.objects.create_user(username=username, password=password)
        user.save()
        messages.success(request, "Your account has been successfully created.")

        return redirect('textmessages:signin')
    else:
        return render(request, 'textmessages/signup.html')


def signin(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user=user)
            context = {'message': user.username + ' You logged in successfully.'}
            return render(request, 'textmessages/signin.html', context)
        else:
            messages.error(request, 'ID or Password was incorrect.')
            return redirect('textmessages:signin')
    else:
        return render(request, 'textmessages/signin.html')


def signout(request):
    logout(request)
    messages.success(request, "Logged Out Successfully.")
    return redirect('textmessages:home')


def notify(request):
    # keep sending messages
    # need to filter them
    def event_stream():
        while True:
            time.sleep(1)
            message = Message.objects.filter(is_sent=False).first()

            text = ''

            if message:
                text = message.message
                message.is_sent = True
                message.save()
            yield 'data: %s\n\n' % text
    return StreamingHttpResponse(event_stream(), content_type='text/event-stream')


def showbox(request):
    return render(request, 'textmessages/notification.html')


def post(request):
    pass