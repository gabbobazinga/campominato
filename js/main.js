var RANDOM_NUMBERS = 16;
var MIN_BOUND = 1;
var MAX_BOUND_EASY = 100;
var MAX_BOUND_MEDIUM = 64;
var MAX_BOUND_HARD = 36;
var rounds = 16;
var attempts = 3;

document.getElementById('attempts').innerHTML += attempts;
document.getElementById('rounds').innerHTML += rounds + ' MOSSE';

//CREATE DASHBOARD EASY IN HTML
for (var i = 0; i < MAX_BOUND_EASY; i++ ) {
  var newSlotEl = document.createElement('div');
  newSlotEl.className = 'slot';
  document.querySelector('.easy').appendChild(newSlotEl);
}
/*
//CREATE DASHBOARD MEDIUM IN HTML
for (var i = 0; i < MAX_BOUND_MEDIUM; i++ ) {
  var newSlotEl = document.createElement('div');
  newSlotEl.className = 'slot';
  document.querySelector('.easy').appendChild(newSlotEl);
}

//CREATE DASHBOARD HARD IN HTML
for (var i = 0; i < MAX_BOUND_HARD; i++ ) {
  var newSlotEl = document.createElement('div');
  newSlotEl.className = 'slot';
  document.querySelector('.easy').appendChild(newSlotEl);
}
*/

//MINES GENERATION
var mines = minesGeneration (RANDOM_NUMBERS, MIN_BOUND , MAX_BOUND_EASY);
console.log(mines);

var slotsEl = document.querySelectorAll('.easy > *');
for(var i = 0; i < slotsEl.length; i++) {
  slotsEl[i].value = i + 1;

  slotsEl[i].addEventListener('click', function(event){
    var slotValue = parseInt(event.target.value);

    if (rounds > 0 && attempts > 0) {
      if(isNumberInArray(slotValue, mines)) {
        event.target.style.backgroundColor = 'red';
        event.target.style.backgroundImage = "url('img/bomb.png')";
        attempts--;
        document.getElementById('attempts').innerHTML = 'TENTATIVI RIMASTI ' + attempts;
      } else {
        event.target.style.backgroundColor = 'green';
        rounds--;
        document.getElementById('rounds').innerHTML = 'VINCI TRA ' + rounds + ' MOSSE';
      }
    }

    if (rounds == 0){
      document.getElementById('results').innerHTML = 'Hai vinto!';
    } else if (attempts == 0){
      document.getElementById('results').innerHTML = 'Hai perso!';
    }

  })

  slotsEl[i].addEventListener('contextmenu', function(event){
		event.preventDefault();

		event.target.style.backgroundColor = 'lightyellow';
    event.target.style.backgroundImage = "url('img/flag.png')";
	})
}
