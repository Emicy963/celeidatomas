from django.urls import path
from brithday import views
from setup import settings

urlpatterns = [
    path('birthday/', views.birthday_page, name='birthday_page'),
    path('', views.login_page, name='login'),
    path('game/', views.game_page, name='game_page'),
    path('special-message/', views.special_message, name='special_message'),
]
