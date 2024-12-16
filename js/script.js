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
// Add this to your scripts.js file

let currentSlide = 0;
const projectsContainer = document.querySelector('.projects-container');
const projectBoxes = document.querySelectorAll('.projects-box');
const totalSlides = projectBoxes.length;

function slideProjects(direction) {
    if (direction === 'left') {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    } else {
        currentSlide = (currentSlide + 1) % totalSlides;
    }
    
    updateSlidePosition();
}

function updateSlidePosition() {
    projectsContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function toggleProject(detailsId) {
    // First, close all other project details
    const allDetails = document.querySelectorAll('.project-details');
    allDetails.forEach(detail => {
        if (detail.id !== detailsId) {
            detail.classList.remove('show-details');
        }
    });

    // Toggle the clicked project details
    const details = document.getElementById(detailsId);
    details.classList.toggle('show-details');
    
    // Update button text
    const button = details.nextElementSibling;
    if (details.classList.contains('show-details')) {
        button.textContent = 'Show Less';
    } else {
        button.textContent = 'Learn More';
    }
}

// Optional: Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        slideProjects('left');
    } else if (e.key === 'ArrowRight') {
        slideProjects('right');
    }
});