/*
 * Config
 */
const express = require('express');   //Dependencies
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(`${__dirname}/public`));


/*
 * socket.io
 */

//-- HTTP
const http = require("http");         //Dependencies
const server = http.createServer(app);
server.listen(port);


// Setup sockets with the HTTP server
// const socketio = require('socket.io');
// let io = socketio.listen(server);

const io = require("socket.io")(server, {
    cors: {
      origin: "http://192.168.0.73",
      methods: ["GET", "POST"],
      allowedHeaders: ["Rusalka-data-stream"],
      credentials: true
    }
  });


console.log(`Listening for socket connections on port ${port}`);


//-------------------------------------
// Register a callback function to run when we have an individual connection
// This is run for each individual client that connects
io.sockets.on('connection',
  // Callback function to call whenever a socket connection is made
  function (socket) {

    // Print message to the console indicating that a new client has connected
    console.log("New client: " + socket.id);


    //----------> Manage button clicks
    socket.on('bvh',
    function(data) {
        //console.log(data);
        io.sockets.emit('bvh', data);
      }
    );
    //----------
      
    
    // Specify a callback function to run when the client disconnects
    socket.on('disconnect',
      function() {
        console.log("Client has disconnected: " + socket.id);
        // remove socket 
      }
    );
  }
);


