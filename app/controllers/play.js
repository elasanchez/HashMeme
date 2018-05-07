import Controller from '@ember/controller';
import {
  gte,
  not
} from '@ember/object/computed';

var correctGuess = [];
var incorrectGuess = [];
var score = 0;

export default Controller.extend({

      guess: '',
      done: '',

      isValidGuessLen: gte('guess.length', 1),
      isDisabled: not('isValidGuessLen'),

      actions: {
        //checks whether guess is correct/incorrect

        sendGuess() {
          // alert(`Your Guess: ${this.get('guess')}`);

          var list = this.get('model')[0].tagList;

          /**Correct**/
          console.log(list.includes(this.get('guess')));
          if(list.includes(this.get('guess')) == true) {
            correctGuess.push(this.get('guess'));
            score = score+1;
            this.set('correctGuess', correctGuess);
            this.set('score', score);
            if(correctGuess == list.length) {
              this.set('done', true);
            }
          }

          /**Incorrect**/
          else {
            // console.log("FALSE THAT");
            incorrectGuess.push(this.get('guess'));
            this.set('incorrectGuess', incorrectGuess);
            console.log(incorrectGuess);
          }
          this.set('guess', '');
        }
      }
    });
