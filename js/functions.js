
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

function checkAndRemove (elementID) {
  //CHECK IF THERE'S SLOTS
  var hasChild = document.getElementById(elementID).hasChildNodes();
  console.log('ha figli? ' + hasChild);

  //DELETE SLOTS
  if(hasChild) {
    var oldSlot = document.getElementById(elementID);
    oldSlot.removeChild(oldSlot.childNodes[0]);
  }
  return;
}
