import Component from '@ember/component';
import $ from 'jquery';
export default Component.extend({
  chatMessages: '',

  init: function() {
    this._super();
    var socket = this.get('websockets').socketFor('ws://localhost:7000');
    //on connect all this
    socket.on('open', this.myOpenHandler, this);
    //on message send
    socket.on('message', this.myMessageHandler, this);
    socket.on('close', function(event) {
      console.log(event);
      console.log('closed');
    }, this);
  },

    message: '',
    messageIncoming: '',
    username: 'luigi: ',

  myOpenHandler: function(event) {
    console.log('On open event has been called: ' + event);
  },

  myMessageHandler: function(event) {

    console.log('Message: ' + event.data);
    var msg = this.get('messageIncoming');
    msg += event.data;
    this.set('messageIncoming', msg);
    // this.$list = $('[data-chat="message-list"]');
    //
    // let $messageRow = $('<ul>', {
    //   'class': 'message-row'
    // });
    //
    // let $message = $('<p>');
    // $message.append($('<span>', {
    //   'class': 'message-username',
    //   text: this.get('username')
    // }));
    //
    // $message.append($('<span>', {
    //   'class': 'message-message',
    //   text: this.get('message')
    // }));
    //
    // $messageRow.append($message);
    // this.$list.append($messageRow);
    // $messageRow.get(0).scrollIntoView();
  },

  actions: {
    sendButtonPressed: function() {
      var socket = this.get('websockets').socketFor('ws://localhost:7000/');
      socket.send(this.get('message')+ '\n');
    }
  }
});
