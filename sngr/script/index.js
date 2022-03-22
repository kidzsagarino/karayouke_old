
import apiHelper from './apihelper.js';
import sngr from './sngr.me.js';

document.querySelector('.search-box').addEventListener('keydown', async function(e){

    
    if(e.keyCode == 13)
    {
        console.log(e);

        const q = e.target.value;

        if(q){
            loadResult(q);
           
        }
        
    }
});


document.querySelector('.player').addEventListener('click', function(){

  sngr.openPlayer();

});


window.addEventListener('DOMContentLoaded', async function(){

    loadResult('OPM Karaoke');
});


async function loadResult(q){

    sngr.startLoader();
    let result = await apiHelper.search(q);
    sngr.stopLoader();

    document.querySelector('.search-result-container').innerHTML = '';
    document.querySelector('.search-result-container').append(await sngr.resultify(result));
}