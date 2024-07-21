from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, alogin, logout
from django.contrib.auth.decorators import login_required

def registration_page(request):
    if request.method == "post":
        username = request.post.get('username')
        email = request.post.get('email')
        password = request.post.get('password')

        user=User.objects.filter(username=username)

        if user.exitsts():
            messages.warning(request, "Username already taken")
            return render(request,"registration.html")

        user = user.objects.create(
            username=username,
            email=email,
        )

        user.set_password(password)
        user.save()
        messages.success(request, "Account created successfully")
    return render(request,"registration.html")

def login_page(request):
    if request.method == "post":
        username = request.post.get('username')
        password = request.post.get('password')

        if not User.objects.filter(username=username).exists():
            messages.error(request, 'Invalid username')
            return render(request,"login.html")

        user = authenticate(username=username , password=password)
        if user is None:
            messages.error(request, 'Invalid password')
            return render(request,"login.html")
        else:
            alogin(request, user)
            return render(request, "home.html")

    return render(request,"login.html")

def logout_page(request):
    logout(request)
    return render(request, "login.html")

@login_required(login_url= "login.html")
def home(request):
    return render(request,"home.html")