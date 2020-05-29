const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();

app.use(cors());

app.listen(4000,()=>{
    console.log("O serve funciona a porta 4000")
});

app.get('/download',(req,res)=>{
    let arr = req.query.URL
    let link = arr.split(' '); //o que foi recebindo em array exemplo ['link','nome,'da','musica']
    
    let URL = (link.shift());//Pega somente o link do vídeo
    let nomeMusica = link.join('') //junta o nome da musica
    res.header('Content-Disposition','attachement; filename='+`${nomeMusica.replace(/[,]+/g,'')}.mp3`)
    ytdl(URL,{
        format:'mp3',
    }).pipe(res)
})

