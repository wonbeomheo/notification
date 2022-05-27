from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from .models import User, Message
from django.http import StreamingHttpResponse, JsonResponse

import time
import json


def home(request):
    context = {'title': 'Lobby'}
    return render(request, 'textmessages/base.html', context)


def signup(request):
    context = {'title': 'Sign Up'}
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
        return render(request, 'textmessages/signup.html', context)


def signin(request):
    context = {'title': 'Sign In'}
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user=user)
            context = {'message': 'You logged in successfully.'}
            return render(request, 'textmessages/signin.html', context)
        else:
            messages.error(request, 'ID or Password was incorrect.')
            return redirect('textmessages:signin')
    else:
        return render(request, 'textmessages/signin.html', context)


def signout(request):
    logout(request)
    messages.success(request, "Logged Out Successfully.")
    return redirect('textmessages:home')


def stream(request):
    # keep sending messages
    # need to filter them
    def event_stream():
        while True:
            message = Message.objects.filter(is_sent=False).first()
            time.sleep(0.1)

            if message:
                text = message.message
                message.is_sent = True
                message.save()
                yield 'data: %s %s\n\n' % (message.user, text)
    return StreamingHttpResponse(event_stream(), content_type='text/event-stream')


def showbox(request):
    return render(request, 'textmessages/chat.html')


def post(request):
    print(request.user)
    print('In Post')
    json_object = json.loads(request.body)
    message = json_object.get('message')
    user = request.user

    Message.objects.create(user=user, message=message)
    return JsonResponse(json_object)