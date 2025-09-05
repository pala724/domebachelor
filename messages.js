// messages.js (Végleges, bővített verzió)

document.addEventListener('DOMContentLoaded', () => {
    // Nézetek és gombok
    const matchListView = document.getElementById('match-list-view');
    const conversationView = document.getElementById('conversation-view');
    const backToListBtn = document.getElementById('back-to-list-btn');

    // Lista elemei
    const matchesListContainer = document.getElementById('matches-list');

    // Beszélgetés elemei
    const convoAvatar = document.getElementById('convo-avatar');
    const convoName = document.getElementById('convo-name');
    const chatContainer = document.getElementById('chat-container');

    // =================================================================================
    // ÁTMÁSOLT RÉSZ A SCRIPT.JS-BŐL: Modális ablak elemei és változói
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
    // =================================================================================

    // Töltsük be a mentett meccseket
    const matches = JSON.parse(localStorage.getItem('matches')) || [];

    // --- NÉZETEK KÖZTI NAVIGÁCIÓ ---

    function showConversationView() {
        matchListView.style.display = 'none';
        conversationView.style.display = 'flex';
    }

    function showMatchListView() {
        conversationView.style.display = 'none';
        matchListView.style.display = 'block';
    }
    
    backToListBtn.addEventListener('click', showMatchListView);

    // --- ÜZENETEK LÉTREHOZÁSA ---

    function openConversation(profile) {
        // Fejléc feltöltése az adatokkal
        const avatarSrc = typeof profile.images[0] === 'object' ? profile.images[0].src : profile.images[0];
        convoAvatar.src = avatarSrc;
        convoName.textContent = profile.name;

        // MÓDOSÍTÁS: Eseményfigyelő hozzáadása az avatarhoz a profil megnyitásához
        convoAvatar.onclick = () => openProfileModal(profile);

        // Korábbi üzenetek törlése
        chatContainer.innerHTML = '';

        // Üzenetek generálása profil alapján
        const isFiancee = typeof profile.images[0] === 'object';
        if (isFiancee) {
            profile.images.forEach((imgObject, index) => {
                const bubble = document.createElement('div');
                bubble.className = 'chat-bubble';
                bubble.textContent = imgObject.desc;
                bubble.style.animationDelay = `${index * 0.2}s`;
                chatContainer.appendChild(bubble);
            });
        } else {
            const messages = [`Szia! ${profile.name} vagyok. :)`, "Örülök, hogy match-eltünk!", "Hogy vagy?"];
            messages.forEach((msg, index) => {
                const bubble = document.createElement('div');
                bubble.className = 'chat-bubble';
                bubble.textContent = msg;
                bubble.style.animationDelay = `${index * 0.2}s`;
                chatContainer.appendChild(bubble);
            });
        }
        
        showConversationView();
    }

    // --- MECCSEK LISTÁJÁNAK FELÉPÍTÉSE ---

    if (matches.length === 0) {
        matchesListContainer.innerHTML = '<p class="no-matches">Még nincsenek matcheid. Húzz jobbra valakit!</p>';
    } else {
        matchesListContainer.innerHTML = '';
        matches.forEach(profile => {
            const matchElement = document.createElement('div');
            matchElement.classList.add('match-item');

            const isFiancee = typeof profile.images[0] === 'object';
            const avatarSrc = isFiancee ? profile.images[0].src : profile.images[0];
            const lastMessage = isFiancee ? profile.images[profile.images.length-1].desc : "Kattints ide az üzenetért...";

            matchElement.innerHTML = `<img src="${avatarSrc}" alt="${profile.name}" class="avatar"><div class="match-details"><h3>${profile.name}</h3><p>${lastMessage}</p></div>`;
            matchElement.addEventListener('click', () => openConversation(profile));
            matchesListContainer.appendChild(matchElement);
        });
    }

    // =================================================================================
    // ÁTMÁSOLT RÉSZ A SCRIPT.JS-BŐL: Modális ablak logikája
    function openProfileModal(profile) {
        currentModalProfile = profile;
        currentImageIndex = 0;
        updateModalContent();
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function updateModalContent() {
        const profile = currentModalProfile;
        modalNameAge.textContent = `${profile.name}, ${profile.age}`;
        const currentImage = profile.images[currentImageIndex];
        const isObjectFormat = typeof currentImage === 'object';
        modalImage.src = isObjectFormat ? currentImage.src : currentImage;
        modalBio.textContent = isObjectFormat ? currentImage.desc : profile.bio;
        prevImgBtn.style.display = profile.images.length > 1 ? 'block' : 'none';
        nextImgBtn.style.display = profile.images.length > 1 ? 'block' : 'none';
        imageDotsContainer.innerHTML = '';
        if (profile.images.length > 1) {
            profile.images.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === currentImageIndex) dot.classList.add('active');
                imageDotsContainer.appendChild(dot);
            });
        }
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % currentModalProfile.images.length;
        updateModalContent();
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + currentModalProfile.images.length) % currentModalProfile.images.length;
        updateModalContent();
    }

    // Átmásolt eseményfigyelők
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    nextImgBtn.addEventListener('click', showNextImage);
    prevImgBtn.addEventListener('click', showPrevImage);
    // =================================================================================
});