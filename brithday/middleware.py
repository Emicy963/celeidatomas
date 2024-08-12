from django.shortcuts import redirect
from django.urls import reverse

class AuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.session.get('is_authenticated') and request.path != reverse('login_page'):
            return redirect('login_page')
        return self.get_response(request)
