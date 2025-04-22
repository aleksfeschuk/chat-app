const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let messages = [];

app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", (socket) => {
    console.log('A user connected');

    socket.emit('initMessages', messages);

    socket.on('sendMessage', (text) => {
        const message = { text, createdAt: new Date() };
        messages.push(message);
        io.emit('newMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})