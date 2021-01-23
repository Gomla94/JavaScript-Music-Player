const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress');
const musicDuration = document.getElementById('duration');
const musicTimer = document.getElementById('current-time');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const audioElement = document.getElementById('my-audio');
let isPlaying = false;
let songIndex = 0;

const songs = [
    {
        name: 'David Guetta  Without You ft Usher Lyric video',
        title: 'David Guetta  Without You ft Usher',
        artist: 'David Geutta'
    },
    {
        name: 'Dont-You-Worry-Child-Extended-Mix_part',
        title: 'Dont-You-Worry-Child-Extended-Mix',
        artist: 'Swedish House Mafia'
    },
    {
        name: '01 If I Lose Myself',
        title: 'If I Lose Myself',
        artist: 'One Republic (Alesso Remix)'
    },
    {
        name: '01 Wake Me Up (feat. Aloe Blacc)',
        title: 'Wake Me Up (feat. Aloe Blacc)',
        artist: 'Avicii'
    },
];

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    audioElement.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    audioElement.pause();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playMusic();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playMusic();
}

function loadSong(song) {
    image.src = `img/${song.name}.jpg`;
    title.textContent = song.title;
    artist.textContent = song.artist;
    audioElement.src = `music/${song.name}.mp3`;
    audioElement.onloadedmetadata = function () {
        const songDuration = audioElement.duration;
        const minutesDuration = Math.floor(songDuration / 60);
        let secondsDuration = Math.floor(songDuration % 60);
        if (secondsDuration < 10) {
            secondsDuration = `0${secondsDuration}`;
        }
        musicDuration.textContent = `${minutesDuration}:${secondsDuration}`;
    }
}

function updateProgressBar(event) {
    const { currentTime, duration } = event.srcElement;
    const width = (currentTime / duration) * 100;
    progressBar.style.width = `${width}%`;
    const minutesDuration = Math.floor(duration / 60);
    let secondsDuration = Math.floor(duration % 60);

    if (secondsDuration < 10) {
        secondsDuration = `0${secondsDuration}`
    }

    if (secondsDuration) {
        musicDuration.textContent = `${minutesDuration}:${secondsDuration}`;
    }

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }

    if (currentSeconds) {
        musicTimer.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

function progressBarClickHandler(event) {
    const { clientWidth } = this;
    const currentX = event.offsetX;
    const { duration } = audioElement;

    //the previous line will show me how far i went throuth the song
    const currentTime = (currentX / clientWidth) * duration;
    audioElement.currentTime = currentTime;
    //here when we set the currentTime attribute on the audioElement, the updateProgressBar function will run
    //because it runs as long as the time of the song keeps updating
}

playBtn.addEventListener('click', () => (isPlaying ? pauseMusic() : playMusic()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
progressContainer.addEventListener('click', progressBarClickHandler);
audioElement.addEventListener('timeupdate', updateProgressBar);
audioElement.addEventListener('ended', nextSong);
loadSong(songs[0])

// window.addEventListener('load', loadSong(songs[0]));

// loadSong(songs[0]);
