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

// Particles initialization
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

// --- README Panel Functionality ---

// Function to try multiple branch names
async function fetchReadme(owner, repo) {
  const branches = ['main', 'master', 'HEAD']; // Try these branches in order
  
  for (const branch of branches) {
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
    try {
      const response = await fetch(rawUrl);
      if (response.ok) {
        return await response.text();
      }
    } catch (error) {
      console.log(`Failed to fetch from ${branch} branch:`, error);
    }
  }
  
  throw new Error('README.md not found in any common branch');
}

// Add click event listeners for all "Read Writeup" links
document.querySelectorAll('.readme-link').forEach(link => {
  link.addEventListener('click', async function(e) {
    e.preventDefault();
    
    const repo = this.getAttribute('data-repo');
    if (!repo) {
      console.error('No repository specified');
      return;
    }
    
    const [owner, repoName] = repo.split('/');
    
    // Show panel with loading state
    const readmeContent = document.getElementById('readme-content');
    readmeContent.innerHTML = '<div class="loading-spinner">Loading README...</div>';
    document.getElementById('readme-panel').classList.add('active');
    
    try {
      const text = await fetchReadme(owner, repoName);
      
      // Use marked.js to render Markdown if available, otherwise show plain text
      if (typeof marked !== 'undefined') {
        // Configure marked for better rendering
        marked.setOptions({
          breaks: true,
          gfm: true,
          headerIds: true,
          mangle: false
        });
        readmeContent.innerHTML = marked.parse(text);
      } else {
        // Fallback to plain text
        readmeContent.innerHTML = `<pre>${text}</pre>`;
      }
    } catch (error) {
      console.error('Error fetching README:', error);
      readmeContent.innerHTML = `
        <div class="error-message">
          <h3>⚠️ Error Loading README</h3>
          <p>Could not fetch README.md for ${owner}/${repoName}</p>
          <p>Please visit the <a href="https://github.com/${owner}/${repoName}" target="_blank">GitHub repository</a> directly.</p>
        </div>
      `;
    }
  });
});

// Close button handler
document.getElementById('close-readme').addEventListener('click', function() {
  document.getElementById('readme-panel').classList.remove('active');
});

// Close panel when clicking outside
document.getElementById('readme-panel').addEventListener('click', function(e) {
  if (e.target === this) {
    this.classList.remove('active');
  }
});

// Close panel with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.getElementById('readme-panel').classList.remove('active');
  }
});

