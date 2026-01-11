// =====================
// GLOBAL STATE
// =====================
let selectedCharacter = null;
let chatMode = "universal"; // "universal" or "character"
let isTyping = false;
let characters = [];

// =====================
// API CONFIG
// =====================
const API_CONFIG = {
    baseUrl: "https://pylord-gptdharma.hf.space",
    endpoints: {
        chat: "/chat",
        characterChat: "/character-chat",
        characters: "/characters"
    },
    timeout: 30000
};

// =====================
// DOM READY
// =====================
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("sacredTablet")) {
        initChat();
    } else {
        initSelection();
    }
});

// =====================
// SELECTION PAGE
// =====================
async function initSelection() {
    const modeButtons = document.querySelectorAll(".mode-btn");
    const characterSelection = document.getElementById("characterSelection");

    // Load characters
    await loadCharacters();

    // Mode selection
    modeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            modeButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            chatMode = btn.dataset.mode;
            
            if (chatMode === "universal") {
                characterSelection.classList.remove("active");
                selectedCharacter = null;
                
                // Navigate directly to chat for universal mode
                localStorage.setItem("chatMode", chatMode);
                window.location.href = "chat.html";
            } else {
                characterSelection.classList.add("active");
            }
        });
    });
}

// =====================
// LOAD CHARACTERS
// =====================
async function loadCharacters() {
    try {
        const response = await fetch('characters.json');
        characters = await response.json();
        renderCharacters();
    } catch (error) {
        console.error('Failed to load characters:', error);
    }
}

// =====================
// RENDER CHARACTERS
// =====================
function renderCharacters() {
    const grid = document.getElementById("charactersGrid");
    if (!grid) return;

    grid.innerHTML = characters.map(char => {
        const imagePath = getCharacterImage(char.name);
        const imageHtml = imagePath 
            ? `<img src="${imagePath}" alt="${char.name}" class="character-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">`
            : '';
        const fallbackEmoji = `<div class="icon-glow ${char.religion.toLowerCase()}-glow" style="${imagePath ? 'display:none;' : ''}">${getCharacterEmoji(char.religion)}</div>`;
        
        return `
            <div class="character-card" data-character="${char.name}">
                <div class="character-icon">
                    ${imageHtml}
                    ${fallbackEmoji}
                </div>
                <h3 class="character-name">${char.name}</h3>
                <p class="character-religion">${char.religion}</p>
                <p class="character-era">${char.era}</p>
                <p class="character-description">${char.tone}</p>
                <button class="card-continue-btn" data-character="${char.name}">
                    <span class="btn-text">Continue</span>
                    <div class="btn-glow"></div>
                </button>
            </div>
        `;
    }).join('');

    // Add click handlers for continue buttons
    grid.querySelectorAll('.card-continue-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click
            const characterName = btn.dataset.character;
            
            // Set character mode and selected character
            chatMode = "character";
            selectedCharacter = characterName;
            
            // Save to localStorage and navigate
            localStorage.setItem("chatMode", chatMode);
            localStorage.setItem("selectedCharacter", selectedCharacter);
            window.location.href = "chat.html";
        });
    });
}

// =====================
// CHARACTER IMAGE HELPER
// =====================
function getCharacterImage(characterName) {
    const imageMap = {
        "Lord Krishna": "assets/Lord Krishna.jpg",
        "Patanjali": "assets/Patanjali.jpg",
        "Rishi Vyasa": "assets/Maharshi Vyasa -Sri Swami Sivananda.jpg",
        "Swami Vivekananda": "assets/Swami Vivekananda _ AI _ Oil Painting style.jpg",
        "Sadhguru Jaggi Vasudev": "assets/Sadguru.jpg",
        "Rumi": "assets/Rumi.jpg",
        "Hazrat Ali": "assets/Hazrat Imam Ali _ Desktop Wallpaper.jpg",
        "Imam Al-Ghazali": "assets/immam al ghazali.jpg",
        "Khwaja Moinuddin Chishti": "assets/Khwaja Moinuddin Chishti.jpg",
        "Jesus Christ": "assets/Jesus Christ.jpg",
        "Mother Teresa": "assets/Mother Teressa.jpg",
        "St. Francis of Assisi": "assets/são Francisco de Assis.jpg",
        "St. Teresa of Avila": "assets/Santa Teresa de Jesús (Ávila).jpg"
    };
    
    return imageMap[characterName] || null;
}

// =====================
// CHARACTER EMOJI HELPER
// =====================
function getCharacterEmoji(religion) {
    const emojiMap = {
        "Hinduism": "🕉️",
        "Islam": "☪️",
        "Islam (Sufi)": "🌙",
        "Christianity": "✝️"
    };
    return emojiMap[religion] || "🙏";
}

// =====================
// CHAT PAGE
// =====================
function initChat() {
    const mode = localStorage.getItem("chatMode") || "universal";
    const character = localStorage.getItem("selectedCharacter");

    if (mode === "character" && !character) {
        window.location.href = "index.html";
        return;
    }

    // Update UI based on mode
    updateChatUI(mode, character);

    const input = document.getElementById("soulInput");
    const sendBtn = document.getElementById("transcendBtn");
    const stream = document.getElementById("messageStream");

    sendBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (mode === "universal") {
            sendUniversalMessage(input, stream);
        } else {
            sendCharacterMessage(character, input, stream);
        }
    });

    input.addEventListener("keydown", e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (mode === "universal") {
                sendUniversalMessage(input, stream);
            } else {
                sendCharacterMessage(character, input, stream);
            }
        }
    });
}

// =====================
// UPDATE CHAT UI
// =====================
function updateChatUI(mode, character) {
    const selectedBookEl = document.getElementById("selectedBook");
    const modeTextEl = document.getElementById("modeText");
    const welcomeMessage = document.querySelector('.divine-message .message-essence p');
    
    if (mode === "universal") {
        selectedBookEl.textContent = "Universal Wisdom";
        modeTextEl.textContent = "Guided by";
        if (welcomeMessage) {
            welcomeMessage.textContent = `Welcome, seeker. I am here to share wisdom from all sacred texts - the Bhagavad Gita, Quran, and Bible. What guidance do you seek on your spiritual journey?`;
        }
        // Remove any character image from header
        const existingImage = document.querySelector('.character-header-image');
        if (existingImage) existingImage.remove();
    } else {
        selectedBookEl.textContent = character;
        modeTextEl.textContent = "Seeking wisdom from";
        if (welcomeMessage) {
            welcomeMessage.textContent = `Welcome, dear soul. I am ${character}, here to offer you guidance from my spiritual understanding. What weighs upon your heart today?`;
        }
        
        // Add character image to header
        const imagePath = getCharacterImage(character);
        if (imagePath) {
            const existingImage = document.querySelector('.character-header-image');
            if (existingImage) existingImage.remove();
            
            const headerImage = document.createElement('img');
            headerImage.src = imagePath;
            headerImage.alt = character;
            headerImage.className = 'character-header-image';
            headerImage.onerror = function() { this.style.display = 'none'; };
            
            const divineHeader = document.querySelector('.divine-header');
            const sacredTitle = document.querySelector('.sacred-title');
            divineHeader.insertBefore(headerImage, sacredTitle);
        }
    }
}

// =====================
// SEND UNIVERSAL MESSAGE
// =====================
async function sendUniversalMessage(input, stream) {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "seeker", stream);
    input.value = "";

    const thinking = addMessage("Searching all sacred scriptures…", "divine", stream, true);

    try {
        const response = await callRestAPI("chat", { message: text });
        thinking.remove();
        addUniversalResponse(response, stream);
    } catch (err) {
        thinking.remove();
        addMessage("The divine connection is unavailable right now.", "divine", stream);
        console.error(err);
    }
}

// =====================
// SEND CHARACTER MESSAGE
// =====================
async function sendCharacterMessage(character, input, stream) {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "seeker", stream);
    input.value = "";

    const thinking = addMessage(`${character} is contemplating your question…`, "divine", stream, true);

    try {
        const response = await callRestAPI("character-chat", { 
            character_name: character, 
            query: text 
        });
        thinking.remove();
        addCharacterResponse(response, stream);
    } catch (err) {
        thinking.remove();
        addMessage("The spiritual guide is unavailable right now.", "divine", stream);
        console.error(err);
    }
}

// =====================
// REST API CALL
// =====================
async function callRestAPI(endpoint, payload) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    try {
        const response = await fetch(`${API_CONFIG.baseUrl}/${endpoint}`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(payload),
            signal: controller.signal
        });

        clearTimeout(timer);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        clearTimeout(timer);
        console.error('REST API Error:', error);
        throw error;
    }
}

// =====================
// RESPONSE HANDLERS
// =====================
function addUniversalResponse(data, stream) {
    const div = document.createElement("div");
    div.className = "message divine-message";

    const messageEssence = document.createElement("div");
    messageEssence.className = "message-essence";
    
    const p = document.createElement("p");
    p.textContent = data.reply;
    messageEssence.appendChild(p);

    // Add sources if available
    if (data.sources && Object.keys(data.sources).length > 0) {
        const sourcesDiv = document.createElement("div");
        sourcesDiv.className = "sacred-sources";
        
        const sourcesLabel = document.createElement("div");
        sourcesLabel.className = "sources-label";
        sourcesLabel.textContent = "Sources:";
        sourcesDiv.appendChild(sourcesLabel);
        
        const sourcesList = document.createElement("div");
        sourcesList.className = "sources-list";
        
        Object.entries(data.sources).forEach(([book, references]) => {
            if (references && references.length > 0) {
                references.forEach(ref => {
                    const sourceRef = document.createElement("span");
                    sourceRef.className = "source-reference";
                    sourceRef.textContent = `${book.toUpperCase()}: ${ref}`;
                    sourcesList.appendChild(sourceRef);
                });
            }
        });
        
        sourcesDiv.appendChild(sourcesList);
        messageEssence.appendChild(sourcesDiv);
    }
    
    div.appendChild(messageEssence);
    
    const timestamp = document.createElement("div");
    timestamp.className = "message-timestamp";
    timestamp.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    div.appendChild(timestamp);

    stream.appendChild(div);
    stream.scrollTop = stream.scrollHeight;
}

function addCharacterResponse(data, stream) {
    const div = document.createElement("div");
    div.className = "message divine-message";

    const messageEssence = document.createElement("div");
    messageEssence.className = "message-essence";
    
    const p = document.createElement("p");
    p.textContent = data.reply;
    messageEssence.appendChild(p);

    // Add sources if available
    if (data.sources && Object.keys(data.sources).length > 0) {
        const sourcesDiv = document.createElement("div");
        sourcesDiv.className = "sacred-sources";
        
        const sourcesLabel = document.createElement("div");
        sourcesLabel.className = "sources-label";
        sourcesLabel.textContent = "Inspired by:";
        sourcesDiv.appendChild(sourcesLabel);
        
        const sourcesList = document.createElement("div");
        sourcesList.className = "sources-list";
        
        Object.entries(data.sources).forEach(([book, references]) => {
            if (references && references.length > 0) {
                references.forEach(ref => {
                    const sourceRef = document.createElement("span");
                    sourceRef.className = "source-reference";
                    sourceRef.textContent = `${book.toUpperCase()}: ${ref}`;
                    sourcesList.appendChild(sourceRef);
                });
            }
        });
        
        sourcesDiv.appendChild(sourcesList);
        messageEssence.appendChild(sourcesDiv);
    }
    
    div.appendChild(messageEssence);
    
    const timestamp = document.createElement("div");
    timestamp.className = "message-timestamp";
    timestamp.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    div.appendChild(timestamp);

    stream.appendChild(div);
    stream.scrollTop = stream.scrollHeight;
}

// =====================
// UI HELPERS
// =====================
function addMessage(text, sender, stream, loading = false) {
    const div = document.createElement("div");
    div.className = `message ${sender}-message`;
    if (loading) {
        div.classList.add("loading");
        div.classList.add("contemplating-message");
    }

    const messageEssence = document.createElement("div");
    messageEssence.className = "message-essence";
    
    const p = document.createElement("p");
    p.textContent = text;
    messageEssence.appendChild(p);
    
    div.appendChild(messageEssence);
    
    if (!loading) {
        const timestamp = document.createElement("div");
        timestamp.className = "message-timestamp";
        timestamp.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        div.appendChild(timestamp);
    }

    stream.appendChild(div);
    stream.scrollTop = stream.scrollHeight;
    return div;
}