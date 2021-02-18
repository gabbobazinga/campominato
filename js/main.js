var RANDOM_NUMBERS = 16;
var MIN_BOUND = 1;
var MAX_BOUND_EASY = 100;
var MAX_BOUND_MEDIUM = 64;
var MAX_BOUND_HARD = 36;
var SLOT_WIDTH_EASY = 10;
var SLOT_WIDTH_MEDIUM = 8;
var SLOT_WIDTH_HARD = 6;
var maxBound;
var slotWidth;
var flag = 3;
var isEnd = false;
var restart = false;
var win = 0;
var lose = 0;
document.getElementById('restart').style.display = 'none';

// //DIFFICULTY BUTTON
var difficultyBtn = document.getElementsByTagName('button');

//Find value onClick button
for(var j = 0; j < difficultyBtn.length; j++) {

  difficultyBtn[j].addEventListener('click', function(event){
    var rounds = 16;
    var attempts = 3;
    document.getElementById('attempts').innerHTML = 'TENTATIVI RIMASTI: ' + attempts;
    document.getElementById('rounds').innerHTML = 'VINCI TRA ' + rounds + ' MOSSE';
    document.getElementById('results').style.display = 'none';
    document.getElementById('restart').style.display = 'none';

    restart = true;
    //funtion for check & remove all slots
    for(var k = 0; k < maxBound; k++){
      checkAndRemove('dashboard');
    }

    var diffBtnValue = event.target.value;
    if(diffBtnValue == 'easy'){
      maxBound = MAX_BOUND_EASY;
      slotWidth = SLOT_WIDTH_EASY;
      console.log(maxBound + ' ' + slotWidth);
    } else if (diffBtnValue == 'medium') {
      maxBound = MAX_BOUND_MEDIUM;
      slotWidth = SLOT_WIDTH_MEDIUM;
      console.log(maxBound + ' ' +  slotWidth);
    } else {
      maxBound = MAX_BOUND_HARD;
      slotWidth = SLOT_WIDTH_HARD;
      console.log(maxBound + ' ' + slotWidth);
    }


    //MINES GENERATION
    var mines = minesGeneration (RANDOM_NUMBERS, MIN_BOUND , maxBound);
    console.log(mines);

    //CREATE DASHBOARD IN HTML && ADD VALUE && CLASS
    for (var i = 0; i < maxBound; i++ ) {
      var newSlotEl = document.createElement('div');
      newSlotEl.className = 'slot';
      newSlotEl.value = i + 1;
      newSlotEl.style.width = 'calc(100% /' + slotWidth + ' )';
      document.querySelector('.dashboard').appendChild(newSlotEl);

      var slotsEl = document.querySelectorAll('.dashboard > *');

      slotsEl[i].addEventListener('click', function(event){
        if(restart) {
          rounds = 16;
          attempts = 3;
          slotWidth;
          flag = 3;
          restart = false;
          isEnd = false;
        }

        if(!isEnd) {
          var slotValue = parseInt(event.target.value);

          if (rounds > 0 && attempts > 0) {
            if(isNumberInArray(slotValue, mines)) {
              event.target.style.backgroundColor = 'red';
              event.target.style.backgroundImage = "url('img/bomb.png')";
              attempts--;
              document.getElementById('attempts').innerHTML = 'TENTATIVI RIMASTI: ' + attempts;
            } else {
              event.target.style.backgroundColor = 'green';
              event.target.style.backgroundImage = "url('img/flower.png')";
              rounds--;
              document.getElementById('rounds').innerHTML = 'VINCI TRA ' + rounds + ' MOSSE';
            }
          }

          if (rounds == 0){
            document.getElementById('results').style.display = 'block';
            document.getElementById('restart').style.display = 'block';
            document.getElementById('results').innerHTML = 'YOU WIN!';
            document.getElementById('score').style.display = 'block';
            win++;
            isEnd = true;
          } else if (attempts == 0){
            document.getElementById('results').style.display = 'block';
            document.getElementById('restart').style.display = 'block';
            document.getElementById('results').innerHTML = 'YOU LOSE!';
            document.getElementById('score').style.display = 'block';
            lose++;
            isEnd = true;
          }
        }
        document.getElementById('win').innerHTML = 'WIN: ' + win;
        document.getElementById('lose').innerHTML = 'LOSE: ' + lose;
      })

      slotsEl[i].addEventListener('contextmenu', function(event){
        event.preventDefault();
        if (flag != 0 && !isEnd) {
          event.target.style.backgroundColor = 'lightyellow';
          event.target.style.backgroundImage = "url('img/flag.png')";
          flag--;
        }
      })
    }
  })
}
