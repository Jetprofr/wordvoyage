// Variables du jeu de révision
let currentAnswer = null;
let currentMaxIndex = 3;
let currentRange = availableNumbers.slice(0, currentMaxIndex + 1);
let answered = new Set();
let successStreak = 0;
let attemptCount = 0;
let gameStats = {
  totalQuestions: 0,
  correctAnswers: 0,
  startTime: null,
  bestStreak: 0
};

// Initialisation du jeu
function initGame() {
  gameStats.startTime = Date.now();
  loadGameProgress();
  nextQuestion();
}

function updateUI() {
  document.getElementById("niveau").innerText = "Niveau : 0 à " + availableNumbers[currentMaxIndex];
  document.getElementById("success-streak").innerText = successStreak;
  document.getElementById("attempt-count").innerText = attemptCount;
  const percent = Math.floor(((currentMaxIndex + 1) / availableNumbers.length) * 100);
  document.getElementById("bar").style.width = percent + "%";
  
  // Mise à jour des statistiques
  updateGameStats();
}

function playAudio() {
  const audio = document.getElementById('audio');
  audio.currentTime = 0;
  audio.play().catch(error => {
    console.log('Audio non disponible:', error);
    showAudioFeedback();
  });
}

function showAudioFeedback() {
  const feedback = document.getElementById('feedback');
  const originalContent = feedback.innerHTML;
  feedback.innerHTML = '🔊 Audio : ' + currentAnswer + ' = ' + thaiMap[currentAnswer];
  feedback.className = 'feedback-info';
  setTimeout(() => {
    feedback.innerHTML = originalContent;
    feedback.className = '';
  }, 2000);
}

function nextQuestion() {
  const feedbackEl = document.getElementById('feedback');
  feedbackEl.innerText = "";
  feedbackEl.className = '';
  
  if (answered.size >= currentRange.length) {
    successStreak++;
    answered.clear();
    attemptCount = 0;
    if (successStreak >= 3 && currentMaxIndex + 1 < availableNumbers.length) {
      currentMaxIndex++;
      currentRange = availableNumbers.slice(0, currentMaxIndex + 1);
      successStreak = 0;
      showLevelUp();
    }
  }
  
  updateUI();
  
  const randIndex = Math.floor(Math.random() * currentRange.length);
  currentAnswer = currentRange[randIndex];
  
  const choices = new Set();
  choices.add(currentAnswer);
  while (choices.size < 3) {
    const r = currentRange[Math.floor(Math.random() * currentRange.length)];
    choices.add(r);
  }
  
  const shuffled = Array.from(choices).sort(() => Math.random() - 0.5);
  
  const audio = document.getElementById('audio');
  audio.src = `../audio/${currentAnswer}.mp3`;
  playAudio();
  
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = "";
  
  shuffled.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.innerText = choice + " = " + thaiMap[choice];
    btn.onclick = () => checkAnswer(choice);
    btn.style.animationDelay = (index * 0.1) + 's';
    btn.classList.add('fade-in-up');
    choicesDiv.appendChild(btn);
  });
  
  gameStats.totalQuestions++;
}

function checkAnswer(choice) {
  const feedback = document.getElementById('feedback');
  attemptCount++;
  
  if (choice === currentAnswer) {
    feedback.innerText = "✅ Bonne réponse !";
    feedback.classList.add('feedback-success');
    answered.add(choice);
    gameStats.correctAnswers++;
    
    // Mettre à jour le meilleur streak
    if (successStreak > gameStats.bestStreak) {
      gameStats.bestStreak = successStreak;
    }
    
    // Animation de réussite
    showCorrectAnswerAnimation();
    
    setTimeout(nextQuestion, 800);
  } else {
    feedback.innerText = "❌ Mauvaise réponse. Écoutez à nouveau.";
    feedback.classList.add('feedback-error');
    successStreak = 0;
    playAudio();
    updateUI();
    
    // Animation d'erreur
    showIncorrectAnswerAnimation();
  }
  
  saveGameProgress();
}

function showLevelUp() {
  const modal = document.createElement('div');
  modal.innerHTML = `
    <div style="
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #4caf50, #45a049);
      color: white;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 25px 50px rgba(76, 175, 80, 0.4);
      z-index: 2000;
      text-align: center;
      animation: levelUpAnimation 0.6s ease-out;
      max-width: 400px;
      width: 90%;
    ">
      <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
      <h2 style="margin-bottom: 1rem;">Niveau Supérieur !</h2>
      <p style="margin-bottom: 2rem; font-size: 1.2rem;">
        Vous progressez vers : 0 à ${availableNumbers[currentMaxIndex]}
      </p>
      <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 10px;">
        <strong>Bonus XP: +50 points</strong>
      </div>
    </div>
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.6);
      z-index: 1999;
    "></div>
  `;
  
  document.body.appendChild(modal);
  
  // Effets sonores (si disponible)
  playSuccessSound();
  
  setTimeout(() => {
    modal.remove();
  }, 3000);
}

function showCorrectAnswerAnimation() {
  // Animation de particules de succès
  createParticles('success');
}

function showIncorrectAnswerAnimation() {
  // Animation de vibration
  const gameDiv = document.getElementById('game');
  gameDiv.style.animation = 'shake 0.5s ease-in-out';
  setTimeout(() => {
    gameDiv.style.animation = '';
  }, 500);
}

function createParticles(type) {
  const colors = type === 'success' ? ['#4CAF50', '#8BC34A', '#CDDC39'] : ['#f44336', '#FF5722'];
  
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      top: 50%;
      left: 50%;
      pointer-events: none;
      z-index: 3000;
      animation: particleAnimation 1s ease-out forwards;
    `;
    
    particle.style.setProperty('--random-x', (Math.random() - 0.5) * 200 + 'px');
    particle.style.setProperty('--random-y', (Math.random() - 0.5) * 200 + 'px');
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
  }
}

function updateGameStats() {
  const accuracy = gameStats.totalQuestions > 0 
    ? Math.round((gameStats.correctAnswers / gameStats.totalQuestions) * 100)
    : 0;
    
  // Sauvegarder les statistiques globales
  const globalStats = JSON.parse(localStorage.getItem('thaiAppStats')) || {};
  globalStats.successRate = accuracy;
  globalStats.currentLevel = Math.floor(currentMaxIndex / 10) + 1;
  globalStats.learnedCount = answered.size;
  globalStats.bestStreak = Math.max(globalStats.bestStreak || 0, gameStats.bestStreak);
  
  localStorage.setItem('thaiAppStats', JSON.stringify(globalStats));
}

function saveGameProgress() {
  const progress = {
    currentMaxIndex,
    successStreak,
    answered: Array.from(answered),
    attemptCount,
    gameStats
  };
  
  localStorage.setItem('thaiGameProgress', JSON.stringify(progress));
}

function loadGameProgress() {
  const saved = localStorage.getItem('thaiGameProgress');
  if (saved) {
    const progress = JSON.parse(saved);
    currentMaxIndex = progress.currentMaxIndex || 3;
    successStreak = progress.successStreak || 0;
    answered = new Set(progress.answered || []);
    attemptCount = progress.attemptCount || 0;
    gameStats = { ...gameStats, ...progress.gameStats };
    currentRange = availableNumbers.slice(0, currentMaxIndex + 1);
  }
}

function playSuccessSound() {
  // Créer un son de succès simple
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // Do
  oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // Mi
  oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // Sol
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
}

// Ajout des styles d'animation
const gameStyles = document.createElement('style');
gameStyles.textContent = `
  @keyframes levelUpAnimation {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.1);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @keyframes particleAnimation {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(
        calc(-50% + var(--random-x)), 
        calc(-50% + var(--random-y))
      ) scale(0);
      opacity: 0;
    }
  }
  
  .feedback-success {
    background: linear-gradient(135deg, #d4edda, #c3e6cb);
    color: #155724;
    border: 2px solid #c3e6cb;
  }
  
  .feedback-error {
    background: linear-gradient(135deg, #f8d7da, #f5c6cb);
    color: #721c24;
    border: 2px solid #f5c6cb;
  }
  
  .feedback-info {
    background: linear-gradient(135deg, #e3f2fd, #bbdefb);
    color: #1565c0;
    border: 2px solid #bbdefb;
  }
`;
document.head.appendChild(gameStyles);

// Initialiser le jeu au chargement de la page
if (document.getElementById('game')) {
  document.addEventListener('DOMContentLoaded', initGame);
}