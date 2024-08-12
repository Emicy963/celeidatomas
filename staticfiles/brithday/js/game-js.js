const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startGameBtn = document.getElementById('startGame');
const scoreElement = document.getElementById('score');

let gameInterval;
let score = 0;
let player = { x: canvas.width / 2, y: canvas.height - 30, width: 50, height: 30 };
let gifts = [];

function drawPlayer() {
    ctx.fillStyle = '#8b7355';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawGift(gift) {
    ctx.fillStyle = '#ff69b4';
    ctx.fillRect(gift.x, gift.y, gift.width, gift.height);
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawPlayer();
    
    gifts.forEach((gift, index) => {
        gift.y += 2;
        drawGift(gift);
        
        if (gift.y + gift.height > player.y && gift.x < player.x + player.width && gift.x + gift.width > player.x) {
            gifts.splice(index, 1);
            score++;
            scoreElement.textContent = score;
            
            if (score === 19) {
                clearInterval(gameInterval);
                window.open('/special-message/', '_blank');
            }
        }
        
        if (gift.y > canvas.height) {
            // O jogador errou um presente, reiniciar o jogo
            clearInterval(gameInterval);
            alert('Você deixou cair um presente! O jogo vai reiniciar.');
            startGame();
        }
    });
    
    if (Math.random() < 0.02) {
        gifts.push({
            x: Math.random() * (canvas.width - 20),
            y: 0,
            width: 20,
            height: 20
        });
    }
}


function startGame() {
    score = 0;
    scoreElement.textContent = score;
    gifts = [];
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    gameInterval = setInterval(updateGame, 20);
    startGameBtn.textContent = 'Reiniciar Jogo';
}

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    player.x = e.clientX - rect.left - player.width / 2;
});

const toggleModeBtn = document.createElement('button');
toggleModeBtn.textContent = 'Modo Escuro';
toggleModeBtn.style.position = 'fixed';
toggleModeBtn.style.top = '10px';
toggleModeBtn.style.right = '10px';
document.body.appendChild(toggleModeBtn);

function updateMode() {
    const darkModeEnabled = localStorage.getItem('dark-mode') === 'enabled';
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
        toggleModeBtn.textContent = 'Modo Claro';
    } else {
        document.body.classList.remove('dark-mode');
        toggleModeBtn.textContent = 'Modo Escuro';
            }
    }

updateMode();

toggleModeBtn.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('dark-mode', 'disabled');
        toggleModeBtn.textContent = 'Modo Escuro';
    } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('dark-mode', 'enabled');
        toggleModeBtn.textContent = 'Modo Claro';
            }
        });

// Adicionar suporte para toque em dispositivos móveis
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    player.x = touch.clientX - rect.left - player.width / 2;
});

startGameBtn.addEventListener('click', startGame);

// Ajustar o tamanho do canvas quando a janela for redimensionada
function resizeCanvas() {
    canvas.width = Math.min(400, window.innerWidth - 40);
    canvas.height = 200;
    player.y = canvas.height - 30;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();