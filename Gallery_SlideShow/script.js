// Gallery data structure
const galleryData = [
    {
        title: "Nature Landscapes",
        images: [
            { src: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Mountain landscape" },
            { src: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Forest path" },
            { src: "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Ocean waves" },
            { src: "https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Desert sunset" },
            { src: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=800", alt: "Autumn trees" },
            { src: "https://images.pexels.com/photos/355321/pexels-photo-355321.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Winter landscape" }
        ]
    },
    {
        title: "Urban Architecture",
        images: [
            { src: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Modern building" },
            { src: "https://images.pexels.com/photos/273209/pexels-photo-273209.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "City skyline" },
            { src: "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Bridge architecture" },
            { src: "https://images.pexels.com/photos/415687/pexels-photo-415687.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Glass building" },
            { src: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Urban street" },
            { src: "https://images.pexels.com/photos/789380/pexels-photo-789380.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Modern interior" }
        ]
    },
    {
        title: "Portrait Photography",
        images: [
            { src: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Portrait 1" },
            { src: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Portrait 2" },
            { src: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Portrait 3" },
            { src: "https://images.pexels.com/photos/720598/pexels-photo-720598.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Portrait 4" },
            { src: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Portrait 5" },
            { src: "https://images.pexels.com/photos/718978/pexels-photo-718978.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Portrait 6" }
        ]
    }
];

// Modal state
let currentModal = {
    levelIndex: 0,
    imageIndex: 0,
    isOpen: false
};

// Initialize the gallery
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    initializeModal();
    initializeKeyboardNavigation();
});

function initializeGallery() {
    // Initialize horizontal scrolling for each level
    const galleryScrolls = document.querySelectorAll('.gallery-scroll');
    
    galleryScrolls.forEach((scroll, levelIndex) => {
        initializeHorizontalScroll(scroll, levelIndex);
        initializeImageClicks(scroll, levelIndex);
    });
    
    // Initialize navigation buttons
    initializeNavButtons();
}

function initializeHorizontalScroll(scrollElement, levelIndex) {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    // Mouse events
    scrollElement.addEventListener('mousedown', (e) => {
        isDown = true;
        scrollElement.classList.add('dragging');
        startX = e.pageX - scrollElement.offsetLeft;
        scrollLeft = scrollElement.scrollLeft;
        e.preventDefault();
    });
    
    scrollElement.addEventListener('mouseleave', () => {
        isDown = false;
        scrollElement.classList.remove('dragging');
    });
    
    scrollElement.addEventListener('mouseup', () => {
        isDown = false;
        scrollElement.classList.remove('dragging');
    });
    
    scrollElement.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollElement.offsetLeft;
        const walk = (x - startX) * 2;
        scrollElement.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events
    scrollElement.addEventListener('touchstart', (e) => {
        isDown = true;
        scrollElement.classList.add('dragging');
        startX = e.touches[0].pageX - scrollElement.offsetLeft;
        scrollLeft = scrollElement.scrollLeft;
    });
    
    scrollElement.addEventListener('touchend', () => {
        isDown = false;
        scrollElement.classList.remove('dragging');
    });
    
    scrollElement.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - scrollElement.offsetLeft;
        const walk = (x - startX) * 2;
        scrollElement.scrollLeft = scrollLeft - walk;
    });
    
    // Update navigation button states
    scrollElement.addEventListener('scroll', () => {
        updateNavButtonStates(levelIndex);
    });
    
    // Initial button state update
    updateNavButtonStates(levelIndex);
}

function initializeImageClicks(scrollElement, levelIndex) {
    const imageCards = scrollElement.querySelectorAll('.image-card');
    
    imageCards.forEach((card, imageIndex) => {
        card.addEventListener('click', (e) => {
            // Prevent click during drag
            if (scrollElement.classList.contains('dragging')) {
                return;
            }
            
            openModal(levelIndex, imageIndex);
        });
    });
}

function initializeNavButtons() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const levelIndex = parseInt(button.dataset.level);
            const isNext = button.classList.contains('nav-btn-next');
            const scrollElement = document.querySelector(`[data-level="${levelIndex}"].gallery-scroll`);
            
            if (scrollElement) {
                const scrollAmount = 336; // Image width + gap
                const direction = isNext ? 1 : -1;
                scrollElement.scrollBy({
                    left: scrollAmount * direction,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function updateNavButtonStates(levelIndex) {
    const scrollElement = document.querySelector(`[data-level="${levelIndex}"].gallery-scroll`);
    const prevButton = document.querySelector(`[data-level="${levelIndex}"].nav-btn-prev`);
    const nextButton = document.querySelector(`[data-level="${levelIndex}"].nav-btn-next`);
    
    if (scrollElement && prevButton && nextButton) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollElement;
        
        prevButton.disabled = scrollLeft <= 0;
        nextButton.disabled = scrollLeft >= scrollWidth - clientWidth - 1;
    }
}

function initializeModal() {
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    
    // Close modal events
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    
    // Navigation events
    modalPrev.addEventListener('click', () => navigateModal('prev'));
    modalNext.addEventListener('click', () => navigateModal('next'));
}

function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (!currentModal.isOpen) return;
        
        switch (e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                navigateModal('prev');
                break;
            case 'ArrowRight':
                navigateModal('next');
                break;
        }
    });
}

function openModal(levelIndex, imageIndex) {
    currentModal = {
        levelIndex,
        imageIndex,
        isOpen: true
    };
    
    updateModalContent();
    
    const modal = document.getElementById('modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    currentModal.isOpen = false;
    
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateModal(direction) {
    if (!currentModal.isOpen) return;
    
    const currentLevel = galleryData[currentModal.levelIndex];
    const totalImages = currentLevel.images.length;
    
    if (direction === 'prev') {
        currentModal.imageIndex = currentModal.imageIndex > 0 
            ? currentModal.imageIndex - 1 
            : totalImages - 1;
    } else {
        currentModal.imageIndex = currentModal.imageIndex < totalImages - 1 
            ? currentModal.imageIndex + 1 
            : 0;
    }
    
    updateModalContent();
}

function updateModalContent() {
    const currentLevel = galleryData[currentModal.levelIndex];
    const currentImage = currentLevel.images[currentModal.imageIndex];
    
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalCounter = document.getElementById('modalCounter');
    
    modalImage.src = currentImage.src;
    modalImage.alt = currentImage.alt;
    modalCaption.textContent = currentImage.alt;
    modalCounter.textContent = `${currentModal.imageIndex + 1} of ${currentLevel.images.length}`;
}