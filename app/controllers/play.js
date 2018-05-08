import Controller from '@ember/controller';
import {
  gte,
  not
} from '@ember/object/computed';

let correctGuess = [];
let incorrectGuess = [];
var score = 0;

export default Controller.extend({

      guess: '',
      done: '',

      isValidGuessLen: gte('guess.length', 1),
      isDisabled: not('isValidGuessLen'),

      actions: {
        //checks whether guess is correct/incorrect

        sendGuess() {

          var list = this.get('model')[0].tagList;

          /**Correct**/
          console.log("this is guess: ", this.get('guess'));
          if(list.includes(this.get('guess')) == true) {
            correctGuess.addObject(this.get('guess'));
            console.log("CORRECT", this.get('correctGuess'));
            score = score+1;
            this.set('correctGuess', correctGuess);

            this.set('score', score);
            if(correctGuess.length == list.length) {
              this.set('done', true);
            }
          }

          /**Incorrect**/
          else {
            incorrectGuess.addObject(this.get('guess'));
            this.set('incorrectGuess', incorrectGuess);
            console.log("INCORRECT!", this.get('incorrectGuess'));
          }
          this.set('guess', '');
        }
      }
    });
