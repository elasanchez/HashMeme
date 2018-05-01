import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  emailAddress: DS.attr('string'),
  message: DS.attr('string')
});
