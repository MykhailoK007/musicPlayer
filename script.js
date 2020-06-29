let clockContainer = document.querySelector('.clock');
let playButton = document.querySelector('.play')
let photo = document.querySelector('.photo');
let name = document.querySelector('.musicTitle')
let tackerStrip = document.querySelector('.trackerStrip');
let author = document.querySelector('.author');
let trackerCircle = document.querySelector('.trackerCircle');
let trackerStrip = document.querySelector('.trackerStrip');
let trackerContainer = document.querySelector('.trackerContainer');
let player = document.querySelector('.player');
let nextButton = document.querySelector('.next');
let previousButton = document.querySelector('.previous');
let musicListContainer = document.querySelector('.musicListContainer');
let timeContainer = document.querySelector('.time');
let musicList = document.querySelector('.musicList');
let showList = document.querySelector('.showList');

let timeLeftToEnd;
let song = new Audio();
let currentSong = 0;

let data = [
    {
        name: 'До мурашек',
        author: 'Tanir',
        url:'./assets/music/Tanir - До мурашек.mp3'
    },
    {
        name:'August',
        author:'Intelligency',
        url:'./assets/music/Intelligency - August Official Lyric Video.mp3'
    },
    {
        name:'Blinding Lights',
        author:'The Weekend',
        url:'./assets/music/The Weeknd - Blinding Lights.mp3'
    },
    {
        name: 'Bad Liar',
        author: 'Imagine Dragons',
        url:'./assets/music/Imagine Dragons - Bad Liar.mp3'
    },
    {
        name: 'Sunday Best',
        author: 'Surfaces',
        url:'./assets/music/Surfaces - Sunday Best.mp3'
    },
    {
        name: 'everything i wanted',
        author: 'Billie Eilish',
        url:'./assets/music/Billie Eilish - everything i wanted.mp3'
    },
    {
        name:'Sunset Lover',
        author:'Petit Biscuit',
        url:'./assets/music/Petit Biscuit - Sunset Lover.mp3'
    }
];
function roundNumberToInteger(number) {
    let reply = (''+number).split('.')[0]
    return (reply<10) ? 0 + reply : reply
}
function getSongTime(){
    let minutes = (song.duration-song.currentTime)/60;
    let seconds = (song.duration - song.currentTime) % 60;

    timeContainer.innerHTML = `${roundNumberToInteger(minutes)} : ${roundNumberToInteger(seconds)}`;
    autoPlay()
}
function updateTime() {
    let time = new Date();
    let hour = time.getHours();
    let minutes = time.getMinutes();

    if(minutes < 10 )   minutes = '0'+ minutes;
    if( hour < 10)  hour = '0'+ hour;

    return  clockContainer.innerHTML =  `${hour} : ${minutes}`;
}
function checkCurrentSong() {
    song.src = data[currentSong].url;
    photo.src = data[currentSong].photo || 'https://fdn.gsmarena.com/imgroot/news/20/04/apple-music-covid-relief/-1220x526/gsmarena_001.jpg';
    name.innerHTML = data[currentSong].name;
    author.innerHTML = data[currentSong].author || 'Unknown Author';
}
function playOrStop() {
    if(song.paused) {
        song.play()
        playButton.innerHTML = 'Pause';
        timeLeftToEnd = setInterval(getSongTime,1000)
    }
    else{

    song.pause()
        playButton.innerHTML = 'Play'
        clearInterval(timeLeftToEnd)
    }
}
function moveAt(e){
    let cursorPositionOnTracker = e.clientX-trackerContainer.getBoundingClientRect().left;
    let cursorPositionAtPercentage = 100 * cursorPositionOnTracker / trackerContainer.getBoundingClientRect().width;
    trackerStrip.style.width =  100 * cursorPositionOnTracker / trackerContainer.getBoundingClientRect().width + '%';
    song.currentTime = cursorPositionAtPercentage * song.duration /100;
}
function addForbiddenClass(element) {
    let previousContent = element.innerHTML;
        element.classList.add('forbidden');
        element.innerHTML = 'x'
        setTimeout(() => {
            element.classList.remove('forbidden')
            element.innerHTML = previousContent
        },2000)
}
function nextSong(){
    if(currentSong + 1 < data.length){
        ++currentSong;
        checkCurrentSong()
        playOrStop()
    }
    else {
     addForbiddenClass(nextButton)
    }
}
function previousSong(){
    if(currentSong - 1 >= 0){
        --currentSong;
        checkCurrentSong()
        playOrStop()
    }
    else {
        addForbiddenClass(previousButton)
    }
}
function autoPlay(){
    (song.currentTime == song.duration)? nextSong():false
}

song.addEventListener('timeupdate',function (){
    let currentPosition = song.currentTime/song.duration ;
    tackerStrip.style.width = currentPosition * 100 + '%';

})

 trackerCircle.onmousedown  = function () {
     player.addEventListener('mousemove',moveAt)
     song.pause()

 }

trackerCircle.ondragstart = function () {
    return false
}

trackerCircle.onmouseup = function (){
    player.removeEventListener('mousemove',moveAt);
    playOrStop()
}

playButton.onclick = playOrStop;
previousButton.onclick = previousSong;
nextButton.onclick = nextSong;
setInterval(() =>{updateTime()},1000) ;

showList.onmouseenter = function (){
    setTimeout(() => {
        musicListContainer.style.display = 'block';
        showList.classList.add('hideList');},0)

}

musicListContainer.onmouseleave = function (e){
    musicListContainer.style.display = 'none';
    showList.classList.remove('hideList');

}

trackerContainer.onclick = function(e){
    moveAt(e)
    playOrStop()
}

checkCurrentSong()
updateTime()


data.map((song, index) => {
    let li = document.createElement('li');

    li.innerHTML = `${song.name} - ${song.author}`
    musicList.append(li)

    li.onclick = function () {
        currentSong = index;
        checkCurrentSong()
        playOrStop()
    }
<<<<<<< HEAD
})
=======
})
playButton.onclick = () => playOrStop(0);
previousButton.onclick = previousSong;
nextButton.onclick = nextSong;
setInterval(() =>{updateTime()},1000);



>>>>>>> ef2b68c... Add events for phone
