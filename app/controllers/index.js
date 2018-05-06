import Controller from '@ember/controller';


export default Controller.extend({
  actions: {
    loadbox: function() {
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
