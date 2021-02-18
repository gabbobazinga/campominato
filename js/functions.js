
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isNumberInArray(num, numArray) {
  for(var i = 0; i < numArray.length; i++) {
    if(num == numArray[i]) {
      return true;
    }
  }
  return false;
}

function minesGeneration (randomsNumbers, min, max) {
  var mines = [];
  while (mines.length < randomsNumbers){
    var actualNumbers = getRandomInt(max, min);
    if(!mines.includes(actualNumbers)) {
      mines.push(actualNumbers);
    }
  }
  return mines;
}
