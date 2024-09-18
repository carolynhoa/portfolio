const text1 = "Carolyn Hoa";
const text2 = "Computer Science and Design";
const text3 = "Northeastern University";
const text4 = "Hi! My name is Carolyn Hoa. I am a student at";
const text5 = "Northeastern University studying Computer Science";
const text6 = "and Design with a passion for UI/UX. I enjoy creating" ;
const text7 = "intuitive and visually engaging user experiences by";
const text8 = "blending my technical and creative skills. Welcome!";
const typingSpeed = 100;
const newTypingSpeed = 90;

const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');
const cursor1 = document.getElementById('cursor1');
const cursor2 = document.getElementById('cursor2');
const cursor3 = document.getElementById('cursor3');
const line4 = document.getElementById('line4');
const line5 = document.getElementById('line5');
const line6 = document.getElementById('line6');

function getCurrentTimeAndDate() {
    const now = new Date();
    return now.toLocaleString();
}

function typeText(element, text, cursor, callback, speed = typingSpeed) {
    let index = 0;
    function type() {
        if (index < text.length) {
            element.innerHTML += text[index++];
            if (cursor) {
                updateCursorPosition(cursor, element);
            }
            setTimeout(type, speed);
        } else if (callback) {
            setTimeout(callback, speed);
        }
    }
    type();
}

function updateCursorPosition(cursor, element) {
    const rect = element.getBoundingClientRect();
    cursor.style.left = `${rect.left + window.scrollX + element.scrollWidth}px`;
    cursor.style.top = `${rect.top + window.scrollY}px`;
}

function startTypingAnimation() {
    typeText(line1, text1, cursor1, () => {
        cursor1.classList.add('hidden');
        cursor2.classList.remove('hidden');
        const currentTimeAndDate = getCurrentTimeAndDate();
        typeText(line2, text2, cursor2, () => {
            cursor2.classList.add('hidden');
            cursor3.classList.remove('hidden');
            typeText(line3, text3, cursor3);
        });
    });
}

function startSecondTypingAnimation() {
    document.getElementById('typing-container').style.display = 'block';
    typeText(line4, text4, null, () => {
        typeText(line5, text5, null, () => {
            typeText(line6, text6, null, () => {
                typeText(line7, text7, null, () => {
                    typeText(line8, text8); 
                }, newTypingSpeed); 
            }, newTypingSpeed);
        }, newTypingSpeed);
        
    }, newTypingSpeed);
}

document.addEventListener('wheel', function (event) {
    if (event.deltaY !== 0) { 
        document.querySelector('.scroll-container').scrollLeft += event.deltaY;
        event.preventDefault(); // Prevent default vertical scrolling
    }
});

window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.spinner-wrapper').style.display = 'none';
        startTypingAnimation();
    }, 3000); //3 seconds
});

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-bar a');
    const scrollContainer = document.querySelector('.scroll-container');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 

            const targetId = link.getAttribute('href').substring(1); 
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const targetIndex = Array.from(scrollContainer.querySelectorAll('.horizontal-content > div')).indexOf(targetElement);
                const scrollLeft = targetIndex * window.innerWidth;

                scrollContainer.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth' 
                });
            }
        });
    });

    setTimeout(() => {
        startSecondTypingAnimation();
    }, 9500); 
});

document.addEventListener('DOMContentLoaded', () => {
    const cursorOutline = document.querySelector('.custom-cursor-outline');
    const cursorInner = document.querySelector('.custom-cursor-inner');

    document.addEventListener('mousemove', (e) => {
        cursorOutline.style.left = `${e.pageX}px`;
        cursorOutline.style.top = `${e.pageY}px`;
        cursorInner.style.left = `${e.pageX}px`;
        cursorInner.style.top = `${e.pageY}px`;
    });

    const interactiveElements = document.querySelectorAll('a, button, .close-button, .image-border img, .text-border');

    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-hover');
            cursorInner.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-hover');
            cursorInner.classList.remove('cursor-hover');
        });
    });
});

const imageBorders = document.querySelectorAll('.image-border img');
const overlay = document.getElementById('overlay');
const expandedImage = document.getElementById('expandedImage');

imageBorders.forEach((img) => {
    img.addEventListener('click', function () {
        expandedImage.src = this.src; 
        overlay.style.display = 'flex'; 
    });
});

const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', function () {
    overlay.style.display = 'none'; 
});

const galleryContainer = document.querySelector('.gallery-container');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

function updateButtonPositions() {
    const galleryRect = galleryContainer.getBoundingClientRect();

    prevButton.style.top = `${galleryRect.top + galleryRect.height / 2}px`;
    nextButton.style.top = `${galleryRect.top + galleryRect.height / 2}px`;
}

function scrollGallery(direction) {
    const scrollAmount = direction === 'left' ? -galleryContainer.clientWidth : galleryContainer.clientWidth;
    galleryContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    updateButtonPositions();
}

nextButton.addEventListener('click', () => scrollGallery('right'));
prevButton.addEventListener('click', () => scrollGallery('left'));

galleryContainer.addEventListener('scroll', updateButtonPositions);
window.addEventListener('resize', updateButtonPositions);

updateButtonPositions();
