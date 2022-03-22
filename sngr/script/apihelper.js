
async function fetchDataGet(url){
    return await fetch(url).then(function(data){
        return data.json();
    });
}

export default {
    search: async function(q){

         return await fetchDataGet(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${q.replace('karaoke', '') + ' karaoke'}&type=video&videoEmbeddable=true&key=${window.localStorage.getItem('YDAPIKey')}`);
      
    },
    video: async function(id){
        return await fetchDataGet(`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&key=${window.localStorage.getItem('YDAPIKey')}`);

    }
    
}