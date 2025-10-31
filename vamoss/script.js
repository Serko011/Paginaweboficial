// ==================== MENU RESPONSIVE ====================
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

// ==================== JUEGO 1: ADIVINA ====================
document.getElementById('comprobar1').addEventListener('click', () => {
  const respuesta = document.getElementById('respuesta1').value.toLowerCase();
  const resultado = document.getElementById('resultado1');
  if (respuesta.includes("diciembre")) { // 💡 Cambia por el mes real
    resultado.textContent = "¡Correcto! Has desbloqueado 'Nuestra historia' 💕";
    desbloquearSeccion("historia", 1);
  } else {
    resultado.textContent = "Ups... intenta recordar 😅";
  }
});

// ==================== JUEGO 2: MEMORIA ====================
const memoriaGrid = document.getElementById('memoriaGrid');
const emojis = ['💖','💖','💫','💫','🌸','🌸','🌹','🌹'];
let firstCard = null;
let secondCard = null;
let matched = 0;

function crearJuegoMemoria() {
  const shuffled = emojis.sort(() => 0.5 - Math.random());
  memoriaGrid.innerHTML = '';
  shuffled.forEach(e => {
    const card = document.createElement('div');
    card.className = 'memoria-card';
    card.textContent = '?';
    card.addEventListener('click', () => {
      if (card.textContent !== '?') return;
      card.textContent = e;
      if (!firstCard) {
        firstCard = card;
      } else {
        secondCard = card;
        if (firstCard.textContent === secondCard.textContent) {
          matched += 2;
          if (matched === emojis.length) {
            document.getElementById('resultado2').textContent = "🎉 ¡Bien hecho! Desbloqueaste 'Momentos'";
            desbloquearSeccion("momentos", 2);
          }
        } else {
          setTimeout(() => {
            firstCard.textContent = '?';
            secondCard.textContent = '?';
          }, 600);
        }
        firstCard = null;
        secondCard = null;
      }
    });
    memoriaGrid.appendChild(card);
  });
}
document.getElementById('btnJuego2').addEventListener('click', crearJuegoMemoria);

// ==================== JUEGO 3: PALABRA SECRETA ====================
document.getElementById('comprobar3').addEventListener('click', () => {
  const respuesta = document.getElementById('respuesta3').value.toLowerCase();
  const resultado = document.getElementById('resultado3');
  if (respuesta.includes("princesa")) { // 💡 Cambia por el apodo real
    resultado.textContent = "💌 ¡Perfecto! Has desbloqueado la carta";
    desbloquearSeccion("carta", 3);
  } else {
    resultado.textContent = "Casi... vuelve a intentarlo 💭";
  }
});

// ==================== JUEGO 4: CORAZONES ====================
document.getElementById('btnJuego4').addEventListener('click', () => {
  const area = document.getElementById('corazonesArea');
  area.innerHTML = '';
  let score = 0;
  for (let i = 0; i < 10; i++) {
    const heart = document.createElement('span');
    heart.textContent = '💖';
    heart.className = 'heart';
    heart.style.left = Math.random() * 80 + '%';
    heart.style.top = Math.random() * 80 + '%';
    heart.addEventListener('click', () => {
      heart.remove();
      score++;
      if (score >= 10) {
        document.getElementById('resultado4').textContent = "🎊 ¡Has completado todo! Se desbloquea la galería 💞";
        desbloquearSeccion("galeria", 4);
      }
    });
    area.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }
});

// ==================== DESBLOQUEO DE SECCIONES ====================
function desbloquearSeccion(id, nivel) {
  document.getElementById(id).classList.remove('bloqueada');
  const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
  if (navLink) {
    navLink.classList.remove('locked');
    navLink.textContent = navLink.textContent.replace(' 🔒', ' 🔓');
  }
  // Mostrar siguiente juego
  const nextJuego = document.getElementById(`juego${nivel+1}`);
  if (nextJuego) nextJuego.classList.remove('bloqueada');
}

// ==================== MODO OSCURO ====================
const darkToggle = document.getElementById('darkModeToggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkToggle.textContent = document.body.classList.contains('dark-mode') ? "☀️" : "🌙";
});
