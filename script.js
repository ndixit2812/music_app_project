console.log('welcome to spotify');

// intialise the variables
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems =Array.from(document.getElementById('songItem'));

let songs = [
    {songName: "Aajaa Mahi", filePath: "songs/1.mp3", coverPath: "Cover/1.jpg"},
    {songName: "Bhai ka birthday", filePath: "songs/2.mp3", coverPath: "Cover/1.jpg"},
    {songName: "Kusu kusu", filePath: "songs/3.mp3", coverPath: "Cover/1.jpg"},
    {songName: "param sundari", filePath: "songs/4.mp3", coverPath: "Cover/1.jpg"},
    {songName: "Raatan-lamaniya", filePath: "songs/5.mp3", coverPath: "Cover/1.jpg"},
    {songName: "Tip-tip-barsa-pani", filePath: "songs/6.mp3", coverPath: "Cover/1.jpg"},
    {songName: "Let me love you", filePath: "songs/7.mp3", coverPath: "Cover/1.jpg"}
]

songItems.forEach((element, index) => {
   element.getElementsByTagName('img')[0].src = songs[index].coverPath;
   element.getElementsByClassName('songName')[0].innerText = songs[index].songName;
 })


// audioElement.play();

// Handle Play/pause click
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
     }
     else{
         audioElement.pause();
         masterPlay.classList.remove('fa-pause-circle');
         masterPlay.classList.add('fa-play-circle');
         gif.style.opacity = 0;
       }
})

// listen to events
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    console.log('progress');
    myprogressBar.value = progress;
})

// matching the song level with the progress Bar
myprogressBar.addEventListener('change', () => {
    audioElement.currentTime = myprogressBar.value * audioElement.duration/100;
})

const makeAllPlays = () => {
   
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(() => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
} 

Array.from(document.getElementsByClassName('songItemPlay')).forEach(() => {
   element.addEventListener('click', (e) => {
       console.log(e.target);
       makeAllPlays();
       songIndex = parseInt(e.target.id);
       e.target.classList.remove('fa-play-circle');
       e.target.classList.add('fa-pause-circle');
       masterSongName.innerText = songs[songIndex].songName;
       audioElement.src = `songs/${songIndex+1}.mp3`;
       audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;   
        masterPlay.classList.remove('fa-play-circle');  
        masterPlay.classList.add('fa-pause-circle'); 
   })
})

document.getElementById('next').addEventListener('click', () => {
    if(songIndex>9){
        songIndex = 0
    }
    else{
        songIndex += 1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
     audioElement.play();
     masterPlay.classList.remove('fa-play-circle');  
     masterPlay.classList.add('fa-pause-circle'); 
})

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
     audioElement.play();
     masterPlay.classList.remove('fa-play-circle');  
     masterPlay.classList.add('fa-pause-circle'); 
})