const options = [];

const staticSongs = [
    { title: 'Song A', artist: { name: 'Artist A' }, preview: 'URL_A' },
    { title: 'Song B', artist: { name: 'Artist B' }, preview: 'URL_B' },
    { title: 'Song C', artist: { name: 'Artist C' }, preview: 'URL_C' },
    { title: 'Song D', artist: { name: 'Artist D' }, preview: 'URL_D' },
    { title: 'Song E', artist: { name: 'Artist E' }, preview: 'URL_E' },
];
const timerDuration = 10; // Timer duration in seconds
let timer;
let timerValue;

const numberOfRounds = 20; // Change this to the desired number of rounds

function playMultipleRounds() {
    for (let round = 0; round < numberOfRounds; round++) {
        playRandomSong();
    }
}

let i=1;
let correctAnswerIndex;
let points = 0.0;
let streaks = 0;

function updatePointsDisplay() {
    // Update the HTML element displaying points
    const pointsDisplay = document.getElementById('pointsDisplay');
    pointsDisplay.textContent = points.toFixed(1); // Assuming you want one decimal place

    const streaksDisplay = document.getElementById('streaksDisplay');
    streaksDisplay.textContent = streaks; // Assuming you want one decimal place

    const songDisplay = document.getElementById('song');
    songDisplay.textContent = i; // Assuming you want one decimal place
}

async function playRandomSong() {
    var x = document.getElementById("startbutton");
    if (x.style.display === "none") {
        x.style.display = "none";
    } else {
        x.style.display = "none";
  }
    try {
        const apiUrl = 'http://localhost:4000/randomSong';
        const response = await fetch(apiUrl);
        const data = await response.json();

        const randomSong = data;

        const songDetailsButton = document.querySelector('.song-details-button');
        songDetailsButton.innerHTML = `<strong>Now Playing:</strong> ${randomSong.title} by ${randomSong.artist.name}`;
        
        correctAnswerIndex = Math.floor(Math.random() * 5);

        for (let i = 0; i < 5; i++) {
                options[i] = getRandomStaticSongTitle();
        }

        shuffleArray(options);
        options[correctAnswerIndex] = randomSong.title;

        const buttons = document.querySelectorAll('.song-details-button');
        buttons.forEach((button, index) => {
            button.textContent = options[index];
            button.name = options[index];
        });

        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.src = randomSong.preview;
        audioPlayer.play();

        document.getElementById('resultMessage').textContent = '';
    } catch (error) {
        console.error('Error fetching and playing the song:', error);
    }
    startTimer();
}

function getRandomStaticSongTitle() {
    const randomIndex = Math.floor(Math.random() * staticSongs.length);
    return staticSongs[randomIndex].title;
}

function generateWrongAnswer(correctAnswer) {
    return correctAnswer + Math.floor(Math.random() * 10);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

var buttons = document.querySelectorAll('.song-details-button');
  
  function startTimer() {
    timerValue = timerDuration;
    updateTimerDisplay();
    timer = setInterval(function () {
        timerValue--;
        updateTimerDisplay();

        if (timerValue === 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.textContent = timerValue;
}

function handleTimeout() {
    streaks = 0;
    points -= 5;
    i++;
    if(i == 11){
        location.replace("https://www.w3schools.com");
    }
    updatePointsDisplay();
    playRandomSong();
}

function handleCorrectAnswer(responseTime) {
    clearInterval(timer);
    const maxPoints = 10;
    const maxResponseTime = 5; // Maximum time to get full points (in seconds)
    const timeBonus = Math.max(maxPoints - (responseTime * maxPoints) / maxResponseTime, 1);

    points += timeBonus;
    streaks++;
    updatePointsDisplay();
    playRandomSong();
}


buttons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        var clickedButton = event.target;

        if (clickedButton.name === options[correctAnswerIndex]) {
            const responseTime = timerDuration - timerValue;
            handleCorrectAnswer(responseTime);
        } else {
            clearInterval(timer);
            streaks = 0;
            points -= 5;
            updatePointsDisplay();
            playRandomSong();
        }
        i++;
        if(i == 11){
            location.replace("https://www.w3schools.com");
        }
    });
});