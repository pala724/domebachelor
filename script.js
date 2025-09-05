// script.js (Teljes, befejezett verzió)

document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.querySelector('.cards-container');
    const likeBtn = document.getElementById('like-btn');
    const dislikeBtn = document.getElementById('dislike-btn');
    const reloadBtn = document.getElementById('reload-btn');
    const messagesBtn = document.getElementById('messages-btn');
    const modal = document.getElementById('profile-modal');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const modalImage = document.getElementById('modal-profile-image');
    const modalNameAge = document.getElementById('modal-profile-name-age');
    const modalBio = document.getElementById('modal-profile-bio');
    const prevImgBtn = document.querySelector('.prev-img-btn');
    const nextImgBtn = document.querySelector('.next-img-btn');
    const imageDotsContainer = document.querySelector('.image-dots');
    let currentModalProfile = null;
    let currentImageIndex = 0;

    function showFinalMessage() {
        cardsContainer.innerHTML = `<div class="no-matches-container"><p>Ne ezt a szart nyomkodd, te már megtaláltad a tökéletes párt!</p><i class="fa-solid fa-heart" id="final-heart"></i></div>`;
        document.getElementById('final-heart').addEventListener('click', () => {
            createSingleCard(fianceeProfile, true); 
        });
    }

    /**
     * ÚJ FUNKCIÓ: Megjeleníti a legvégső, "játék vége" üzenetet.
     */
    function showGameOverMessage() {
        cardsContainer.innerHTML = `<div class="no-matches-container"><p>Jelenleg nincs jobb nő a környékeden.</p></div>`;
    }

    function checkIfDeckIsEmpty() {
        setTimeout(() => {
            if (cardsContainer.querySelectorAll('.card').length === 0) {
                // MÓDOSÍTÁS: Ellenőrzi, hogy a "játék vége" állapot aktív-e.
                if (localStorage.getItem('fianceeMatched') === 'true') {
                    showGameOverMessage();
                } else {
                    showFinalMessage();
                }
            }
        }, 50);
    }
    
    function updateMatchCounter() {
        const matches = JSON.parse(localStorage.getItem('matches')) || [];
        let badge = messagesBtn.querySelector('.notification-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'notification-badge';
            messagesBtn.appendChild(badge);
        }
        badge.style.display = matches.length > 0 ? 'block' : 'none';
    }

    function createProfileCards() {
        cardsContainer.innerHTML = ''; 
        
        // MÓDOSÍTÁS: Oldalbetöltéskor is ellenőrzi a "játék vége" állapotot.
        if (localStorage.getItem('fianceeMatched') === 'true') {
            showGameOverMessage();
            return;
        }

        const matches = JSON.parse(localStorage.getItem('matches')) || [];
        const matchedNames = new Set(matches.map(match => match.name));
        const disliked = JSON.parse(localStorage.getItem('dislikedProfiles')) || [];
        const dislikedNames = new Set(disliked.map(p => p.name));
        const profilesToDisplay = profiles.filter(profile => 
            !matchedNames.has(profile.name) && !dislikedNames.has(profile.name)
        );

        if (profilesToDisplay.length === 0) {
            showFinalMessage();
            return;
        }

        profilesToDisplay.slice().reverse().forEach(profile => {
            const originalIndex = profiles.findIndex(p => p.name === profile.name);
            createSingleCard(profile, false, originalIndex);
        });
    }

    function createSingleCard(profile, isSpecial, index = -1) {
        if(isSpecial) cardsContainer.innerHTML = '';
        const card = document.createElement('div');
        card.classList.add('card');
        const imageUrl = typeof profile.images[0] === 'object' ? profile.images[0].src : profile.images[0];
        card.style.backgroundImage = `url(${imageUrl})`;
        card.dataset.profileIndex = isSpecial ? 'special' : index;
        if (isSpecial) {
            card.innerHTML = `<div class="stamp superlike"><i class="fa-solid fa-star"></i> SUPERLIKE</div>`;
        } else {
            card.innerHTML = `<div class="stamp like">LIKE</div><div class="stamp nope">NOPE</div>`;
        }
        card.innerHTML += `<div class="card-info"><h2>${profile.name}, ${profile.age}</h2><p class="tagline">"${profile.tagline}"</p></div>`;
        cardsContainer.appendChild(card);
        addCardEventListeners();
    }

    function addCardEventListeners() {
        const topCard = cardsContainer.querySelector('.card:last-child');
        if (!topCard) return;
        let startPoint = { x: 0, y: 0 };
        let isDragging = false;
        const onDragStart = (e) => { isDragging = true; topCard.classList.add('dragging'); startPoint = { x: e.pageX ?? e.touches[0].pageX, y: e.pageY ?? e.touches[0].pageY }; };
        const onDragMove = (e) => { if (!isDragging) return; const currentPoint = { x: e.pageX ?? e.touches[0].pageX, y: e.pageY ?? e.touches[0].pageY }; const deltaX = currentPoint.x - startPoint.x; const deltaY = currentPoint.y - startPoint.y; const rotate = deltaX * 0.1; e.preventDefault(); topCard.style.transform = `translate(-50%, -50%) translateX(${deltaX}px) translateY(${deltaY}px) rotate(${rotate}deg)`; const opacity = Math.min(Math.abs(deltaX) / (topCard.clientWidth / 2), 1); if (topCard.dataset.profileIndex === 'special') { const superlikeStamp = topCard.querySelector('.superlike'); if(superlikeStamp) superlikeStamp.style.opacity = opacity; } else { const likeStamp = topCard.querySelector('.like'); const nopeStamp = topCard.querySelector('.nope'); if(likeStamp) likeStamp.style.opacity = deltaX > 0 ? opacity : 0; if(nopeStamp) nopeStamp.style.opacity = deltaX < 0 ? opacity : 0; } };
        const onDragEnd = (e) => {
            if (!isDragging) return;
            isDragging = false;
            topCard.classList.remove('dragging');
            topCard.style.transform = '';
            const deltaX = (e.pageX ?? e.changedTouches[0].pageX) - startPoint.x;
            const decisionThreshold = 100;
            if (Math.abs(deltaX) > decisionThreshold) {
                const direction = deltaX > 0 ? 1 : -1;
                const decision = direction === 1 ? 'like' : 'nope';
                const profileIndex = topCard.dataset.profileIndex;
                if (profileIndex === 'special') {
                    setFinalMatch();
                } else {
                    const profile = profiles[parseInt(profileIndex)];
                    if (decision === 'like') saveMatch(profile);
                    else saveDislike(profile);
                }
                topCard.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
                const finalDirection = profileIndex === 'special' ? 1 : direction;
                topCard.style.transform = `translateX(${finalDirection * 500}px) rotate(${finalDirection * 30}deg)`;
                topCard.style.opacity = '0';
                setTimeout(() => { topCard.remove(); checkIfDeckIsEmpty(); addCardEventListeners(); }, 500);
            } else {
                if (topCard.querySelector('.like')) topCard.querySelector('.like').style.opacity = 0;
                if (topCard.querySelector('.nope')) topCard.querySelector('.nope').style.opacity = 0;
                if (topCard.querySelector('.superlike')) topCard.querySelector('.superlike').style.opacity = 0;
            }
        };
        topCard.addEventListener('mousedown', onDragStart); topCard.addEventListener('touchstart', onDragStart, { passive: true }); document.addEventListener('mousemove', onDragMove); document.addEventListener('touchmove', onDragMove, { passive: false }); document.addEventListener('mouseup', onDragEnd); document.addEventListener('touchend', onDragEnd);
        topCard.addEventListener('click', (e) => { const deltaX = (e.pageX ?? 0) - startPoint.x; if (Math.abs(deltaX) < 5) { const profileIndex = topCard.dataset.profileIndex; const profileToShow = profileIndex === 'special' ? fianceeProfile : profiles[parseInt(profileIndex)]; openProfileModal(profileToShow); } });
    }

    function makeDecision(decision) {
        const topCard = document.querySelector('.card:last-child');
        if (!topCard) return;
        const profileIndex = topCard.dataset.profileIndex;
        if (profileIndex === 'special') {
            setFinalMatch();
            const superlikeStamp = topCard.querySelector('.superlike');
            if(superlikeStamp) superlikeStamp.style.opacity = 1;
        } else {
            const profile = profiles[parseInt(profileIndex)];
            if (decision === 'like') saveMatch(profile);
            else saveDislike(profile);
            const stamp = topCard.querySelector(decision === 'like' ? '.like' : '.nope');
            if(stamp) stamp.style.opacity = 1;
        }
        const direction = (profileIndex === 'special' || decision === 'like') ? 1 : -1;
        topCard.style.transition = 'transform 0.7s ease, opacity 0.7s ease';
        topCard.style.transform = `translateX(${direction * 500}px) rotate(${direction * 30}deg)`;
        topCard.style.opacity = '0';
        setTimeout(() => { topCard.remove(); checkIfDeckIsEmpty(); addCardEventListeners(); }, 700);
    }

    function saveMatch(profile) { if (!profile) return; let matches = JSON.parse(localStorage.getItem('matches')) || []; if (!matches.some(m => m.name === profile.name)) { matches.push(profile); localStorage.setItem('matches', JSON.stringify(matches)); updateMatchCounter(); } }
    function saveDislike(profile) { if (!profile) return; let disliked = JSON.parse(localStorage.getItem('dislikedProfiles')) || []; if (!disliked.some(p => p.name === profile.name)) { disliked.push(profile); localStorage.setItem('dislikedProfiles', JSON.stringify(disliked)); } }
    
    /**
     * MÓDOSÍTÁS: Beállítja a "játék vége" állapotot a tárolóban.
     */
    function setFinalMatch() {
        const finalMatch = [fianceeProfile];
        localStorage.setItem('matches', JSON.stringify(finalMatch));
        localStorage.setItem('fianceeMatched', 'true'); // <-- EZ AZ ÚJ ZÁSZLÓ
        updateMatchCounter();
    }

    function openProfileModal(profile) { currentModalProfile = profile; currentImageIndex = 0; updateModalContent(); modal.style.display = 'flex'; }
    function closeModal() { modal.style.display = 'none'; }
    function updateModalContent() { const profile = currentModalProfile; modalNameAge.textContent = `${profile.name}, ${profile.age}`; const currentImage = profile.images[currentImageIndex]; const isObjectFormat = typeof currentImage === 'object'; modalImage.src = isObjectFormat ? currentImage.src : currentImage; modalBio.textContent = isObjectFormat ? currentImage.desc : profile.bio; prevImgBtn.style.display = profile.images.length > 1 ? 'block' : 'none'; nextImgBtn.style.display = profile.images.length > 1 ? 'block' : 'none'; imageDotsContainer.innerHTML = ''; if (profile.images.length > 1) { profile.images.forEach((_, index) => { const dot = document.createElement('div'); dot.classList.add('dot'); if (index === currentImageIndex) dot.classList.add('active'); imageDotsContainer.appendChild(dot); }); } }
    function showNextImage() { currentImageIndex = (currentImageIndex + 1) % currentModalProfile.images.length; updateModalContent(); }
    function showPrevImage() { currentImageIndex = (currentImageIndex - 1 + currentModalProfile.images.length) % currentModalProfile.images.length; updateModalContent(); }

    likeBtn.addEventListener('click', () => makeDecision('like'));
    dislikeBtn.addEventListener('click', () => makeDecision('nope'));
    
    /**
     * MÓDOSÍTÁS: A reset gomb a "játék vége" állapotot is törli.
     */
    reloadBtn.addEventListener('click', () => {
        localStorage.removeItem('matches');
        localStorage.removeItem('dislikedProfiles');
        localStorage.removeItem('fianceeMatched'); // <-- Törli a zászlót is
        createProfileCards();
        updateMatchCounter();
    });

    messagesBtn.addEventListener('click', () => { window.location.href = 'messages.html'; });
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    nextImgBtn.addEventListener('click', showNextImage);
    prevImgBtn.addEventListener('click', showPrevImage);

    createProfileCards();
    updateMatchCounter();
});