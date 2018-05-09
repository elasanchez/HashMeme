import Controller from '@ember/controller';
import {computed} from '@ember/object';
export default Controller.extend({
  init() {
      this._super(...arguments);
      this.tagName = 'ul';
      // this.sortBy =['email:desc'];
      this.sortBy = ['score:desc'];
  },
  sortedScores: computed.sort('model', 'sortBy'),

});
