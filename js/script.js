
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 80) { 
        // it creates a class called scrolled when the user scrolls down 80 pixels, you can adjust this value as needed
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});