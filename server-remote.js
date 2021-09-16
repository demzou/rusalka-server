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

// const io = require("socket.io")(server, {
//     cors: {
//       origin: "http://192.168.0.73",
//       methods: ["GET", "POST"],
//       allowedHeaders: ["Rusalka-data-stream"],
//       credentials: true
//     }
//   });

// const io = require("socket.io")(server, {
//         cors: {
//           origin: "*"
//         }
//       });


// const io = require("socket.io")(server, {
//     handlePreflightRequest: (req, res) => {
//         const headers = {
//             "Access-Control-Allow-Headers": "Content-Type, Authorization",
//             "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
//             "Access-Control-Allow-Credentials": true
//         };
//         res.writeHead(200, headers);
//         res.end();
//     }
// });

// const io = require("socket.io")(server, {
//     cors: {
//       origin: "http://127.0.0.1:8887/",
//       methods: ["GET", "POST"]
//     }
//   });

//   const io = require("socket.io")(server, {
//     allowRequest: (req, callback) => {
//       const noOriginHeader = req.headers.origin === undefined;
//       callback(null, noOriginHeader);
//     }
//   });


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


