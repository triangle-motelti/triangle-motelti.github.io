document.addEventListener('DOMContentLoaded', function() {
    const nameElement = document.querySelector('.name');
    const originalText = nameElement ? nameElement.textContent : '';
    
    if (nameElement) {
        nameElement.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                nameElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    const toggleButton = document.getElementById('toggleStars');
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            if (window.toggleInteractivity) {
                window.toggleInteractivity();
            }
        });
        
        toggleButton.classList.remove('active');
    }
});