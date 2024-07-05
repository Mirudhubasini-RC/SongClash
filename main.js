const options = [];

alert("Welcome to the game! Tap anywhere to start!");

const staticSongs = [
        { title: 'Shape of You' },
        { title: 'Despacito' },
        { title: 'See You Again' },
        { title: 'Uptown Funk' },
        { title: 'Gangnam Style' },
        { title: 'Closer' },
        { title: 'Thinking Out Loud' },
        { title: 'Dark Horse' },
        { title: 'Shake It Off' },
        { title: 'All About That Bass' },
        { title: 'Happy' },
        { title: 'Blank Space' },
        { title: 'Sorry' },
        { title: 'Sugar' },
        { title: 'Roar' },
        { title: 'Counting Stars' },
        { title: 'Chandelier' },
        { title: 'Love Me Like You Do' },
        { title: 'Waka Waka' },
        { title: 'Havana' },
        { title: 'Sicko Mode' },
        { title: 'Old Town Road' },
        { title: 'Bad Guy' },
        { title: 'Someone You Loved' },
        { title: 'Sunflower' },
        { title: 'Circles' },
        { title: 'Truth Hurts' },
        { title: 'Señorita' },
        { title: 'Dance Monkey' },
        { title: 'Savage Love' },
        { title: 'Watermelon Sugar' },
        { title: 'Stressed Out' },
        { title: 'Believer' },
        { title: 'Rockstar' },
        { title: 'Radioactive' },
        { title: 'Happier' },
        { title: 'Let It Go' },
        { title: 'Can\'t Stop the Feeling!' },
        { title: 'Wrecking Ball' },
        { title: 'Bad Romance' },
        { title: 'Hotline Bling' },
        { title: 'Hello' },
        { title: 'Bohemian Rhapsody' },
        { title: 'Purple Haze' },
        { title: 'What\'s Going On' },
        { title: 'Like a Rolling Stone' },
        { title: 'Superstition' },
        { title: 'Billie Jean' },
        { title: 'Smells Like Teen Spirit' },
        { title: 'Sweet Child o\' Mine' },
        { title: 'Every Breath You Take' },
        { title: 'I Will Always Love You' },
        { title: 'Wish You Were Here' },
        { title: 'Hotel California' },
        { title: 'Boys Don\'t Cry' },
        { title: 'Billie Jean' },
        { title: 'Every Breath You Take' },
        { title: 'Imagine' },
        { title: 'What\'s Going On' },
        { title: 'I Want to Hold Your Hand' },
        { title: 'La Bamba' },
        { title: 'My Generation' },
        { title: 'Over the Rainbow' },
        { title: 'Sweet Caroline' },
        { title: 'I Can\'t Get No Satisfaction' },
        { title: 'Hey Jude' },
        { title: 'Purple Haze' },
        { title: 'Sweet Child o\' Mine' },
        { title: 'Superstition' },
        { title: 'Bohemian Rhapsody' },
        { title: 'Angie' },
        { title: 'Layla' },
        { title: 'Born to Run' },
        { title: 'Rocket Man' },
        { title: 'Take Me to Church' },
        { title: 'Stay With Me' },
        { title: 'Royals' },
        { title: 'Waves' },
        { title: 'Demons' },
        { title: 'Chasing Cars' },
        { title: 'Empire State of Mind' },
        { title: 'Locked Out of Heaven' },
        { title: 'Rolling in the Deep' },
        { title: 'Hotline Bling' },
        { title: 'Sugar' },
        { title: 'Blinding Lights' },
        { title: 'Watermelon Sugar' },
        { title: 'Levitating' },
        { title: 'Save Your Tears' },
        { title: 'Good 4 U' },
        { title: 'Peaches' },
        { title: 'Montero (Call Me By Your Name)' },
        { title: 'Deja Vu' },
        { title: 'Kiss Me More' },
        { title: 'Butter' },
        { title: 'Montero (Call Me By Your Name)' },
        { title: 'Levitating' },
        { title: 'Save Your Tears' },
        { title: 'Good 4 U' },
        { title: 'Peaches' },
        { title: 'Deja Vu' },
        { title: 'Butter' },
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

        const buttons = document.querySelectorAll('.btn');
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

var buttons = document.querySelectorAll('.btn');

function handleClick() {
    playRandomSong();

    // Remove the click event listener after the initial call
    document.body.removeEventListener('click', handleClick);
}

document.body.addEventListener('click', handleClick);
  
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
        //document.getElementById("points").value = points;
        var form = document.getElementById("myForm");
        form.submit();
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
        if (i == 11) {
            document.getElementById("points").value = points;
            var form = document.getElementById("myForm");
            form.submit();
        }        
    });
});