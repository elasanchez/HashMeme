import Controller from '@ember/controller';
import {
  later
} from '@ember/runloop';
import {
  match,
  not
} from '@ember/object/computed';
import {
  UserStore
} from './storage';

let roundStore = new UserStore('x-hashmeme/r');
let scoreStore = new UserStore('x-hashmeme/s');
let userStore = new UserStore('x-hashmeme/u');
let MAX_ROUNDS = 3;
let GAME_TIME_MS = 59800;

let correctGuess = [];
let incorrectGuess = [];

export default Controller.extend({

  guess: '',
  isValidGuessLen: match('guess', /^[a-zA-Z0-9_]+$/),
  isDisabled: not('isValidGuessLen'),

  // acts as setInterval which reset every set time interval
  init() {
    this._super(...arguments);

    if (score) {
      this.set('score', score);
    }

    later(this, function() {
      if (round < MAX_ROUNDS) {
        round = parseInt(round) + 1;
        roundStore.set(round);

        // save score and name to database
        if (round == MAX_ROUNDS) {
          // save score and name to database
          var record = this.store.createRecord('user', {
            username: username,
            score: score
          });
          record.save().then(function() {
            //clear session storage
            scoreStore.set(0);
            roundStore.set(0);
            window.location.reload();
          });
          //switch to scoreboard
          this.transitionToRoute('scoreboard');

        } else {
          //refresh page
          window.location.reload();
        }

      }
    }, GAME_TIME_MS);
  },
  actions: {
    //checks whether guess is correct/incorrect
    sendGuess() {
      var list = this.get('model')[0].tagList;

      /**Correct**/
      console.log("this is guess: ", this.get('guess'));
      if (list.includes(this.get('guess').toLowerCase()) == true) {
        correctGuess.addObject(this.get('guess'));
        // console.log("CORRECT", this.get('correctGuess'));
        score = parseInt(score) + 1;

        // Update UI
        this.set('correctGuess', correctGuess);
        this.set('score', score);

        //save score to local storage
        scoreStore.set(score);

        //check if all tags have been guessed
        if (correctGuess.length == list.length) {
          // increment round
          if (round < MAX_ROUNDS) {
            round = parseInt(round) + 1;
            roundStore.set(round);

            if (round == MAX_ROUNDS) {
              // score = score.toString();
              // save score and name to database
              var newUser = this.store.createRecord('user', {
                username: username,
                score: score
              });
              newUser.save().then(function() {
                //clear session storage
                scoreStore.set(0);
                roundStore.set(0);
                window.location.reload();
              });
              //switch to scoreboard
              this.transitionToRoute('scoreboard');

            } else {
              //refresh page
              window.location.reload();
            }
          }
        }
      }
      /**Incorrect**/
      else {
        incorrectGuess.addObject(this.get('guess'));
        this.set('incorrectGuess', incorrectGuess);
        // console.log("INCORRECT!", this.get('incorrectGuess'));
      }
      //clear text box
      this.set('guess', '');
    }
  }
});

// get saved score
var score = scoreStore.get();
if (!score) {
  score = 0;
  scoreStore.set(score);
}
// get saved round
var round = roundStore.get();
if (!round) {
  round = 0;
  roundStore.set(round);
}

// get saved name
var username = userStore.get();
if (!username) {
  var msg = "Please enter your name: " +
    "\n* Name must contain a letter" +
    "\n* Length must be less than 20 character";
  username = prompt(msg);
  // Name cannot be null, empty, or does not contain a letter, and name is less than 20 char
  while (!username || username == '' ||
    !(/[a-zA-Z]/.test(username)) ||
    username.length < 1 || username.length > 20) {
    username = prompt(msg);
  }
  userStore.set(username);
}
