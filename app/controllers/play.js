import Controller from '@ember/controller';
import {
  gte,
  not
} from '@ember/object/computed';

export default Controller.extend({

  guess: '',

  isValidGuessLen: gte('guess.length', 1),
  isDisabled: not('isValidGuessLen'),

  actions: {
    //checks whether guess is correct/incorrect
    sendGuess() {
      alert(`Your Guess: ${this.get('guess')}`);
      this.set('guessIncorrect', 'moop');
      this.set('guess', '');
    }
  }
});
