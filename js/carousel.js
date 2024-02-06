document.addEventListener('DOMContentLoaded', function() {
    const modalIframe = document.getElementById('modalIframe'); // Make sure this exists in your HTML
    const modal = document.getElementById('imageModal');
    const modalContent = document.getElementById('modalImage'); // This may need to be an iframe or other container for non-image content
    const closeModal = document.getElementById('closeModal');
    const prevModal = document.getElementById('prevModal');
    const nextModal = document.getElementById('nextModal');
    let ytPlayers = []; // This should be filled with new YT.Player objects

    let currentCarouselMedia = []; // This will store both images and iframes of the current carousel

    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel__slide');
        let activeSlideIndex = 0;
        let currentModalIndex = 0;

        function updateActiveSlide(newIndex) {
            slides[activeSlideIndex].classList.remove('active');
            carousel.querySelectorAll('.carousel__navigation-button')[activeSlideIndex].classList.remove('active');
            
            activeSlideIndex = newIndex;
            
            slides[activeSlideIndex].classList.add('active');
            carousel.querySelectorAll('.carousel__navigation-button')[activeSlideIndex].classList.add('active');
        }

        currentCarouselMedia = Array.from(carousel.querySelectorAll('img, iframe'));
        slides.forEach((slide, index) => {
            // Find all images and iframes within this slide
            const mediaItems = slide.querySelectorAll('img, iframe');
            mediaItems.forEach(element => {
                element.addEventListener('click', () => {
                    modal.style.display = "block";
                    if (element.tagName.toLowerCase() === 'img') {
                        modalContent.style.display = "block"; // Show image
                        modalIframe.style.display = "none"; // Hide iframe
                        modalContent.src = element.src; // Set the src for images
                    } else if (element.tagName.toLowerCase() === 'iframe') {
                        modalContent.style.display = "none"; // Hide image
                        modalIframe.style.display = "block"; // Show iframe
                        modalIframe.src = element.src; // Set the src for iframe
                    }
                    currentModalIndex = index;

                });
            });

            // Add navigation buttons
            const navItem = document.createElement('li');
            navItem.classList.add('carousel__navigation-item');
            const navButton = document.createElement('a');
            navButton.classList.add('carousel__navigation-button');
            navButton.textContent = `Go to slide ${index + 1}`;
            navButton.addEventListener('click', (e) => {
                e.preventDefault();
                updateActiveSlide(index);
            });
            navItem.appendChild(navButton);
            carousel.querySelector('.carousel__navigation-list').appendChild(navItem);

            // Initialize the first slide and its navigation button as active
            if (index === 0) {
                slide.classList.add('active');
                navButton.classList.add('active');
            }
        });

        // Add prev and next buttons to each carousel
        const prevButton = document.createElement('a');
        prevButton.classList.add('carousel__prev');
        prevButton.textContent = 'Go to previous slide';
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            const newIndex = (activeSlideIndex - 1 + slides.length) % slides.length;
            updateActiveSlide(newIndex);
        });
        carousel.appendChild(prevButton);

        const nextButton = document.createElement('a');
        nextButton.classList.add('carousel__next');
        nextButton.textContent = 'Go to next slide';
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            const newIndex = (activeSlideIndex + 1) % slides.length;
            updateActiveSlide(newIndex);
        });
        carousel.appendChild(nextButton)

        // Modal navigation
        prevModal.addEventListener('click', () => {
            console.log('Previous button clicked'); // Add this line
            console.log('currentModalIndex before prev:', currentModalIndex); // Add this line
            currentModalIndex = (currentModalIndex - 1 + currentCarouselMedia.length) % currentCarouselMedia.length;
            const prevMedia = currentCarouselMedia[currentModalIndex]; // Assumes only one media item per slide
            if (prevMedia.tagName.toLowerCase() === 'img') {
                modalContent.style.display = "block"; // Show image
                modalIframe.style.display = "none"; // Hide iframe
                modalContent.src = prevMedia.src; // Set image src
            } else {
                modalContent.style.display = "none"; // Hide image
                modalIframe.style.display = "block"; // Show iframe
                modalIframe.src = prevMedia.getAttribute('src'); // Set iframe src
            }
        });

        nextModal.addEventListener('click', () => {
            console.log('Next button clicked'); // Add this line
            console.log('currentModalIndex before next:', currentModalIndex); // Add this line
            currentModalIndex = (currentModalIndex + 1) % currentCarouselMedia.length;
            const nextMedia = currentCarouselMedia[currentModalIndex];
            if (nextMedia.tagName.toLowerCase() === 'img') {
                modalContent.style.display = "block"; // Show image
                modalIframe.style.display = "none"; // Hide iframe
                modalContent.src = nextMedia.src; // Set image src
            } else {
                modalContent.style.display = "none"; // Hide image
                modalIframe.style.display = "block"; // Show iframe
                modalIframe.src = nextMedia.getAttribute('src'); // Set iframe src
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
