const image = document.getElementById("cover"),
  title = document.getElementById("music-title"),
  artist = document.getElementById("music-artist"),
  currentTimeEl = document.getElementById("current-time"),
  durationEl = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  playerProgress = document.getElementById("player-progress"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  playBtn = document.getElementById("Mulai"),
  background = document.getElementById("bg-img");

const music = new Audio();

const songs = [
  {
    path: "bahan/Berita Kehilangan (feat. Rayssa Dynta).mp3",
    displayName: "Berita Kehilangan",
    cover: "bahan/Feast_ft._Rayssa_Dynta_-_Berita_Kehilangan.jpg",
    artist: ".Feast",
  },
  {
    path: "bahan/Dapur Keluarga.mp3",
    displayName: "Dapur Keluarga",
    cover: "bahan/dapur.jpg",
    artist: ".Feast",
  },
  {
    path: "bahan/Gugatan Rakyat Semesta.mp3",
    cover: "bahan/gugatan.jpeg",
    displayName: "Gugatan Rakyat Semesta",
    artist: ".Feast",
  },
  {
    path: "bahan/Konsekuens.mp3",
    displayName: "Konsekuens",
    cover:
      "https://mmc.tirto.id/image/otf/640x0/2024/05/03/feast---konsekuens-artwork_ratio-16x9.jpeg",
    artist: ".Feast",
  },
  {
    path: "bahan/Kami Belum Tentu.mp3",
    displayName: "Kami Belum tentu",
    cover: "bahan/kami_blum_tau.webp",
    artist: ".Feast",
  },
  {
    path: "bahan/Maju.mp3",
    displayName: "Maju",
    cover: "bahan/Maju.jpg",
    artist: ".Feast",
  },
  {
    path: "bahan/peradaban.mp3",
    displayName: "Peradaban",
    cover: "bahan/Feast_-_Peradaban.jpg",
    artist: ".Feast",
  },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  // Change play button icon
  playBtn.classList.replace("fa-play", "fa-pause");
  // Set button hover title
  playBtn.setAttribute("title", "Berhenti");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  // Change pause button icon
  playBtn.classList.replace("fa-pause", "fa-play");
  // Set button hover title
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = song.cover;
  background.src = song.cover;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) =>
    String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(
    currentTime / 60
  )}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);
