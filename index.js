const btn = document.querySelector('.speach');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function greeting() {
    var day = new Date();
    var hour = day.getHours();

    if (hour > 0 && hour < 12) {
        speak("Good Morning Boss");
    } else if (hour >= 12 && hour <= 17) {
        speak("Good Afternoon Boss");
    } else {
        speak("Good Evening Boss");
    }
}

window.addEventListener('load', () => {
    speak("Initializing...");
    greeting();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentindex = event.resultIndex;
    const transcript = event.results[currentindex][0].transcript;
    console.log("Transcript:", transcript); // Debug log
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    speak("listening");
    recognition.start();
});

function takeCommand(message) {
    console.log("Command received:", message); // Debug log
    if (message.includes("date") === false && message.includes("time") === false) {
        if (message.includes('open')) {
            const query = message.replace('open', '').trim();
            if (query !== '') {
                speak(`opening ${query}`);
                console.log("opening:", query); // Debug log
                setTimeout(() => {
                    window.open(`https://${query}.com`, "_blank");
                }, 500);
            }
            else (speak(`sorry i cant open it`))
        }
        else if (message.includes('what is' || message.includes('what was ') || message.includes('what were ') || message.includes(' what are') || message.includes('who is ') || message.includes('who was') || message.includes('who are ') || message.includes('who were'))) {
            const search = message.replace(/\s/g, '+');
            speak(`searching for ${message}`);
            console.log("searching for :", `${message}`); // Debug log
            setTimeout(() => {
                window.open(`https://www.google.com/search?q=${search}`, "_blank");
            }, 500);

        }

       
    }
    
    else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" })
        const finalText = date;
        speak(finalText);
    }
    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speak(finalText);
    }
    else{
        speak("i am unable to do as you command");
    }
}