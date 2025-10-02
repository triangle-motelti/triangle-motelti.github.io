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
        density: { enable: true, area: 800 } 
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
    
    particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = 0.6;
      ctx.fill();
    });
    
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
  
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// --- Readme Panel Functionality ---

// Add click event listeners for all "Read Writeup" links
document.querySelectorAll('a.project-link').forEach(link => {
  if(link.textContent.trim() === "Read Writeup") {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href'); // e.g., "https://github.com/triangle-motelti/pipe#readme"
      
      try {
        let url = new URL(href);
        let pathParts = url.pathname.split('/');
        if (pathParts.length >= 3) {
          let owner = pathParts[1];
          let repo = pathParts[2];
          let rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`;
          fetch(rawUrl)
            .then(response => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.text();
            })
            .then(text => {
              // Display fetched markdown content
              document.getElementById('readme-content').innerHTML = `<pre>${text}</pre>`;
              document.getElementById('readme-panel').classList.add('active');
            })
            .catch(error => {
              console.error('Error fetching README:', error);
              document.getElementById('readme-content').innerHTML = `<p>Error fetching README.</p>`;
              document.getElementById('readme-panel').classList.add('active');
            });
        }
      } catch (err) {
        console.error("Invalid URL in Read Writeup link", err);
      }
    });
  }
});

// Close button handler for the README panel
document.getElementById('close-readme').addEventListener('click', function() {
  document.getElementById('readme-panel').classList.remove('active');
});

