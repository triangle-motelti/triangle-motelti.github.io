// Dark mode toggle
const btn = document.getElementById('toggleDarkMode');
btn.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    btn.textContent = 'Switch to Light Mode';
    // Update particles for dark mode
    updateParticlesForDarkMode();
  } else {
    btn.textContent = 'Switch to Dark Mode';
    // Update particles for light mode
    updateParticlesForLightMode();
  }
});

// Function to update particles for light mode
function updateParticlesForLightMode() {
  if (window.particlesInstance) {
    window.particlesInstance.destroy();
  }
  loadParticles(false);
}

// Function to update particles for dark mode
function updateParticlesForDarkMode() {
  if (window.particlesInstance) {
    window.particlesInstance.destroy();
  }
  loadParticles(true);
}

// Load particles with appropriate colors
function loadParticles(isDarkMode) {
  const particleColor = isDarkMode ? '#8ab4f8' : '#5865F2';
  const linkColor = isDarkMode ? '#8ab4f8' : '#5865F2';
  
  window.particlesInstance = tsParticles.load("#tsparticles", {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      number: { 
        value: 80, 
        density: { 
          enable: true, 
          area: 800 
        } 
      },
      color: { value: particleColor },
      shape: { type: "circle" },
      opacity: { 
        value: 0.7, 
        random: true 
      },
      size: { 
        value: 3, 
        random: { 
          enable: true, 
          minimumValue: 1 
        } 
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "bounce" }
      },
      links: {
        enable: true,
        distance: 150,
        color: linkColor,
        opacity: 0.4,
        width: 1
      }
    },
    detectRetina: true
  });
}

// Initial load
window.addEventListener("DOMContentLoaded", () => {
  const isDarkMode = document.body.classList.contains('dark-mode');
  loadParticles(isDarkMode);
});