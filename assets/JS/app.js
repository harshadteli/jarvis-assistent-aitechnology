// DOM Elements
const btn = document.getElementById('talk-btn');
const transcriptArea = document.getElementById('transcript');
const audio = document.getElementById('audio');
const batteryLevel = document.getElementById('battery-level');
const batteryStatus = document.getElementById('battery-status');
const weatherTemp = document.getElementById('weather-temp');
const weatherDesc = document.getElementById('weather-desc');
const newsContent = document.getElementById('news-content');
const greetingText = document.getElementById('assistant-greeting');

// Config
const OWNER_NAME = "Boss";
const ASSISTANT_NAME = "JARVIS";

// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    transcriptArea.textContent = transcript;
    handleCommand(transcript.toLowerCase());
};

recognition.onstart = () => {
    transcriptArea.textContent = "Listening...";
    btn.style.boxShadow = "0 0 40px var(--accent)";
};

recognition.onend = () => {
    btn.style.boxShadow = "0 0 20px var(--primary-glow)";
};

btn.addEventListener('click', () => {
    recognition.start();
});

// Initialization
window.addEventListener("load", () => {
    setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";
        speak(`System online. Greetings, ${OWNER_NAME}.`);
        updateDateTime();
        initWidgets();
    }, 1500);
});

// --- Core Helper Functions ---

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

function updateDateTime() {
    const now = new Date();
    document.getElementById("CurDate").innerText = now.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    document.getElementById("CurTime").innerText = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    setTimeout(updateDateTime, 60000);
}

// --- Widget Logic ---

async function initWidgets() {
    initBattery();
    initWeather();
    initNews();
}

function initBattery() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            const updateBattery = () => {
                const level = Math.round(battery.level * 100);
                batteryLevel.textContent = `${level}%`;
                batteryStatus.textContent = battery.charging ? "Charging" : "Discharging";
                if (level < 20 && !battery.charging) {
                    speak("System warning: Power levels are critical.");
                }
            };
            updateBattery();
            battery.addEventListener('levelchange', updateBattery);
            battery.addEventListener('chargingchange', updateBattery);
        });
    } else {
        batteryLevel.textContent = "N/A";
    }
}

async function initWeather() {
    // Simulated weather for demo purposes, could use OpenWeatherMap API if key available
    const temps = [22, 24, 21, 26, 25];
    const desc = ["Clear Skies", "Partly Cloudy", "High Humidity", "Optimal"];
    weatherTemp.textContent = `${temps[Math.floor(Math.random() * temps.length)]}°C`;
    weatherDesc.textContent = desc[Math.floor(Math.random() * desc.length)];
}

async function initNews() {
    const headlines = [
        "Quantum computing breakthrough announced.",
        "SpaceX mission reaches Mars orbit.",
        "New AI model passes Turing test 2.0.",
        "Global energy grid switches to fusion."
    ];
    newsContent.innerHTML = headlines.map(h => `<p>• ${h}</p>`).join('');
}

// --- Command Handling ---

function handleCommand(message) {
    if (message.includes('hello') || message.includes('hi')) {
        speak(`Hello ${OWNER_NAME}, how can I assist you today?`);
    } 
    else if (message.includes('how are you')) {
        speak("All systems functional. I am operating at peak efficiency.");
    } 
    else if (message.includes('time')) {
        const time = new Date().toLocaleTimeString();
        speak(`The current time is ${time}`);
    } 
    else if (message.includes('date')) {
        const date = new Date().toDateString();
        speak(`Today's date is ${date}`);
    } 
    else if (message.includes('battery') || message.includes('power')) {
        navigator.getBattery().then(battery => {
            speak(`Current power level is ${Math.round(battery.level * 100)} percent.`);
        });
    }
    else if (message.includes('open google')) {
        window.open("https://google.com", "_blank");
        speak("Opening Google, Boss.");
    } 
    else if (message.includes('open youtube')) {
        window.open("https://youtube.com", "_blank");
        speak("Accessing YouTube.");
    } 
    else if (message.includes('open instagram')) {
        window.open("https://instagram.com", "_blank");
        speak("Opening Instagram.");
    }
    else if (message.includes('what is') || message.includes('who is') || message.includes('search for')) {
        const query = message.replace("what is", "").replace("who is", "").replace("search for", "").trim();
        window.open(`https://google.com/search?q=${query}`, "_blank");
        speak(`Searching for ${query} on the web.`);
    }
    else if (message.includes('news')) {
        speak("Displaying the latest global intelligence headlines.");
        initNews();
    }
    else if (message.includes('weather')) {
        speak(`Currently it is ${weatherTemp.textContent} with ${weatherDesc.textContent}.`);
    }
    else if (message.includes('identity') || message.includes('who are you')) {
        speak("I am J.A.R.V.I.S., a Virtual Artificial Intelligence System designed by Harshad Teli.");
    }
    else if (message.includes('play music')) {
        speak("Initiating audio playback.");
        // Audio logic could be expanded here
    }
    else {
        speak("I found some information for your query on Google.");
        window.open(`https://google.com/search?q=${message}`, "_blank");
    }
}


  
