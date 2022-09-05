let app =require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);

const port =2525;
let players={};

io.on("connection", (socket)=>{
    console.log('a user connected');
    socket.emit("connect");
    players[socket.id] = {
        rotation: 0,
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50,
        playerId: socket.id,
        team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
      };
      
    socket.emit('currentPlayers', players);
      
    socket.on('disconnect', function() {
        console.log('user disconnected');
        delete players[socket.id]
        socket.broadcast.emit("DisconnectPlayer", socket.id);
     });
})


http.listen(port, function(){
    console.log("listening in http://localhost:" + port);
})