// Dark mode toggle
const btn = document.getElementById('toggleDarkMode');
btn.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    btn.textContent = 'Switch to Light Mode';
  } else {
    btn.textContent = 'Switch to Dark Mode';
  }
});

// Simple flowing particles background (tsParticles)
window.addEventListener("DOMContentLoaded", () => {
  tsParticles.load("#tsparticles", {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      number: { value: 60, density: { enable: true, area: 800 } },
      color: { value: "#5865F2" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" }
      },
      links: {
        enable: true,
        distance: 120,
        color: "#5865F2",
        opacity: 0.18,
        width: 1
      }
    },
    detectRetina: true
  });
});
