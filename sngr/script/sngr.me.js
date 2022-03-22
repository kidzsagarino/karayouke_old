import apihelper from "./apihelper.js";

var app = {
    
    resultify: async function(data){
        var self = this;
        let result = `<div class="row">`;
        console.log(data);
        for(let item of data.items){

            console.log(item);

            const videoID = item.id.videoId;
            const thumnail = item.snippet.thumbnails.medium.url;
            const title = item.snippet.title;
            const videoDetails = await apihelper.video(videoID);
            const videoDuration = await videoDetails.items[0].contentDetails.duration;

            result += `<div class="result">
                        <div class="top">
                            <img class="thumbnail" src=${thumnail}>
                            <button class="btn-reserve" data-id=${videoID} data-title="${title}" data-duration=${videoDuration}>+</button>
                        </div>
                      
                            <p class="title"><small>${title}</small></p>
                           
                    </div>`;


        }
        result += '</div>';
        
        var resultDom = new DOMParser().parseFromString(result, 'text/html');


        resultDom.querySelectorAll('.btn-reserve').forEach(function(item){
            item.addEventListener('click', function(e){

                var song = {
                    id: e.target.getAttribute('data-id'),
                    title: e.target.getAttribute('data-title'),
                    duration: e.target.getAttribute('data-duration')
                }
                
                
                self.reserveSong(song);
               
            });
        })

        return  resultDom.querySelector('.row');
        

    },
    openPlayer: function(){
        window.open('/player');
    },
    reserveSong: function(song){
        var list = JSON.parse(window.localStorage.getItem('KaraokeList'));

        if(list){
            var newList = [...list, song];
        }
        else{
            newList=[song];
        }
        
    
        window.localStorage.setItem('KaraokeList', JSON.stringify(newList));
    },
    displayReservedSongs: function(){
        var list = JSON.parse(window.localStorage.getItem('KaraokeList'));
      

        let songList = `<div class="song-list-con">`;
        if(list.length > 0){
        
            for(let [i, item] of list.entries()){
                songList += `<div class="song ${i==0 ? 'current-song': ''}" >
                                <span>${item.title}</span>
                            </div>`;
            }
     
            
        }
        else{
            songList += "<p>List is empty.</p>";
        }

        songList+= '</div>';

        return new DOMParser().parseFromString(songList, 'text/html').querySelector('.song-list-con');

        

    
                
    }
}
export default app