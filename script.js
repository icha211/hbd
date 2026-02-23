const output = document.getElementById('output');
const userInput = document.getElementById('userInput');
const heart = document.getElementById('heart');

let step = 0;
let birthdayAnswer = "";
let anniversaryAnswer = "";

const messages = [
    "Haii sayang! Before you enter, I need to check something... ",
    "First, do you know when is my one born is? <span class=\"shadowy\">(DD/MM/YYYY)</span>",
    "Okay... but are you REALLY my boyfriend? When was our first meeting? <span class=\"shadowy\">(DD/MM/YYYY)</span>",
    "Identity Verification in progress... Please wait. "
];

// Helper to add local GIF
async function addGif(filename) {
    const img = document.createElement('img');
    img.src = filename;
    img.className = 'terminal-gif';
    img.style.maxWidth = '150px';
    img.style.borderRadius = '12px';
    img.style.margin = '10px auto';
    img.style.display = 'block';
    
    output.appendChild(img);
    output.scrollTop = output.scrollHeight;
    await new Promise(resolve => setTimeout(resolve, 800));
}

// Helper for typewriter effect
async function typeMessage(text, className = '') {
    const p = document.createElement('p');
    if (className) p.className = className;
    output.appendChild(p);

    if (text.includes('<span')) {
        const [mainText, spanHtml] = text.split('<span');
        const spanText = '<span' + spanHtml;
        for (let i = 0; i < mainText.length; i++) {
            p.textContent += mainText[i];
            await new Promise(resolve => setTimeout(resolve, 30));
        }
        p.innerHTML = mainText + spanText;
    } else {
        for (let i = 0; i < text.length; i++) {
            p.textContent += text[i];
            await new Promise(resolve => setTimeout(resolve, 30));
        }
    }
    output.scrollTop = output.scrollHeight;
}

window.onload = async () => {
    await typeMessage(messages[0]);
    await typeMessage(messages[1]);
};

userInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        const value = userInput.value.trim();
        userInput.value = ""; 
        
        if (!value) return; 
        
        const prevInput = document.createElement('p');
        prevInput.textContent = `${value}`;
        prevInput.style.fontStyle = 'italic';
        prevInput.style.color = '#888';
        output.appendChild(prevInput);
        
        if (step === 0) {
            // First check: Birthday
            if (value === "24/02/2003") {
                birthdayAnswer = value;
                step++;
                heart.textContent = "🌸";
                heart.style.transform = "scale(1.2)";

                // Use Local GIF
                await addGif('bubu-dudu-sseeyall.gif');
                await typeMessage("Haii sayangkuu! Today has become more special because you were born into this world... 💖");
                await typeMessage(messages[2]);
            } else {
                heart.textContent = "";
                await typeMessage("Wrong! I guess you're not my one... Try again, sayang! ", 'error');
                await typeMessage("\n" + messages[1]);
            }
        } 
        else if (step === 1) {
            // Second check: Anniversary / First meeting
            if (value === "07/11/2024") { 
                anniversaryAnswer = value;
                step++;
                heart.textContent = "💝"; 
                heart.style.transform = "scale(1.4)";
                await typeMessage(messages[3]);
                await verifyAccessLocally();
            } else {
                heart.textContent = "🥺";
                await typeMessage("ERROR: Identity unconfirmed. Are you sure you're my one? 🤨", 'error');
                await typeMessage("Wrong! I guess you're not my one... Try again, sayang! 😋", 'error');
                step = 0;
                setTimeout(async () => {
                    heart.textContent = "🤍";
                    await typeMessage("\n" + messages[1]); 
                }, 1500);
            }
        }
    }
});

async function verifyAccessLocally() {
    // Artificial delay to mimic verification
    await new Promise(resolve => setTimeout(resolve, 1500));

    heart.textContent = "💖";
    heart.style.transform = "scale(1.6)";
    await typeMessage("ACCESS GRANTED! Identity Confirmed. Welcome my one... 💖✨", 'success');
    
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffc0cb', '#daedff', '#ffffff'] 
    });
    
    setTimeout(() => {
        window.location.href = 'surprise.html';
    }, 3000);
}

// Remove the old verifyWithServer function since it won't work on GitHub Pages
/*
async function verifyWithServer() {
...
*/
