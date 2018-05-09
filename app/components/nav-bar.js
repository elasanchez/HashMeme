import Component from '@ember/component';

export default Component.extend({

  actions: {
    loadbox1() {
      var newUser = prompt("Please enter your name:");
      if (newUser == null || newUser == "") {
        newUser = prompt("Please enter your name:");
      } else {
        var newUsername = this.store.createRecord('user', {
          username: newUser
        });
        newUsername.save();
      }

    }
  }

});
