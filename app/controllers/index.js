import Controller from '@ember/controller';

import {
  UserStore
} from './storage';

let userStore = new UserStore('x-hashmeme/u');

export default Controller.extend({

  actions: {
    loadbox: function() {
      //Yash code
      // var newUser = prompt("Please enter your name:");
      // if (newUser == null || newUser == "") {
      //   newUser = prompt("Please enter your name:");
      // } else {
      //   var newUsername = this.store.createRecord('user', {
      //     username: newUser
      //   });
      //   newUsername.save();
      // }
      //END Yash code

      let username = userStore.get();
      if (!username) { // covers null
          username = prompt("Please enter your name:");

          //saves to the local session storage
          userStore.set(username);

          //SAVE TO DATABASE - uncomment luigi
          // var newUsername = this.store.createRecord('user', {
          //   username: username
          // });
          // newUsername.save();
      }
    }
  }
});
