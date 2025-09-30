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

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Simple particles background with fallback
window.addEventListener("DOMContentLoaded", function() {
  // Check if tsParticles is available
  if (typeof tsParticles !== 'undefined') {
    initializeParticles();
  } else {
    console.log("tsParticles not loaded, retrying in 1 second...");
    setTimeout(function() {
      if (typeof tsParticles !== 'undefined') {
        initializeParticles();
      } else {
        console.error("tsParticles failed to load");
        createFallbackParticles();
      }
    }, 1000);
  }
});

function initializeParticles() {
  console.log("Initializing particles...");
  
  tsParticles.load("tsparticles", {
    fullScreen: { enable: false },
    background: { color: "transparent" },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "connect" }
      }
    },
    particles: {
      number: { 
        value: 80, 
        density: { 
          enable: true, 
          area: 800 
        } 
      },
      color: { value: "#5865F2" },
      shape: { type: "circle" },
      opacity: { 
        value: { min: 0.3, max: 0.8 }, 
        animation: { enable: true, speed: 1, sync: false }
      },
      size: { 
        value: { min: 1, max: 5 }, 
        animation: { enable: true, speed: 2, sync: false }
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "bounce" }
      },
      links: {
        enable: true,
        distance: 120,
        color: "#5865F2",
        opacity: 0.4,
        width: 1
      }
    },
    detectRetina: true
  }).then(container => {
    console.log("Particles loaded successfully!", container);
  }).catch(error => {
    console.error("Error loading particles:", error);
    createFallbackParticles();
  });
}

// Fallback using canvas if tsParticles fails
function createFallbackParticles() {
  console.log("Creating fallback particles...");
  
  const canvas = document.createElement('canvas');
  canvas.id = 'fallback-particles';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 50;

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
      color: '#5865F2'
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = 0.6;
      ctx.fill();
    });
    
    // Draw connections
    ctx.globalAlpha = 0.2;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = '#5865F2';
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}
