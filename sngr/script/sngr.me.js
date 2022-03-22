import apihelper from "./apihelper.js";

var app = {
    
    resultify: async function(data){
        var self = this;
        
        const rowDiv = document.createElement('DIV');
        rowDiv.classList.add('row');

        if(data.error){

            if(data.error.code == 403){
                self.promptAPIKey();

                return;
            }
           
            
        }
        for(let item of data.items){

            console.log(item);

            const videoID = item.id.videoId;
            const thumnail = item.snippet.thumbnails.medium.url;
            const title = item.snippet.title;

            self.startLoader();
            const videoDetails = await apihelper.video(videoID);

            if(videoDetails.error){
                if(videoDetails.error.code == 403){
                    self.promptAPIKey();
                    return;
                }
                
            }
            self.stopLoader();
            self.startLoader();
            const videoDuration = await videoDetails.items[0].contentDetails.duration;
            if(videoDuration.error){
                if(videoDuration.error.code == 403){

                    self.promptAPIKey();
                    return;
                }
                
            }
            self.stopLoader();

            const resultDiv = document.createElement('DIV');
            resultDiv.classList.add('result');

            const topDiv = document.createElement('DIV');
            topDiv.classList.add('top');

            const thumnailImg = document.createElement('IMG');
            thumnailImg.setAttribute('src', thumnail);

            const buttonReserve = document.createElement('BUTTON');

            buttonReserve.classList.add('btn-reserve');
            buttonReserve.setAttribute('data-id', videoID);
            buttonReserve.setAttribute('data-title', title);
            buttonReserve.setAttribute('data-duration', videoDuration);
            buttonReserve.innerHTML = 'RESERVE THIS SONG + ';

            buttonReserve.addEventListener('click', function(e){
                let song = {
                    id: e.target.getAttribute('data-id'),
                    title: e.target.getAttribute('data-title'),
                    duration: e.target.getAttribute('data-duration')
                }
                
                
                self.reserveSong(song);
            })

            topDiv.appendChild(thumnailImg);
            topDiv.appendChild(buttonReserve);
            resultDiv.appendChild(topDiv);

            const pTitle = document.createElement('P');
            pTitle.classList.add('title');

            const smallTitle = document.createElement('small');
            smallTitle.innerHTML = title;

            pTitle.appendChild(smallTitle);

            resultDiv.appendChild(pTitle);
          
            rowDiv.appendChild(resultDiv);

        }
      
        
        

        return  rowDiv;
        

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
    displayReservedSongs: function(songs, fn){

        let songListCon = document.createElement('DIV');
        songListCon.classList.add('class', 'song-list-con');

        if(songs.length > 0){
        
            for(let [i, item] of songs.entries()){

                let song = document.createElement('DIV');
                song.classList.add('song');

                if(i==0){

                  
                    song.classList.add('current-song');

                    let hasButtonCancel = document.querySelector('.cancel');

                    if(hasButtonCancel){
                        return;
                    }

                    let button = document.createElement('BUTTON');
                    button.setAttribute('class', 'cancel');
        
                    button.innerHTML = "STOP";
        
                    button.addEventListener('click', function(){
                        
                        fn();

                    })

                    song.appendChild(button);

                    
                }

                let span = document.createElement('SPAN');

                span.innerHTML = item.title;

                song.appendChild(span);
                
                songListCon.appendChild(song);

            }
     
            
        }
        else{
           
            let p = document.createElement('P');
            p.innerHTML = 'List is empty.';

            songListCon.appendChild(p);
        }

        
       return songListCon;
        

    },
    promptAPIKey: function(){

        const hasPromptDiv = document.querySelector('.api-key-con');
        
        if(hasPromptDiv){
            return;
        }

        const propmtDIV = document.createElement('DIV');

        propmtDIV.classList.add('api-key-con');

        const inputCon = document.createElement('DIV');
        inputCon.classList.add('input-con');
        propmtDIV.appendChild(inputCon);

        const input = document.createElement('INPUT');
        input.setAttribute('name', 'input-api-key');
        input.setAttribute('placeholder', 'Paste/Enter Your API Key Here')

        const saveAPIBtn = document.createElement('BUTTON');
        saveAPIBtn.classList.add('btn-save-api');
        saveAPIBtn.innerHTML = 'SAVE';

        saveAPIBtn.addEventListener('click', function(){

            let apiKey = document.querySelector('input[name=input-api-key]').value;

            if(apiKey){
                window.localStorage.setItem('YDAPIKey', input.value);
                window.location.reload();
            }
            else{
                return;
            }

            
        });

        inputCon.appendChild(input);
        inputCon.appendChild(saveAPIBtn);

        propmtDIV.appendChild(inputCon);

        document.body.appendChild(propmtDIV);

        
    },
    startLoader: function(){
        let loaderCon = document.createElement('DIV');
        loaderCon.classList.add('loader-con');

        let loader = document.createElement('DIV');
        loader.classList.add('loader');

        loaderCon.appendChild(loader);
        document.querySelector('.content').appendChild(loaderCon);

        
    },
    stopLoader: function(){
        document.querySelector('.loader-con').remove();
    }

}
export default app