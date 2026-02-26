// Aristotle Birthday Page - Emotional Redesign
// Simple, Human, Interactive

// ===== GLOBAL VARIABLES =====
let memoryCards = [];
let flippedCards = [];
let matchedPairs = [];
let canFlip = true;

// Symbols: Liceo, Scroll, Graduation, Thought, Light, Nature
const symbols = ['🏛️', '📜', '🎓', '💭', '🕯️', '🌿']; 

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initMemoryGame();
    
    // Add micro-interactions
    setupMessageInteractions();
});

// ===== MEMORY GAME (SIMPLE) =====
function initMemoryGame() {
    // Only 6 pairs (12 cards) for simplicity
    memoryCards = [...symbols, ...symbols];
    shuffleArray(memoryCards);
    renderMemory();
}

function renderMemory() {
    const game = document.getElementById('memoryGame');
    if (!game) return;
    
    game.innerHTML = '';
    
    memoryCards.forEach((symbol, idx) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = idx;
        
        if (matchedPairs.includes(idx)) {
            card.classList.add('matched');
            card.textContent = symbol;
        } else if (flippedCards.includes(idx)) {
            card.classList.add('flipped');
            card.textContent = symbol;
        } else {
            card.textContent = '?';
        }
        
        card.onclick = () => flipCard(idx);
        game.appendChild(card);
    });
}

function flipCard(idx) {
    if (!canFlip || flippedCards.includes(idx) || matchedPairs.includes(idx)) return;
    if (flippedCards.length >= 2) return;

    flippedCards.push(idx);
    renderMemory();

    if (flippedCards.length === 2) {
        canFlip = false;
        
        const [first, second] = flippedCards;
        if (memoryCards[first] === memoryCards[second]) {
            matchedPairs.push(first, second);
            flippedCards = [];
            canFlip = true;
            renderMemory();
            
            // Check for win condition
            if (matchedPairs.length === memoryCards.length) {
                // Show secret photos on win
                setTimeout(() => {
                    const secretPhotos = document.getElementById('secretPhotos');
                    if (secretPhotos) {
                        secretPhotos.style.display = 'block';
                        secretPhotos.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 500);
            }
        } else {
            setTimeout(() => {
                flippedCards = [];
                canFlip = true;
                renderMemory();
            }, 1000);
        }
    }
}

// ===== CELEBRATION =====
function blowCandles() {
    const candles = document.getElementById('candles');
    const wishText = document.getElementById('wishText');
    
    if (candles.style.opacity === '0') return; // Already blown
    
    candles.style.opacity = '0';
    
    if (wishText) {
        wishText.textContent = "Que la eudaimonía te acompañe siempre.";
        wishText.classList.add('visible');
    }
}

// ===== PRANK MODAL =====
function openPrankModal() {
    const modal = document.getElementById('prankModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Stop scroll
        // Reset state
        document.getElementById('prankForm').style.display = 'block';
        document.getElementById('finalJoke').style.display = 'none';
        document.getElementById('jokeTip').textContent = '';
    }
}

function closePrankModal() {
    const modal = document.getElementById('prankModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scroll
    }
}

function showJokeTip(message) {
    const tip = document.getElementById('jokeTip');
    if (tip) {
        tip.textContent = message;
        tip.style.opacity = '1';
    }
}

function handlePrankPayment(event) {
    event.preventDefault();
    
    // Hide form, show joke
    document.getElementById('prankForm').style.display = 'none';
    const finalJoke = document.getElementById('finalJoke');
    finalJoke.style.display = 'block';
    
    // Play a subtle sound? No, let's keep it simple.
    console.log("Prank payment 'processed'!");
}

// ===== UTILITY =====
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ===== MICRO-INTERACTIONS =====
function setupMessageInteractions() {
    const messages = document.querySelectorAll('.message-card');
    messages.forEach(msg => {
        msg.addEventListener('mouseenter', () => {
            msg.style.borderColor = 'var(--oliva-suave)';
        });
        msg.addEventListener('mouseleave', () => {
            msg.style.borderColor = 'var(--terracota)';
        });
    });
}
