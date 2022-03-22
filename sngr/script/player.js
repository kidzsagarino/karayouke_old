import sngr from './sngr.me.js';

window.onstorage = function(){

    const songs = JSON.parse(window.localStorage.getItem('KaraokeList'));
    displayList();

    var hasIFrame = document.querySelector('iframe');

    if(!hasIFrame){
        play(songs);
    }

    updateSongStatus(songs);

}


window.addEventListener('load', function(){

    displayList();

    const songs = JSON.parse(window.localStorage.getItem('KaraokeList')) || [];

    if(songs){
        play(songs)
    }
    
  
})


function displayList(){

    document.querySelector('.song-list').innerHTML = '';
    document.querySelector('.song-list').appendChild(sngr.displayReservedSongs());
    createCancel();
}

function play(songs){
   
    if(songs.length === 0)
    {
        document.querySelector('.player-con').innerHTML = '<p>Player cannot play any song.</p>';

        updateSongStatus(songs);
        return;

    }

    document.querySelector('.player-con').innerHTML = `<iframe src="https://www.youtube.com/embed/${songs[0].id}?autoplay=1&mute=0&start=0&controls=0" allow="autoplay"></iframe>`;
    
   
    updateSongStatus(songs);
    
    setTimeout(nextSong, convertDuration(songs[0].duration));
    
 
    
}

function nextSong(){
    let songs = JSON.parse(window.localStorage.getItem('KaraokeList'));
    songs.splice(0, 1);

    window.localStorage.setItem('KaraokeList', JSON.stringify(songs));

    displayList();

 
    play(songs);
}

function convertDuration(duration){


    return parseInt(eval(duration.replace('PT', '').replace('H', '*3600+').replace('M', '*60+').replace('S', '+').slice(0, -1))) * 1000;


}

function updateSongStatus(songs){

    document.querySelector('.currentSong').textContent = songs[0] ? songs[0].title : 'Current Song is empty.';
    document.querySelector('.nextSong').textContent = songs[1] ? songs[1].title : 'Next Song is empty.';
}
function createCancel(){
    let hasCurrent = document.querySelector('.current-song');

    if(hasCurrent)
    {
        hasCurrent.addEventListener('mouseover', function(){

            let hasCancel = document.querySelector('.cancel');

            if(!hasCancel){

                let button = document.createElement('BUTTON');
                button.setAttribute('class', 'cancel');
    
                button.textContent = "STOP";
    
                button.addEventListener('click', function(){
                    let songs = JSON.parse(window.localStorage.getItem('KaraokeList'));
                    songs.splice(0, 1);
                
                    window.localStorage.setItem('KaraokeList', JSON.stringify(songs));

                    window.location.reload();
                    
                })

                hasCurrent.appendChild(button);
         
                
            }
            
        })

        hasCurrent.addEventListener('mouseleave', function(){
            document.querySelector('.cancel').remove();
        })

       
        

    }
}