const express = require('express');
require('dotenv').config();
const cors = require('cors')

const ytdl = require('ytdl-core');




const app = express();
app.use(cors());
app.use(express.json())
app.use(express.static('./public'))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "public/index.html")
})
let videoTitle = '';

app.get('/videoinfo', async (req, res)=>{

    try {
        const videoURL = req.query.videoURL;
        const info = await ytdl.getInfo(videoURL)
        videoTitle = info.videoDetails.title; 
        res.json(info)
    } catch (error) {
        console.log(error);
    }
    
})

app.get('/download', async (req, res)=>{
    res.header("Content-Disposition", `attachment; filename="${videoTitle? videoTitle.trim() : "video"}.mp4"`)
    ytdl(req.query.videoURL, {
        filter: format => format.itag == req.query.itag
    }).pipe(res)
})


const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log('successfull');
})
