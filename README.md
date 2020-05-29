# Conversor-mp4
## Usando HTML,CSS,Js e node Js
Conversor de videos do youtube para arquivos mp3


![COnversor](https://github.com/erosMariano/Conversor-mp4/blob/master/GIF-200528_224304.gif)

### Para a api functionar:
Deve colocar o ID da api do youtube v3 no trecho indicado, arquivo: main.js
```
function loadClient() {
    gapi.client.setApiKey("____SEU___ID____");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
                function(err) { console.error("Error loading GAPI client for API", err); });
}
```
**Run Project(in terminal)**
```
npm install
npm run dev
```
