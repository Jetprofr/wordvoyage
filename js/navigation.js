// Navigation entre pages
function navigateTo(page) {
  // Animation de sortie
  document.body.style.opacity = '0.8';
  document.body.style.transform = 'scale(0.98)';
  
  setTimeout(() => {
    window.location.href = page;
  }, 200);
}

// Modal générique
function showModal(title, message, type = 'info') {
  const modal = document.createElement('div');
  modal.innerHTML = `
    <div style="
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      z-index: 2000;
      text-align: center;
      animation: modalSlideIn 0.3s ease-out;
      max-width: 400px;
      width: 90%;
    ">
      <h3 style="color: #4caf50; margin-bottom: 1rem;">${title}</h3>
      <p style="color: #666; margin-bottom: 1.5rem;">${message}</p>
      <button onclick="this.parentElement.parentElement.remove()" style="
        background: linear-gradient(135deg, #4caf50, #45a049);
        border: none;
        color: white;
        padding: 0.8rem 1.5rem;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
      ">OK</button>
    </div>
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 1999;
    " onclick="this.parentElement.remove()"></div>
  `;
  document.body.appendChild(modal);
}

// Message toast
function showMessage(message, type = 'info') {
  const toast = document.createElement('div');
  const colors = {
    success: '#4CAF50',
    error: '#f44336',
    info: '#2196F3',
    warning: '#ff9800'
  };
  
  toast.innerHTML = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${colors[type] || colors.info};
    color: white;
    padding: 1rem 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    z-index: 3000;
    animation: slideInRight 0.3s ease-out;
    font-weight: 600;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Styles pour les animations
const style = document.createElement('style');
style.textContent = `
  @keyframes modalSlideIn {
    from {
      transform: translate(-50%, -60%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);