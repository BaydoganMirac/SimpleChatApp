const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socket = require('socket.io');
const io =  socket(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});

io.on('connection', (user) => {
    console.log('Bir kullanıcı Bağlandı');
    user.on('message', (data) =>{
        console.log(data.username +":"+ data.message.replace(/<[^>]*>?/gm, '') + " Mesajını gönderdi.");
        user.broadcast.emit('userSendMessage', data);
    })

    user.on('disconnect', ()=>{
        console.log("Kullanıcı Bağlantıyı Kesti");
    });
});

server.listen(3000);