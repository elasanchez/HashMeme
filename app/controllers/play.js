import Controller from '@ember/controller';
import {later } from '@ember/runloop';
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
let self;
let MAX_ROUNDS = 3;
let GAME_TIME_MS = 30000;
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
  username = prompt("Please enter your name:");
  userStore.set(username);
}

let correctGuess = [];
let incorrectGuess = [];

export default Controller.extend({

  guess: '',
  isValidGuessLen: match('guess', /^[a-zA-Z0-9_]+$/),
  isDisabled: not('isValidGuessLen'),

  // acts as setInterval which reset every set time interval
  init() {
      this._super(...arguments);

      if(score) {
        this.set('score', score);
      }

        later(this, function() {
          if (round < MAX_ROUNDS) {
            round = parseInt(round) + 1;
            roundStore.set(round);

            // save score and name to database
            if (round == MAX_ROUNDS) {
              // score = score.toString();
              // save score and name to database
              var record = this.store.createRecord('user', {
                username: username,
                score: score
              });
              record.save().then(function() {
                //clear session storage
                scoreStore.set(0);
                roundStore.set(0);
                // this.send('transition');
                window.location.reload();
                //swtich to scoreboard
              });

            } else {
              //refresh page
              window.location.reload();
            }

          }
      }, GAME_TIME_MS);
  },
  actions: {
    transition() {
      this.transitionToRoute('scoreboard');
    },
    //checks whether guess is correct/incorrect
    sendGuess() {
      // this.send('transition');
      // this.transitionToRoute('scoreboard');
      var list = this.get('model')[0].tagList;

      /**Correct**/
      console.log("this is guess: ", this.get('guess'));
      if (list.includes(this.get('guess')) == true) {
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
                //swtich to scoreboard
                this.transitionTo('scoreboard');
              });

            } else {
              //refresh page
              this.transitionToRoute('scoreboard');
                // window.location.reload();
              // this.get('model').reload();
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
