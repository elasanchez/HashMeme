var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 7000;
var ws = new WebSocketServer({
  port: port
});
//Global bar
var messages = [];
var topic;

console.log('websockets server started');

// websocket takes in 'conn' as action and 2nd arg as callback fn
ws.on('connection', function(socket) {
  console.log('client connection established');
  // if conversation of this topic isn't empty.
  if (topic) {
    var curr = '*** Topic is ';
    curr += '\'' + topic + '\'';
    socket.send(curr);
  }

  // messages.forEach(function(msg) {
  //   socket.send(msg);
  // });

  socket.on('message', function(data) {
    console.log('message received: ' + data);

    if (data.indexOf('/topic') != -1) {

      var newTopic = '*** Topic has been changed to ';
      // get the data after topic_ till the end of the message
      newTopic += '\'' + data.substring((data.indexOf('/topic') + 7), data.length) + '\'';
      //keep track of new topic
      topic = data.substring((data.indexOf('/topic')+7), data.length);
      //reset messages every new topic
      messages = [];
      //
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(newTopic);
      });
    }

    messages.push(data);
    ws.clients.forEach(function(clientSocket) {
      // console.log('Sending data to all?');
      clientSocket.send(data);
    });

    // previous implementation to send data to main ser
    // socket.send(data);
  });
});
