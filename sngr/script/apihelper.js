
async function fetchDataGet(url){
    return await fetch(url).then(function(data){
        return data.json();
    });
}

export default {
    search: async function(q){

         return await fetchDataGet(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${q.replace('karaoke', '') + ' karaoke'}&type=video&videoEmbeddable=true&key=${'AIzaSyB86qkcjy-CjI2pGIJYMtF2bNUYkiBCCik'}`);
      
    },
    video: async function(id){
        return await fetchDataGet(`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&key=${'AIzaSyB3TULQ3VALh7ugd-wamkIKQSo1oNcg5tc'}`);

    }
    
}