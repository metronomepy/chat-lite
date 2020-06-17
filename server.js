const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json());


const rooms = new Map();

app.get('/rooms', (req, res) => { //if get request then do this func
    res.json(rooms);
});

app.post('/rooms', (req, res) => {
    const { roomId, userName } = req.body;
    if (!rooms.has(roomId)) {
        rooms.set(
            roomId,
            new Map([
                ['users', new Map()],
                ['messages', []],
            ]),
        );
    }
    res.send();
});

io.on('connection', socket => {
    console.log('user connected', socket.id)
});

server.listen(9999, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log('Server is running');
});

