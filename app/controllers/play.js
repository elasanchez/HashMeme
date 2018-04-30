import Controller from '@ember/controller';
import {
  and,
  gte,
  match,
  not
} from '@ember/object/computed';

export default Controller.extend({

  guess: '',
  incorrectGuess: false,
// /[^\s]/g
  isNoSpace: match('guess', /^\w+/g),
  isValidGuessLen: gte('guess.length', 1),
  isValid: and('isNoSpace', 'isValidGuessLen'),
  isDisabled: not('isValid'),

  actions: {
    //checks whether guess is correct/incorrect
    sendGuess() {
      alert(`Your Guess: ${this.get('guess')}`);

      this.set('incorrectGuess', true);
      this.$('guess').append('guess');
      this.set('guess', '');
    }
  }
});
