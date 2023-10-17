console.log("Welcome to Spotify!");
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {
        songName: "Arerey Manasa",
        filePath: "Arerey.mp3",
        coverPath: "Arerey.png"
    },
    {
        songName: "Hello Hello",
        filePath: "Hello.mp3",
        coverPath: "Hello.png"
    },
    {
        songName: "Padi Padi Leche Manasu",
        filePath: "Padi.mp3",
        coverPath: "Padi.png"
    },
    {
        songName: "Pilla Nuvvu Leni Jeevitham",
        filePath: "Pnlj.mp3",
        coverPath: "Pnlj.png"
    },
    {
        songName: "Inkem Inkem Kaavale",
        filePath: "Inkem.mp3",
        coverPath: "Inkem.png"
    },
    {
        songName: "Unnatundi Gunde",
        filePath: "U G.mp3",
        coverPath: "U G.png"
    },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

function makeAllPlays() {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    });
}

function updatePlayButton() {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    } else {
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
}


function updateAllSongItemButtons() {
    const playButtons = document.querySelectorAll('.songItemPlay');
    const pauseButtons = document.querySelectorAll('.songItemPause');

    // Hide all play buttons and show all pause buttons
    playButtons.forEach(button => {
        button.style.display = 'inline-block';
    });

    pauseButtons.forEach(button => {
        button.style.display = 'none';
    });

    // If there's a currently playing song, update its button
    if (!audioElement.paused && audioElement.currentTime > 0) {
        playButtons[songIndex].style.display = 'none';
        pauseButtons[songIndex].style.display = 'inline-block';
    }
}



// Event listener for the play/pause button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        // Add a console.log statement here
        console.log("Playing:", songs[songIndex].songName);
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        
        masterSongName.innerText = songs[songIndex].songName;
    } else {
        // Add a console.log statement here
        console.log("Pausing:", songs[songIndex].songName);
        gif.style.opacity = 0;
        audioElement.pause();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    updateAllSongItemButtons();
    updatePlayButton();
});


Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        gif.style.opacity = 1;
        const songIndex = parseInt(e.target.getAttribute('id'));

        if (songIndex >= 0 && songIndex < songs.length) {
            masterSongName.innerText = songs[songIndex].songName;
            makeAllPlays();

            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.src = songs[songIndex].filePath;
                audioElement.currentTime = 0;
                audioElement.play();
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
            } else {
                audioElement.pause();
                gif.style.opacity = 0;
                e.target.classList.remove('fa-pause-circle');
                e.target.classList.add('fa-play-circle');
            }
            updateAllSongItemButtons();
            updatePlayButton();
        }
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updateAllSongItemButtons();
    updatePlayButton();
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updateAllSongItemButtons();
    updatePlayButton();
});

audioElement.addEventListener('timeupdate', () => {
    progress = myProgressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});
