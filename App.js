const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000

http.listen(port , () => console.log(`running on port ${port}`))

app.use(express.static(__dirname + "/public"));
app.get('/' , (req , res) => {
    res.sendFile(__dirname + '/index.html')
})

// socket
io.on('connection' , (socket) => {
    console.log("connected...")
    socket.on('message' , (msg) => {
        socket.broadcast.emit('message' , msg)
    })
})


