gapi.load("client", loadClient);
 
function loadClient() {
    gapi.client.setApiKey("______SEU___ID__DA__API");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
                function(err) { console.error("Error loading GAPI client for API", err); });
}
const ytForm = document.getElementById('yt-form');
const keywordInput = document.getElementById('keyword-input');
const videoList = document.getElementById('videoListContainer');
var pageToken = '';
 
ytForm.addEventListener('submit', e => {
    e.preventDefault();
    execute();
});
 
function paginate(e, obj) {
    e.preventDefault();
    pageToken = obj.getAttribute('data-id');
    execute();
}
 
// Make sure the client is loaded before calling this method.
function execute() {
    const searchString = keywordInput.value;
    const maxresult = 20;
    const orderby = "viewCount"
 
    var arr_search = {
        "part": 'snippet',
        "type": 'video',
        "order": orderby,
        "maxResults": maxresult,
        "q": searchString
    };
 
    if (pageToken != '') {
        arr_search.pageToken = pageToken;
    }
 
    return gapi.client.youtube.search.list(arr_search)
    .then(function(response) {
        // Handle the results here (response.result has the parsed body).
        const listItems = response.result.items;
        if (listItems) {
            let output = '<div class="titulo-video"><h4>Videos</h4><ul></div>';
 
            listItems.forEach(item => {
                const videoId = item.id.videoId;
                const videoTitle = item.snippet.title;
                output += `
                    <li><a data-fancybox href="https://www.youtube.com/watch?v=${videoId}"><img src="http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg" /></a><div class="downloader"><p>${videoTitle}</p><button onclick="enviar('https://www.youtube.com/watch?v=${videoId}','${videoTitle}')" ><img src="./img/down.png"></button></div></li>
                `;
                
            });
            output += '</ul>';
 
            if (response.result.prevPageToken) {
                output += `<br><a class="paginate" href="#" data-id="${response.result.prevPageToken}" onclick="paginate(event, this)">Prev</a>`;
            }
 
            if (response.result.nextPageToken) {
                output += `<a href="#" class="paginate" data-id="${response.result.nextPageToken}" onclick="paginate(event, this)">Next</a>`;
            }
 
            // Output list
            videoList.innerHTML = output;
        }
    },
    function(err) { console.error("Execute error", err); });
}

function enviar(link,nome){
    window.location.href =`http://localhost:4000/download?URL=${link}` + `${nome}`;
}
