import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    contactMessage: function() {
      var newMessage = this.store.createRecord('message', {
        name: this.get('name'),
        emailAddress: this.get('emailAddress'),
        message: this.get('message')
      });
      newMessage.save();
      window.alert(`Thank you for your message!`)
      this.set('name', '')
      this.set('emailAddress', '')
      this.set('message', '')
    }
  }
});
