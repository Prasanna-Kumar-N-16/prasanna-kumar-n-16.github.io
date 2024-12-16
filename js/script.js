/*================ toggle bar ===============*/

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('fa-xmark'); 
    navbar.classList.toggle('active')
});

/*================ scroll section bar ===============*/

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    /*=============== sticky navbar =============*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*===== remove toggle icon and navbar ===*/
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

/*===== scroll reveal =============*/
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'button' });
ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'left' }); 
ScrollReveal().reveal('.home-contact p, .about-content', { origin: 'right'});


/*================ project section bar ===============*/
// Projects slider functionality
let currentSlide = 0;
const projectsWrapper = document.querySelector('.projects-wrapper');
const projectBoxes = document.querySelectorAll('.projects-box');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateSlideButtons() {
    const maxSlides = projectBoxes.length - (window.innerWidth > 991 ? 2 : 1);
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide >= maxSlides;
    
    prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentSlide >= maxSlides ? '0.5' : '1';
}

function slideProjects(direction) {
    const boxWidth = projectBoxes[0].offsetWidth + 32; // Width + gap
    const maxSlides = projectBoxes.length - (window.innerWidth > 991 ? 2 : 1);
    
    if (direction === 'left' && currentSlide > 0) {
        currentSlide--;
    } else if (direction === 'right' && currentSlide < maxSlides) {
        currentSlide++;
    }
    
    projectsWrapper.style.transform = `translateX(-${currentSlide * boxWidth}px)`;
    updateSlideButtons();
}

// Event listeners for slider buttons
prevBtn.addEventListener('click', () => slideProjects('left'));
nextBtn.addEventListener('click', () => slideProjects('right'));

// Toggle project details
// Toggle project details
function toggleProject(detailsId) {
    console.log('Toggle called for:', detailsId); // Debug log
    const details = document.getElementById(detailsId);
    
    if (!details) {
        console.error('Project details element not found:', detailsId);
        return;
    }

    // Close all other project details
    document.querySelectorAll('.project-details').forEach(detail => {
        if (detail.id !== detailsId) {
            detail.classList.remove('active');
        }
    });
    
    // Toggle the clicked project details
    details.classList.toggle('active');
    
    // Update button text
    const button = details.nextElementSibling;
    if (button && button.classList.contains('project-btn')) {
        button.textContent = details.classList.contains('active') ? 'Show Less' : 'Learn More';
    }
}

// Add event listener after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to all project buttons
    document.querySelectorAll('.project-btn').forEach(button => {
        button.addEventListener('click', function() {
            const detailsId = this.previousElementSibling.id;
            toggleProject(detailsId);
        });
    });
});