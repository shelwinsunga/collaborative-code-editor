// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

let currentContent = '';

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.emit('initialize-content', currentContent);

    socket.on('text-change', (data) => {
        currentContent = data;
        socket.broadcast.emit('text-change', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

module.exports = http;