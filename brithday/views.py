from django.shortcuts import render, redirect
from django.urls import reverse


def birthday_page(request):
    context = {
        'nome_amiga': 'Tomás Pequena',
        'imagens': [
                'brithday/img/rebeca1.jpg',
                'brithday/img/rebeca2.jpg',
                'brithday/img/rebeca3.jpg',
                'brithday/img/rebeca4.jpg',
                'brithday/img/rebeca5.jpg',
                'brithday/img/rebeca6.jpg',
                'brithday/img/rebeca7.jpg',
                'brithday/img/rebeca8.jpg',
                    ],
                 }
    return render(request, 'brithday/birthday.html', context)


def login_page(request):
    if request.method == 'POST':
        nome = request.POST.get('nome')
        idade = request.POST.get('idade')
        
        # Verificar se o nome e a idade correspondem aos valores pré-definidos
        if nome == "Celeida Rebeca Luneva Tomás" and idade == "19":
            # Login bem-sucedido, redirecionar para a página de aniversário
            return redirect(reverse('birthday_page'))
        else:
            # Login falhou, mostrar mensagem de erro
            return render(request, 'brithday/index.html', {'error_message': 'Nome ou idade incorretos.'})
    
    return render(request, 'brithday/index.html')

def game_page(request):
    return render(request, 'brithday/game.html')

def special_message(request):
    return render(request, 'brithday/special_message.html')
