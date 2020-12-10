//Socket.IO is a library that enables real-time, bidirectional and event-based communication between the browser and the server
const io = require('socket.io')(3000)
//3000 is the port that we want our socket to work on.
//creates a server at the mentioned port number.

const users = {}

//connection event to log when a user connects
io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        //custom event
        socket.broadcast.emit('user-connected', name)
    })
    //This function gets called every time user loads the website. Will give each one of the user its own socket. 
    
    socket.on('send-chat-message', message => {
        //custom event
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })
    
    //disconnection event to log when the user disconnects
    socket.on('disconnect', () => {
        //custom event
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})
