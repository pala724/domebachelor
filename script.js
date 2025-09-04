document.addEventListener('DOMContentLoaded', () => {
    if (typeof profilok === 'undefined') {
        console.error("Hiba: A 'profilok' változó nem található. Biztosan be van töltve a profilok.js?");
        return;
    }

    const cardContainer = document.querySelector('.card-container');
    const noMoreCardsView = document.querySelector('.no-more-cards');
    const likeBtn = document.querySelector('#like-btn');
    const dislikeBtn = document.querySelector('#dislike-btn');
    const resetBtn = document.getElementById('reset-btn');
    const modalOverlay = document.getElementById('profile-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalImg = document.getElementById('modal-img');
    const modalName = document.getElementById('modal-name');
    const modalDescription = document.getElementById('modal-description');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const modalCounter = document.getElementById('modal-counter');
    
    // VÁLTOZÁS: ÚJ ELEM A VÉGSŐ KÉPHEZ
    const finalImage = document.getElementById('final-image');

    let jelenlegiKartyaIndex = 0;
    let isDragging = false;
    let startX;
    let currentCard;
    let currentGalleryImages = [];
    let currentGalleryIndex = 0;

    // VÁLTOZÁS: IDE ADD MEG A VÉGSŐ KÉP ELÉRÉSI ÚTVONALÁT!
    // Tedd be a "kepek" mappába a képet, és ide írd be a nevét.
    const vegsokepUtvonala = 'kepek/Adi1.jpg'; // Példa: kepek/eskuvoi_kep.jpg

    function init() {
        if (profilok.length > 0) {
            renderCards();
            addEventListeners();
        } else {
            showNoMoreCards();
        }
    }

    function renderCards() {
        cardContainer.innerHTML = '';
        profilok.slice().reverse().forEach((profil, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.backgroundImage = `url('${profil.kepek[0]}')`;
            card.style.zIndex = index;
            card.innerHTML = `<div class="profile-info"><h2>${profil.nev}</h2><p>${profil.bemutatkozas}</p></div><div class="label like">LIKE</div><div class="label nope">NOPE</div>`;
            cardContainer.appendChild(card);
            
            addDragEventListeners(card, profil);
        });
    }

    function addEventListeners() {
        likeBtn.addEventListener('click', () => swipeFromButton('right'));
        dislikeBtn.addEventListener('click', () => swipeFromButton('left'));
        resetBtn.addEventListener('click', () => location.reload());
        closeBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (event) => { if (event.target === modalOverlay) closeModal(); });
        
        nextBtn.addEventListener('click', () => {
            if (currentGalleryIndex < currentGalleryImages.length - 1) {
                currentGalleryIndex++;
                updateGalleryView();
            }
        });
        prevBtn.addEventListener('click', () => {
            if (currentGalleryIndex > 0) {
                currentGalleryIndex--;
                updateGalleryView();
            }
        });
    }

    function addDragEventListeners(card, profil) {
        let offsetX, offsetY;

        const onStart = (e) => {
            if (modalOverlay.style.display === 'flex' || e.target.closest('.action-buttons')) return;
            currentCard = card;
            startX = e.clientX || e.touches[0].clientX;
        };

        const onMove = (e) => {
            if (currentCard !== card) return;
            
            if (startX === undefined) return;
            isDragging = true;
            
            e.preventDefault();
            const clientX = e.clientX || e.touches[0].clientX;
            const deltaX = clientX - startX;
            const rotation = deltaX / 20;
            
            card.style.transition = 'none';
            card.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
            
            if (deltaX > 50) {
                card.classList.add('swiping-right');
                card.classList.remove('swiping-left');
            } else if (deltaX < -50) {
                card.classList.add('swiping-left');
                card.classList.remove('swiping-right');
            } else {
                card.classList.remove('swiping-right', 'swiping-left');
            }
        };

        const onEnd = (e) => {
            if (currentCard !== card || startX === undefined) return;

            const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || startX;
            const deltaX = clientX - startX;
            
            const clickThreshold = 5;

            if (!isDragging && Math.abs(deltaX) < clickThreshold) {
                openModal(profil);
            } else {
                if (Math.abs(deltaX) > 100) {
                    swipe(deltaX > 0 ? 'right' : 'left', card);
                } else {
                    card.style.transition = 'transform 0.3s ease-out';
                    card.style.transform = 'translateX(0) rotate(0deg)';
                    card.classList.remove('swiping-right', 'swiping-left');
                }
            }
            
            isDragging = false;
            startX = undefined;
            currentCard = null;
        };

        card.addEventListener('mousedown', onStart);
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
        card.addEventListener('touchstart', onStart, { passive: true });
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onEnd);
    }
    
    function swipeFromButton(direction) {
        const cards = Array.from(cardContainer.querySelectorAll('.card:not(.swiped)'));
        if (cards.length === 0) return;
        const topCard = cards[cards.length - 1];
        if (direction === 'right') {
            topCard.classList.add('swiping-right');
        } else {
            topCard.classList.add('swiping-left');
        }
        setTimeout(() => {
            swipe(direction, topCard);
        }, 100);
    }

    function swipe(direction, cardToSwipe) {
        if (!cardToSwipe) return;
        cardToSwipe.classList.remove('swiping-left', 'swiping-right');
        cardToSwipe.classList.add(direction);
        cardToSwipe.classList.add('swiped');
        jelenlegiKartyaIndex++;
        setTimeout(() => {
             cardToSwipe.style.display = 'none';
             if (jelenlegiKartyaIndex >= profilok.length) {
                showNoMoreCards();
            }
        }, 300);
    }

    function openModal(profil) {
        currentGalleryImages = profil.kepek;
        currentGalleryIndex = 0;
        updateGalleryView();
        modalName.innerText = profil.nev;
        modalDescription.innerText = profil.reszletesLeiras;
        modalOverlay.style.display = 'flex';
    }

    function closeModal() {
        modalOverlay.style.display = 'none';
    }
    
    function updateGalleryView() {
        modalImg.src = currentGalleryImages[currentGalleryIndex];
        modalCounter.textContent = `${currentGalleryIndex + 1} / ${currentGalleryImages.length}`;
        prevBtn.style.display = currentGalleryIndex > 0 ? 'block' : 'none';
        nextBtn.style.display = currentGalleryIndex < currentGalleryImages.length - 1 ? 'block' : 'none';
        modalCounter.style.display = currentGalleryImages.length > 1 ? 'block' : 'none';
    }
    
    // VÁLTOZÁS: A showNoMoreCards függvény most megjeleníti a végképet
    function showNoMoreCards() {
        cardContainer.style.display = 'none';
        noMoreCardsView.style.display = 'block';
        if (vegsokepUtvonala) {
            finalImage.src = vegsokepUtvonala;
            finalImage.style.display = 'block'; // Megjelenítjük a képet
        }
    }
    
    init();
});