import Controller from '@ember/controller';
import {
  gte,
  not
} from '@ember/object/computed';

var correctGuess = [];
var incorrectGuess = [];

export default Controller.extend({

      guess: '',
      incorretGuess: '',
      correctGuess: '',

      isValidGuessLen: gte('guess.length', 1),
      isDisabled: not('isValidGuessLen'),

      actions: {
        //checks whether guess is correct/incorrect

        sendGuess() {
          // alert(`Your Guess: ${this.get('guess')}`);

          // var correctGuess = [];
          // var incorrectGuess = [];
          var list = this.get('model')[0].tagList;

          // console.log("uig", list);

          /**Correct**/
          console.log(list.includes(this.get('guess')));
          if(list.includes(this.get('guess')) == true) {
            correctGuess.push(this.get('guess'));
            this.set('correctGuess', correctGuess);
            // correctGuess = this.get('guess');
            console.log(correctGuess);
          }

          /**Incorrect**/
          else {
            // console.log("FALSE THAT");
            incorrectGuess.push(this.get('guess'));
            this.set('incorrectGuess', incorrectGuess);
            console.log(incorrectGuess);
            // for(var i = 0; i < incorrectGuess.length; i++) {
            //   this.set('incorrectGuess', incorrectGuess);
            // }
          }
          this.set('guess', '');
          // console.log(incorrectGuess)
        }
      }
    });
