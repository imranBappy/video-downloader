const express = require('express');
require('dotenv').config();
// const mongoose = require('mongoose');
// const fs = require('fs');
const ytdl = require('ytdl-core');

const app = express();
app.use(express.static('./public'))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "public/index.html")
})

app.get('/videoinfo', async (req, res)=>{

    try {
        const videoURL = req.query.videoURL;
        const info = await ytdl.getInfo(videoURL)
        res.json(info)
    } catch (error) {
        
    }
    
})

app.get('/download', async (req, res)=>{
    const videoURL = req.query.videoURL;
    const itag = req.query.itag;
    const title =req.query.title;
    res.header("Content-Disposition", `attachment; \ filename="${`${title}.mp4`}"`)
    ytdl(videoURL, {
        filter: format => format.itag == itag
    }).pipe(res)
})

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log('successfull');
})
