let gameState = true;
let count = 0;
let gameCount = 0;
let player1 = 0;
let player2 = 0;
let tie = 0;
let board = Array.from({ length: 3 }, () => new Array(3).fill(''));

function playmove(cell){
  if(!gameState){
    reset();
    return;
  }
  let str = '';
  if (gameCount % 2 == 0) {
    if (count % 2 == 0)
      str = 'X';
    else
      str = 'O';
  } else {
    if (count % 2 == 0)
      str = 'O';
    else
      str = 'X';
  }
  if(count%2 == 0){
    var audio = new Audio('public/note-low.mp3');
    audio.play();
  }
  else{
    var audio = new Audio('public/note-high.mp3');
    audio.play();
  }
  const clickedCell = document.querySelector(`.${cell}`);
  if (clickedCell.innerHTML === '') {
    clickedCell.innerHTML = str;
    let x = parseInt(cell[4]);
    let y = parseInt(cell[5]);
    board[x][y] = str;
    count++;
    checkWinner(str, x, y);
  }
}

function reset() {
  const cells = document.querySelectorAll('#board');
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerHTML = '';
    cells[i].style.color = 'rgb(255, 255, 255)';
    cells[i].style.borderColor = 'rgb(255, 255, 255)';
  }
  board = Array.from({ length: 3 }, () => new Array(3).fill(''));
  count = 0;
  gameState = true;
}

function checkWinner(s, x, y) {
  let n = 3;
  // Check row
  for (var i = 0; i < n; i++) {
    if (board[x][i] != s)
      break;
    if (i == n - 1) {
      declareWinner(s,x,'row');
      return;
    }
  }

  // Check column
  for (var i = 0; i < n; i++) {
    if (board[i][y] != s)
      break;
    if (i == n - 1) {
      declareWinner(s,y,'column');
      return;
    }
  }

  // Check diagonal
  if (x == y) {
    for (var i = 0; i < n; i++) {
      if (board[i][i] != s)
        break;
      if (i == n - 1) {
        declareWinner(s,3,'diagonal');
        return;
      }
    }
  }

  // Check anti-diagonal
  if (x + y == n - 1) {
    for (var i = 0; i < n; i++) {
      if (board[i][(n - 1) - i] != s)
        break;
      if (i == n - 1) {
        declareWinner(s,3,'anti');
        return;
      }
    }
  }
  // Check draw
  if (count == n * n) {
    declareDraw();
  }
}

function declareWinner(s,value,type){
  var audio = new Audio('public/game-over.mp3');
  audio.play();
  if(s=='X'){
    animations(value,type);
    updateScore('player1');
  }
  else{
    animations(value,type);
    updateScore('player2');
  }
  gameState = false;
}

function animations(value,type){
  const cells = document.querySelectorAll('#board');
  let i = 0;
  if(type=='column'){
    for (var j = value; j < cells.length; j+=3) {
      if(value%3==0){
        cells[j+1].style.color = 'rgba(255, 255, 255, 0.25)';
        cells[j+2].style.color = 'rgba(255, 255, 255, 0.25)';
      }
      else if(value%3==1){
        cells[j+1].style.color = 'rgba(255, 255, 255, 0.25)';
        cells[j-1].style.color = 'rgba(255, 255, 255, 0.25)';
      }
      else if(value%3==2){
        cells[j-2].style.color = 'rgba(255, 255, 255, 0.25)';
        cells[j-1].style.color = 'rgba(255, 255, 255, 0.25)';
      }
    }
    function animate(){
      if(value<3){
        for (var j = value; j < cells.length; j+=3) {
          if (i % 2 == 0) {
            cells[j].style.color = 'rgba(255, 255, 255, 0.25)';
          } else {
            cells[j].style.color = 'rgb(255, 255, 255)';
          }
        }
      }
      else if(value>=3 && value<6){
        if (i % 2 == 0) {
          cells[value+3].style.color = 'rgba(255, 255, 255, 0.25)';
          cells[value].style.color = 'rgba(255, 255, 255, 0.25)';
          cells[value-3].style.color = 'rgba(255, 255, 255, 0.25)';
        } else {
          cells[value+3].style.color = 'rgb(255, 255, 255)';
          cells[value].style.color = 'rgb(255, 255, 255)';
          cells[value-3].style.color = 'rgb(255, 255, 255)';
        }
      }
      else if(value>=6){
        for (var j = value; j >= 0; j-=3) {
          if (i % 2 == 0) {
            cells[j].style.color = 'rgba(255, 255, 255, 0.25)';
          } else {
            cells[j].style.color = 'rgb(255, 255, 255)';
          }
        }
      }
      i++;
      if (i <= 5) {
        setTimeout(animate, 100); // Adjust the delay (in milliseconds) as needed
      } else {
        return;
      }
    }
    animate();
  }
  else if(type=='row'){
    if(value==0){
      for (var j = 3; j < cells.length; j++) {
        cells[j].style.color = 'rgba(255, 255, 255, 0.25)';
      }
    }
    else if(value==1){
      for (var j = 6; j < cells.length; j++) {
        cells[j].style.color = 'rgba(255, 255, 255, 0.25)';
      }
      for (var j = 2; j >=0; j--) {
        cells[j].style.color = 'rgba(255, 255, 255, 0.25)';
      }
    }
    else if(value==2){
      for (var j = 5; j >= 0; j--) {
        cells[j].style.color = 'rgba(255, 255, 255, 0.25)';
      }
    }
    function animate() {
      for(var j = value*3; j<(value*3)+3;j++){
        if (i % 2 == 0) {
          cells[j].style.color = 'rgba(255, 255, 255, 0.25)';
        } else {
          cells[j].style.color = 'rgb(255, 255, 255)';
        }
      }
      i++;
      if (i <= 5) {
        setTimeout(animate, 100); // Adjust the delay (in milliseconds) as needed
      } else {
        return;
      }
    }
    animate();
  }
  else if(type=='diagonal'){
    cells[1].style.color = 'rgba(255, 255, 255, 0.25)';
    cells[2].style.color = 'rgba(255, 255, 255, 0.25)';
    cells[3].style.color = 'rgba(255, 255, 255, 0.25)';
    cells[5].style.color = 'rgba(255, 255, 255, 0.25)';
    cells[6].style.color = 'rgba(255, 255, 255, 0.25)';
    cells[7].style.color = 'rgba(255, 255, 255, 0.25)';
    function animate() {
      if (i % 2 == 0) {
        cells[0].style.color = 'rgba(255, 255, 255, 0.25)';
        cells[4].style.color = 'rgba(255, 255, 255, 0.25)';
        cells[8].style.color = 'rgba(255, 255, 255, 0.25)';
      } else {
        cells[0].style.color = 'rgb(255, 255, 255)';
        cells[4].style.color = 'rgb(255, 255, 255)';
        cells[8].style.color = 'rgb(255, 255, 255)';
      }
      i++;
      if (i <= 5) {
        setTimeout(animate, 100); // Adjust the delay (in milliseconds) as needed
      } else {
        return;
      }
    }
    animate();
  }
  else if(type=='anti'){
    cells[0].style.color = 'rgba(255, 255, 255, 0.25)';
    cells[1].style.color = 'rgba(255, 255, 255, 0.25)';
    cells[3].style.color = 'rgba(255, 255, 255, 0.25)';
    cells[4].style.color = 'rgba(255, 255, 255, 0.25)';
    cells[5].style.color = 'rgba(255, 255, 255, 0.25)';
    cells[8].style.color = 'rgba(255, 255, 255, 0.25)';
    function animate() {
      if (i % 2 == 0) {
        cells[2].style.color = 'rgba(255, 255, 255, 0.25)';
        cells[4].style.color = 'rgba(255, 255, 255, 0.25)';
        cells[6].style.color = 'rgba(255, 255, 255, 0.25)';
      } else {
        cells[2].style.color = 'rgb(255, 255, 255)';
        cells[4].style.color = 'rgb(255, 255, 255)';
        cells[6].style.color = 'rgb(255, 255, 255)';
      }
      i++;
      if (i <= 5) {
        setTimeout(animate, 100); // Adjust the delay (in milliseconds) as needed
      } else {
        return;
      }
    }
    animate();
  }
}

function declareDraw() {
  var audio = new Audio('public/game-over-tie.mp3');
  audio.play();
  const cells = document.querySelectorAll('#board');
  for (var j = 0; j < cells.length; j++) {
    cells[j].style.color = 'rgba(255, 255, 255, 0.25)';
  }
  let i = 0;
  function animate() {
    for (var j = 0; j < cells.length; j++) {
      if (i % 2 == 0) {
        cells[j].style.borderColor = 'rgba(255, 255, 255, 0.25)';
      } else {
        cells[j].style.borderColor = 'rgb(255, 255, 255)';
      }
    }
    i++;
    if (i <= 5) {
      setTimeout(animate, 100); // Adjust the delay (in milliseconds) as needed
    } else {
      return;
    }
  }
  animate();
  updateScore('tie');
  gameState = false;
}

function updateScore(result){
  const updation = document.querySelector(`#${result}`);
  console.log(updation);
  if(result=='tie'){
    tie++;
    console.log(tie);
    updation.innerHTML = String(tie);
  }
  else if(result=='player1'){
    player1++;
    updation.innerHTML = String(player1);
  }
  else if(result=='player2'){
    player2++;
    updation.innerHTML = String(player2);
  }
  gameCount++;
}

document.addEventListener("keydown",function(event){
  if(event.key==' ' || event.key=='Enter' && !gameState){
    reset();
  }
})

document.addEventListener("keydown", function(event) {
  if ((event.key === ' ' || event.key === 'Enter') && event.target.id === 'board') {
    event.preventDefault();
  }
});

document.addEventListener("click", function(event){
  if(!gameState && event.target.id !== 'board')
    reset();
});