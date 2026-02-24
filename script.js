// ==================== CONFIG ====================
const PASSWORD = 'veduu';
const NUM_FLOAT_ITEMS = 30;
const HERO_IMAGE_CHANGE_TIME = 3000; // Change hero image every 4 seconds

// ==================== HERO IMAGES ARRAY ====================
const HERO_IMAGES = [
    './assets/pic1.jpg',
    './assets/pic2.jpg',
    './assets/pic3.jpg',
    './assets/pic4.jpg'
    
];

// ==================== ELEMENTS ====================
const passwordGate = document.getElementById('passwordGate');
const passwordInput = document.getElementById('passwordInput');
const unlockBtn = document.getElementById('unlockBtn');
const errorMsg = document.getElementById('errorMsg');
const landingPage = document.getElementById('landingPage');
const floatingItems = document.getElementById('floatingItems');
const heroImg = document.getElementById('heroImg');
const shuffleBtn = document.getElementById('shuffleBtn');
const centralMsg = document.getElementById('centralMsg');

// ==================== RANDOM IMAGES & MESSAGES ====================
const PHOTO_URLS = [
    // Regular friend photos
    'https://picsum.photos/seed/friendmoment1/400/400',
    'https://picsum.photos/seed/friendmoment2/400/400',
    'https://picsum.photos/seed/friendmoment3/400/400',
    'https://picsum.photos/seed/friendmoment4/400/400',
    'https://picsum.photos/seed/friendmoment5/400/400',
    // Anime character & scene images
    'https://picsum.photos/seed/anime1/400/400',
    'https://picsum.photos/seed/animegirl/400/400',
    'https://picsum.photos/seed/animeboy/400/400',
    'https://picsum.photos/seed/manga/400/400',
    'https://picsum.photos/seed/sakura/400/400',
    'https://picsum.photos/seed/shoujo/400/400',
    'https://picsum.photos/seed/fantasy/400/400',
    // Anime-themed aesthetic images
    'https://picsum.photos/seed/starry/400/400',
    'https://picsum.photos/seed/sunset/400/400',
    'https://picsum.photos/seed/clouds/400/400',
    'https://picsum.photos/seed/moonlight/400/400',
    // Friend moments
    'https://picsum.photos/seed/friendship/400/400',
    'https://picsum.photos/seed/happy/400/400',
    'https://picsum.photos/seed/smile/400/400',
    'https://picsum.photos/seed/joy/400/400',
    'https://picsum.photos/seed/memories/400/400',
    'https://picsum.photos/seed/dreams/400/400',
    'https://picsum.photos/seed/magic/400/400',
    'https://picsum.photos/seed/sparkle/400/400',
    'https://picsum.photos/seed/love/400/400',
    'https://picsum.photos/seed/forever/400/400'
];

const MESSAGES = [
    "Tum meri life ki sabse safe jagah ho ❤️",
    "Kabhi socha nahi tha itni acchi dost mil jaayegi",
    "Tumhari hasi genuinely din better bana deti hai 😊",
    "Har random baat bhi tumhare saath special lagti hai",
    "Thank you mere har mood ko samajhne ke liye ✨",
    "Tum ho to sab thoda easy lagta hai",
    "Kuch log bas dil ko sukoon dete hain… tum unme se ho 💛",
    "Agar rewind button hota, to humari best memories fir se jeeta",
    "Tumhari presence hi kaafi hai 🌸",
    "Opposite bhi, similar bhi… aur perfect balance bhi 💫",
    "Best friend nahi… best part of life ho tum 💕",
    "Stay exactly the way you are — that's perfect 🌟"
];
// ==================== PASSWORD VERIFICATION ====================
unlockBtn.addEventListener('click', handleUnlock);
passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleUnlock();
});

function handleUnlock() {
    const value = passwordInput.value.trim();
    if (value === PASSWORD) {
        errorMsg.textContent = '';
        passwordGate.classList.add('hidden');
        landingPage.classList.remove('hidden');
        setTimeout(() => {
            startSoftMusic();
            populateFloatingItems();
            startHeroImageRotation();
        }, 200);
    } else {
        errorMsg.textContent = '❌ Babe sahi password to dalo!';
        shakeElement(passwordInput);
    }
}

function shakeElement(el) {
    el.animate(
        [{ transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(0)' }],
        { duration: 300, easing: 'ease-in-out' }
    );
}

// ==================== HERO IMAGE ROTATION ====================
let currentHeroImageIndex = 0;
let heroImageRotationInterval = null;

function startHeroImageRotation() {
    if (heroImageRotationInterval) clearInterval(heroImageRotationInterval);
    
    heroImageRotationInterval = setInterval(() => {
        currentHeroImageIndex = (currentHeroImageIndex + 1) % HERO_IMAGES.length;
        const nextImage = HERO_IMAGES[currentHeroImageIndex];
        
        // Add fade effect
        heroImg.style.opacity = '0.5';
        setTimeout(() => {
            heroImg.src = nextImage;
            heroImg.style.opacity = '1';
        }, 200);
    }, HERO_IMAGE_CHANGE_TIME);
}

// Add smooth transition to hero image
heroImg.style.transition = 'opacity 0.3s ease-in-out';

// ==================== FLOATING ITEMS ====================
function populateFloatingItems() {
    floatingItems.innerHTML = '';
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = 0; i < NUM_FLOAT_ITEMS; i++) {
        const item = document.createElement('div');
        item.className = 'float-item';

        // Random size
        const sizes = ['size-sm', 'size-md', 'size-lg'];
        const size = sizes[i % sizes.length];
        item.classList.add(size);

        // Create image
        const img = document.createElement('img');
        img.src = PHOTO_URLS[(i * 7) % PHOTO_URLS.length];
        img.alt = 'Moment';
        img.onerror = () => { img.src = 'https://picsum.photos/300/300?random=' + Math.random(); };
        item.appendChild(img);

        // Add message label randomly
        if (Math.random() < 0.9) {
            const label = document.createElement('div');
            label.className = 'float-label' + (Math.random() < 0.3 ? ' small' : '');
            label.textContent = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
            item.appendChild(label);
        }

        // Random position
        positionItem(item, w, h);
        floatingItems.appendChild(item);

        // Staggered animation
        setTimeout(() => item.classList.add('active'), 50 + i * 40);

        // Click to reposition
        item.addEventListener('click', () => positionItem(item, w, h));
    }
}

function positionItem(el, w, h) {
    const x = Math.random() * (w - 150) + 75;
    const y = Math.random() * (h - 150) + 75;
    const rotation = Math.random() * 50 - 25;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
}

shuffleBtn.addEventListener('click', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    document.querySelectorAll('.float-item').forEach(item => {
        positionItem(item, w, h);
    });
});

// ==================== HERO IMAGE ROTATION ====================
// let currentHeroImageIndex = 0;
// let heroImageRotationInterval = null;

function startHeroImageRotation() {
    if (heroImageRotationInterval) clearInterval(heroImageRotationInterval);
    
    heroImageRotationInterval = setInterval(() => {
        currentHeroImageIndex = (currentHeroImageIndex + 1) % HERO_IMAGES.length;
        const nextImage = HERO_IMAGES[currentHeroImageIndex];
        
        // Add fade effect
        heroImg.style.opacity = '0.5';
        setTimeout(() => {
            heroImg.src = nextImage;
            heroImg.style.opacity = '1';
        }, 200);
    }, HERO_IMAGE_CHANGE_TIME);
}

// Add smooth transition
heroImg.style.transition = 'opacity 0.3s ease-in-out';

// ==================== CUSTOM MUSIC PLAYER ====================
const bgMusic = document.getElementById('bgMusic');
let musicStarted = false;

function startSoftMusic() {
    if (musicStarted) return;
    musicStarted = true;
    
    try {
        bgMusic.volume = 0.5; // 50% volume
        bgMusic.play().catch(err => {
            console.log('Music playback failed:', err);
        });
    } catch (err) {
        console.log('Music error:', err);
    }
}

// ==================== CENTRAL MESSAGE ANIMATION ====================
function animateCentralMessage() {
    centralMsg.animate(
        [
            { filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.3))' },
            { filter: 'drop-shadow(0 12px 40px rgba(255,122,162,0.2))' },
            { filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.3))' }
        ],
        { duration: 4000, iterations: Infinity }
    );
}

// ==================== INIT ====================
window.addEventListener('load', () => {
    animateCentralMessage();
    // Focus on password input
    passwordInput.focus();
});

