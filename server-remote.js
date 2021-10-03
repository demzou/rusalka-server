/*
 * Config
 */
//const cors = require ('cors');
const express = require('express');   //Dependencies
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(`${__dirname}/public`));
//app.use(cors());


/*
 * socket.io
 */

//-- HTTP
const http = require("http");         //Dependencies
const server = http.createServer(app);

//const server = require("http").createServer();
server.listen(port);


// Setup sockets with the HTTP server
let io = require('socket.io')(server);


console.log(`Listening for socket connections on port ${port}`);

let count = 0;
let sum = 0;

//-------------------------------------
// Register a callback function to run when we have an individual connection
// This is run for each individual client that connects
io.sockets.on('connection',
  // Callback function to call whenever a socket connection is made
  function (socket) {

    // Print message to the console indicating that a new client has connected
    console.log("New client: " + socket.id);


    //----------
    socket.on('bvh',
    function(data) {
        //console.log(data);
        io.sockets.emit('bvh', data);
      }
    );

    socket.on('clemPos',
    function(data) {
        io.sockets.emit('position', data);
      }
    );

    socket.on('mode',
    function(data) {
        io.sockets.emit('newMode', data);
      }
    );

    socket.on('playerPos',
    function(data) {
      if (data < 10) {
        sum += data;
        count++;
      }

      if (count > 30) {
        let avg = sum / count;
        io.sockets.emit('distance', avg);
        sum = 0;
        count = 0;
      }
        
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


