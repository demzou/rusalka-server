/*
 * socket.io
 */

const socketio = require('socket.io-client');
//let io = socketio.connect('ws://localhost:3000');
const io = socketio('https://rusalka.herokuapp.com', { transports: ["websocket"] });

io.on("connect", function () {
    console.log("Connected");
  });


/*
 * udpclient
 */

var dgram = require('dgram');
var udpPort = 7002;
let firstPartMsg;
let secPartMsg;

updSocket = dgram.createSocket('udp4');

updSocket.on('message', function (msg, info){
  //console.log(msg.length);
    //console.log(msg);
    //console.log(String.fromCharCode.apply(null, new Uint8Array(msg)));
    let msgString = String.fromCharCode.apply(null, new Uint8Array(msg));

    if (msg.length == 1024) {
      firstPartMsg = msgString;
    } else  {
      if (firstPartMsg.length !=0) {
        secPartMsg = msgString;

        let fullBvh = addHeader(firstPartMsg + secPartMsg);
        //io.sockets.emit('bvh', fullBvh);
        io.emit('bvh', fullBvh);
      }
    }
 });

 updSocket.on('listening', function(){
    var address = updSocket.address();
    console.log("listening for udp on :" + address.address + ":" + address.port);
});

updSocket.bind(udpPort);



function addHeader (_msgString) {
  const bvhHeader = `HIERARCHY
  ROOT Hips
  {
      OFFSET 0.000 105.850 0.000
      CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
      JOINT RightUpLeg
      {
          OFFSET -11.500 -1.850 0.000
          CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
          JOINT RightLeg
          {
              OFFSET 0.000 -48.000 0.000
              CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
              JOINT RightFoot
              {
                  OFFSET 0.000 -48.000 0.000
                  CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                  End Site
                  {
                      OFFSET 0.000 -8.000 19.600
                  }
              }
          }
      }
      JOINT LeftUpLeg
      {
          OFFSET 11.500 -1.850 0.000
          CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
          JOINT LeftLeg
          {
              OFFSET 0.000 -48.000 0.000
              CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
              JOINT LeftFoot
              {
                  OFFSET 0.000 -48.000 0.000
                  CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                  End Site
                  {
                      OFFSET 0.000 -8.000 19.600
                  }
              }
          }
      }
      JOINT Spine
      {
          OFFSET 0.000 16.654 0.000
          CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
          JOINT Spine1
          {
              OFFSET 0.000 11.312 0.000
              CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
              JOINT Spine2
              {
                  OFFSET 0.000 11.780 0.000
                  CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                  JOINT Spine3
                  {
                      OFFSET 0.000 11.312 0.000
                      CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                      JOINT Neck
                      {
                          OFFSET 0.000 12.091 0.000
                          CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                          JOINT Head
                          {
                              OFFSET 0.000 9.000 0.000
                              CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                              End Site
                              {
                                  OFFSET 0.000 18.000 0.000
                              }
                          }
                      }
                      JOINT RightShoulder
                      {
                          OFFSET -3.500 8.061 0.000
                          CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                          JOINT RightArm
                          {
                              OFFSET -14.000 0.000 0.000
                              CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                              JOINT RightForeArm
                              {
                                  OFFSET -29.000 0.000 0.000
                                  CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                  JOINT RightHand
                                  {
                                      OFFSET -28.000 0.000 0.000
                                      CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                      JOINT RightHandThumb1
                                      {
                                          OFFSET -2.702 0.206 3.388
                                          CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                          JOINT RightHandThumb2
                                          {
                                              OFFSET -3.998 0.000 0.000
                                              CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                              JOINT RightHandThumb3
                                              {
                                                  OFFSET -2.778 0.000 0.000
                                                  CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                                  End Site
                                                  {
                                                      OFFSET -2.382 0.000 0.000
                                                  }
                                              }
                                          }
                                      }
                                      JOINT RightInHandIndex
                                      {
                                          OFFSET -3.500 0.552 2.148
                                          CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                          JOINT RightHandIndex1
                                          {
                                              OFFSET -5.664 -0.099 1.085
                                              CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                              JOINT RightHandIndex2
                                              {
                                                  OFFSET -3.930 0.000 0.000
                                                  CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                                  JOINT RightHandIndex3
                                                  {
                                                      OFFSET -2.228 0.000 0.000
                                                      CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                                      End Site
                                                      {
                                                          OFFSET -1.960 0.000 0.000
                                                      }
                                                  }
                                              }
                                          }
                                      }
                                      JOINT RightInHandMiddle
                                      {
                                          OFFSET -3.672 0.562 0.822
                                          CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                          JOINT RightHandMiddle1
                                          {
                                              OFFSET -5.618 -0.091 0.341
                                              CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                              JOINT RightHandMiddle2
                                              {
                                                  OFFSET -4.288 0.000 0.000
                                                  CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                                  JOINT RightHandMiddle3
                                                  {
                                                      OFFSET -2.688 0.000 0.000
                                                      CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                                      End Site
                                                      {
                                                          OFFSET -2.144 0.000 0.000
                                                      }
                                                  }
                                              }
                                          }
                                      }
                                      JOINT RightInHandRing
                                      {
                                          OFFSET -3.654 0.584 -0.140
                                          CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                          JOINT RightHandRing1
                                          {
                                              OFFSET -5.032 -0.024 -0.520
                                              CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                              JOINT RightHandRing2
                                              {
                                                  OFFSET -3.737 0.000 0.000
                                                  CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                                  JOINT RightHandRing3
                                                  {
                                                      OFFSET -2.593 0.000 0.000
                                                      CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                                      End Site
                                                      {
                                                          OFFSET -2.016 0.000 0.000
                                                      }
                                                  }
                                              }
                                          }
                                      }
                                      JOINT RightInHandPinky
                                      {
                                          OFFSET -3.432 0.510 -1.305
                                          CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                          JOINT RightHandPinky1
                                          {
                                              OFFSET -4.496 -0.024 -1.184
                                              CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                              JOINT RightHandPinky2
                                              {
                                                  OFFSET -2.993 0.000 0.000
                                                  CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                                  JOINT RightHandPinky3
                                                  {
                                                      OFFSET -1.891 0.000 0.000
                                                      CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                                      End Site
                                                      {
                                                          OFFSET -1.786 0.000 0.000
                                                      }
                                                  }
                                              }
                                          }
                                      }
                                  }
                              }
                          }
                      }
                      JOINT LeftShoulder
                      {
                          OFFSET 3.500 8.061 0.000
                          CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                          JOINT LeftArm
                          {
                              OFFSET 14.000 0.000 0.000
                              CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                              JOINT LeftForeArm
                              {
                                  OFFSET 29.000 0.000 0.000
                                  CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                  JOINT LeftHand
                                  {
                                      OFFSET 28.000 0.000 0.000
                                      CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                      JOINT LeftHandThumb1
                                      {
                                          OFFSET 2.702 0.206 3.388
                                          CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                          JOINT LeftHandThumb2
                                          {
                                              OFFSET 3.998 0.000 0.000
                                              CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                              JOINT LeftHandThumb3
                                              {
                                                  OFFSET 2.778 0.000 0.000
                                                  CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                                  End Site
                                                  {
                                                      OFFSET 2.382 0.000 0.000
                                                  }
                                              }
                                          }
                                      }
                                      JOINT LeftInHandIndex
                                      {
                                          OFFSET 3.500 0.552 2.148
                                          CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                          JOINT LeftHandIndex1
                                          {
                                              OFFSET 5.664 -0.099 1.085
                                              CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                              JOINT LeftHandIndex2
                                              {
                                                  OFFSET 3.930 0.000 0.000
                                                  CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                                  JOINT LeftHandIndex3
                                                  {
                                                      OFFSET 2.228 0.000 0.000
                                                      CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                                      End Site
                                                      {
                                                          OFFSET 1.960 0.000 0.000
                                                      }
                                                  }
                                              }
                                          }
                                      }
                                      JOINT LeftInHandMiddle
                                      {
                                          OFFSET 3.672 0.562 0.822
                                          CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                          JOINT LeftHandMiddle1
                                          {
                                              OFFSET 5.618 -0.091 0.341
                                              CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                              JOINT LeftHandMiddle2
                                              {
                                                  OFFSET 4.288 0.000 0.000
                                                  CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                                  JOINT LeftHandMiddle3
                                                  {
                                                      OFFSET 2.688 0.000 0.000
                                                      CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                                      End Site
                                                      {
                                                          OFFSET 2.144 0.000 0.000
                                                      }
                                                  }
                                              }
                                          }
                                      }
                                      JOINT LeftInHandRing
                                      {
                                          OFFSET 3.654 0.584 -0.140
                                          CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                          JOINT LeftHandRing1
                                          {
                                              OFFSET 5.032 -0.024 -0.520
                                              CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                              JOINT LeftHandRing2
                                              {
                                                  OFFSET 3.737 0.000 0.000
                                                  CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                                  JOINT LeftHandRing3
                                                  {
                                                      OFFSET 2.593 0.000 0.000
                                                      CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                                      End Site
                                                      {
                                                          OFFSET 2.016 0.000 0.000
                                                      }
                                                  }
                                              }
                                          }
                                      }
                                      JOINT LeftInHandPinky
                                      {
                                          OFFSET 3.432 0.510 -1.305
                                          CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                          JOINT LeftHandPinky1
                                          {
                                              OFFSET 4.496 -0.024 -1.184
                                              CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                              JOINT LeftHandPinky2
                                              {
                                                  OFFSET 2.993 0.000 0.000
                                                  CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                                  JOINT LeftHandPinky3
                                                  {
                                                      OFFSET 1.891 0.000 0.000
                                                      CHANNELS 6 Xposition Yposition Zposition Yrotation Xrotation Zrotation
                                                      End Site
                                                      {
                                                          OFFSET 1.786 0.000 0.000
                                                      }
                                                  }
                                              }
                                          }
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }
  }
  MOTION
  
  Frames: 1
  Frame Time: 0.010
  `

  //remove first character
  let shorter = _msgString.substring(10);

  return bvhHeader + shorter 
}

