const btn = document.getElementById('toggleDarkMode');
btn.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    btn.textContent = 'Switch to Light Mode';
  } else {
    btn.textContent = 'Switch to Dark Mode';
  }
});
