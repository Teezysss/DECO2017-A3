const MUSIC_DIR = "./music/";
var audioList = ["G.E.M. 邓紫棋 - 写不完的温柔.mp3",
    "David Guetta,Showtek,Vassy - Bad (Original Mix).mp3", "G.E.M. 邓紫棋 - 瞬间.mp3",
    "花粥,马雨阳 - 盗将行.mp3", "G.E.M. 邓紫棋 - 回忆的沙漏.mp3",
    "李荣浩 - 老街.mp3", "G.E.M. 邓紫棋 - 泡沫.mp3", "你的大表哥曲甲-仙女兽 2.mp3"];
var playTimes = ["3:59", "4:30", "4:06", "3:18", "3:52", "5:19", "4:19", "2:19"];
function getMusicInfo(music) {
    return music.split("-").map((e) => e.trim().split(".mp3")[0])
}
var audio = new Audio(MUSIC_DIR + audioList[0]);
let table = document.querySelector(".table");
for (let i = 0; i < audioList.length; ++i) {
    let ul = document.createElement("ul");
    ul.musicId = i;
    ul.classList.add("music-info");
    let li = document.createElement("li");
    li.textContent = i + 1;
    ul.appendChild(li);
    let info = getMusicInfo(audioList[i])
    // song name
    li = document.createElement("li");
    li.textContent = info[1] ? info[1] : info[0];
    ul.appendChild(li);
    // player
    li = document.createElement("li");
    li.textContent = info[0];
    ul.appendChild(li);
    // paly time
    li = document.createElement("li");
    li.textContent = playTimes[i];
    ul.appendChild(li);
    // Album
    li = document.createElement("li");
    li.textContent = info[0];
    ul.appendChild(li);
    table.appendChild(ul);
}
var timer = 0;
var currentMusicIndex = 0;
function playMusic() {
    audio.play();
    document.querySelector("#play>img").src = "./images/pause.png";
    timer = setInterval(function (ev) {
        let playedProgress = document.querySelector("#played-progress");
        let progress = document.querySelector(".nprogress");
        playedProgress.style.width = audio.currentTime / audio.duration * progress.clientWidth +
            "px";
    }, 200);
    let info = getMusicInfo(audioList[currentMusicIndex]);
    let titles = document.querySelectorAll(".music-title");
    let artist = document.querySelector("#artist");
    artist.textContent = info[0];

    for (let i = 0; i < titles.length; i++) {
        titles[i].textContent = info[1];
    }
}
function pauseMusic() {
    audio.pause();
    document.querySelector("#play>img").src = "./images/play-button.svg";
    clearInterval(timer);
    timer = 0;
}
let musicBtn = document.querySelectorAll(".music-info");
for (let i = 0; i < musicBtn.length; i++) {
    musicBtn[i].onclick = function (e) {
        if (!audio.paused)
            pauseMusic();
        currentMusicIndex = musicBtn[i].musicId
        audio.src = MUSIC_DIR + audioList[currentMusicIndex];
        playMusic();
    };
}
let prevMusic = document.querySelector("#previous");
let nextMusic = document.querySelector("#next");
var playBtn = document.querySelector("a#play");
prevMusic.onclick = function () {
    pauseMusic();
    currentMusicIndex--;
    if (currentMusicIndex == -1)
        currentMusicIndex = audioList.length - 1;
    audio.src = MUSIC_DIR + audioList[currentMusicIndex];
    playMusic();
}
nextMusic.onclick = function () {
    pauseMusic();
    currentMusicIndex = (currentMusicIndex + 1) % audioList.length;
    console.log(currentMusicIndex);
    audio.src = MUSIC_DIR + audioList[currentMusicIndex];
    playMusic();
}
document.querySelector("#forward").onclick = function (ev) {
    audio.currentTime += 15;
}
document.querySelector("#back").onclick = function (ev) {
    audio.currentTime -= 15;
    if (audio.paused)
        audio.play();
}

playBtn.onclick = function (e) {
    if (!audio.paused) {
        pauseMusic();
    }
    else {
        playMusic();
    }

}
audio.onended = function (ev) {
    console.log("music end");
    pauseMusic();
    currentMusicIndex = (currentMusicIndex + 1) % audioList.length;
    audio.src = MUSIC_DIR + audioList[currentMusicIndex];
    playMusic();
}