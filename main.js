const board = document.querySelector('.board');
const sprite = document.querySelector('.sprite');
const sprite2 = document.querySelector('.sprite2');
let redScoreboard = document.querySelector('.redScore');
let blueScoreboard = document.querySelector('.blueScore');
let flagCaptured = new Audio('flagcaptured.mp3');
let blueScore = new Audio('bluescore.mp3');
let blueWin = new Audio('bluewin.mp3');
let redWin = new Audio('redwin.mp3');
let redScore = new Audio('redscore.mp3');
let steal = new Audio('punch.mp3');


let plyr1 = {
  x: 0,
  y: 0,
  value: 0,
  score: 0,
};

let plyr2 = {
  x: 18,
  y: 11,
  value: 0,
  score: 0
};
blueScoreboard.innerText = `Score ${plyr2.score} `
redScoreboard.innerText = `Score ${plyr1.score} `
const platforms = [{
    x: 1,
    y: 0
  },

  {
    x: 1,
    y: 3
  },

  {
    x: 1,
    y: 5
  },
  {
    x: 2,
    y: 4
  }, {
    x: 7,
    y: 2
  }, {
    x: 7,
    y: 4
  },
  {
    x: 3,
    y: 3
  }, {
    x: 2,
    y: 2
  },
  {
    x: 6,
    y: 3
  }, {
    x: 4,
    y: 1
  }, {
    x: 4,
    y: 5
  }, {
    x: 5,
    y: 1
  }, {
    x: 5,
    y: 5
  }, {
    x: 8,
    y: 0
  },
  {
    x: 8,
    y: 3
  }, {
    x: 8,
    y: 5
  },


];
let flags = [{
  x: 9,
  y: 6
}];

const createPlatform = () => {
  for (let i = 0; i < platforms.length; i += 1) {
    const platform = platforms[i];
    const platformElement = document.createElement('div');
    platformElement.className = 'platform';
    platformElement.style.left = (platform.x * 100).toString() + 'px';
    platformElement.style.top = (platform.y * 100).toString() + 'px';
    board.appendChild(platformElement);
  }
}
const createFlags = () => {
  for (let i = 0; i < flags.length; i += 1) {
    const flag = flags[i];
    const flagElement = document.createElement('div');
    flagElement.className = 'flag';
    flagElement.style.left = (flag.x * 50).toString() + 'px';
    flagElement.style.top = (flag.y * 50).toString() + 'px';
    board.appendChild(flagElement);
  }
}

createPlatform();
createFlags();

document.addEventListener('keyup', evt => {
  if ([65, 87, 83, 90].includes(evt.keyCode)) {
    evt.preventDefault();
  }
  switch (evt.keyCode) {
    case 65:
      moveLeft();
      break;
    case 87:
      moveUp();
      break;
    case 83:
      moveRight();
      break;
    case 90:
      moveDown();
      break;
    case 75:
      moveLeft1();
      break;
    case 79:
      moveUp1();
      break;
    case 76:
      moveRight1();
      break;
    case 77:
      moveDown1();
      break;
  }
});

const moveSprite = (x, y) => {
  sprite.style.left = (x * 50).toString() + 'px';
  sprite.style.top = (y * 50).toString() + 'px';
  sprite.style.transition = "all 0.2s";
  if (flagCheck(x, y)) {
    grabFlags(x, y);
    displayFlags();
    plyr1.value += 1;
    sprite.style.backgroundImage = "url('redflag.png')";
    flagCaptured.play();
  }

  if (x === 0 && plyr1.value === 1) {
    if (plyr1.score === 4) {
      winRed();
      plyr1.score += 1;
      redScoreboard.innerText = `Score ${plyr1.score} `
    } else {
      sprite.style.backgroundImage = "url('red.png')";
      plyr1.value = 0;
      plyr1.score += 1;
      redScore.play();
      redScoreboard.innerText = `Score ${plyr1.score} `
      flags = [{
        x: 9,
        y: 6
      }];
      createFlags();
    }
  }
}

const moveSprite2 = (x, y) => {
  sprite2.style.left = (x * 50).toString() + 'px';
  sprite2.style.top = (y * 50).toString() + 'px';
  sprite2.style.transition = "all 0.2s";
  if (flagCheck(x, y)) {
    grabFlags(x, y);
    displayFlags();
    plyr2.value += 1;
    sprite2.style.backgroundImage = "url('blueflag.png')";
    flagCaptured.play();
  }


  if (x === 18 && plyr2.value === 1) {
    if (plyr2.score === 4) {
      winBlue();
      plyr2.score += 1;
      redScoreboard.innerText = `Score ${plyr2.score} `
    } else {

      sprite2.style.backgroundImage = "url('blue.png')";
      plyr2.value = 0;
      plyr2.score += 1;
      blueScore.play();
      blueScoreboard.innerText = `Score ${plyr2.score} `
      flags = [{
        x: 9,
        y: 6
      }];
      createFlags();
    }
  }
}

function winBlue() {
  board.innerHTML = `BLUE TEAM WINS`
  let winElementblue = document.createElement('div');
  document.querySelector('.board').appendChild(winElementblue);
  winElementblue.className = 'windanceblue';
  blueWin.play();
}

function winRed() {
  board.innerHTML = `RED TEAM WINS`
  let winElement = document.createElement('div');
  document.querySelector('.board').appendChild(winElement);
  winElement.className = 'windance';
  redWin.play();
}

const displayFlags = () => {
  const flagElement = document.querySelectorAll('.flag');
  for (let i = 0; i < flagElement.length; i += 1) {
    flagElement[i].remove();
  }
  for (let i = 0; i < flags.length; i += 1) {
    const flag = flags[i];
    const flagElement = document.createElement('div');
    flagElement.className = "flag";
    flagElement.style.left = (x * 100).toString() + 'px';
    flagElement.style.top = (y * 100).toString() + 'px';
    document.querySelector('.board').appendChild(flagElement);
  }
};

const boardCheck = (x, y) => {
  if (x < 0 || y < 0 || x > 18 || y > 11) {
    return false;
  }
  return true;
}
const platformCheck = (x, y) => {
  for (let i = 0; i < platforms.length; i += 1) {
    let platform = platforms[i];

    if (platform.x === x / 2 && platform.y === y / 2) {
      return true;
    }
  }
  return false;
};
const flagCheck = (x, y) => {
  for (let i = 0; i < flags.length; i += 1) {
    const flag = flags[i];
    if (flag.x === x && flag.y === y) {
      return true;
    }
  }
  return false;
};
const grabFlags = (x, y) => {
  for (let i = 0; i < flags.length; i += 1) {
    const flag = flags[i];
    if (flag.x === x && flag.y === y) {
      flags.splice(i, 1)
    }
  }
};

const movePossible = (x, y) => {
  if (!boardCheck(x, y)) {
    return false;
  }
  if (platformCheck(x, y)) {
    return false;
  }
  if (flagCheck(x, y)) {

  }
  return true;
};



const moveRight = () => {
  if (movePossible(plyr1.x + 1, plyr1.y)) {
    plyr1.x += 1;
    moveSprite(plyr1.x, plyr1.y);
  }
}
const moveLeft = () => {
  if (movePossible(plyr1.x - 1, plyr1.y)) {
    plyr1.x -= 1;
    moveSprite(plyr1.x, plyr1.y);
  }
}
const moveDown = () => {
  if (movePossible(plyr1.x, plyr1.y + 1)) {
    plyr1.y += 1;
    moveSprite(plyr1.x, plyr1.y);
  }
}
const moveUp = () => {
  if (movePossible(plyr1.x, plyr1.y - 1)) {
    plyr1.y -= 1;
    moveSprite(plyr1.x, plyr1.y);
  }
}
const moveRight1 = () => {
  if (movePossible(plyr2.x + 1, plyr2.y)) {
    plyr2.x += 1;
    moveSprite2(plyr2.x, plyr2.y);
  }
}
const moveLeft1 = () => {
  if (movePossible(plyr2.x - 1, plyr2.y)) {
    plyr2.x -= 1;
    moveSprite2(plyr2.x, plyr2.y);
  }
}
const moveDown1 = () => {
  if (movePossible(plyr2.x, plyr2.y + 1)) {
    plyr2.y += 1;
    moveSprite2(plyr2.x, plyr2.y);
  }
}
const moveUp1 = () => {
  if (movePossible(plyr2.x, plyr2.y - 1)) {
    plyr2.y -= 1;
    moveSprite2(plyr2.x, plyr2.y);
  }
}

setInterval(checkDiv, 1);

function checkDiv() {
  let p1 = document.getElementsByClassName('sprite');
  let p2 = document.getElementsByClassName('sprite2');

  p1.top = $(p1).offset().top;
  p1.left = $(p1).offset().left;
  p1.right = Number($(p1).offset().left) + Number($(p1).width());
  p1.bottom = Number($(p1).offset().top) + Number($(p1).height());

  p2.top = $(p2).offset().top;
  p2.left = $(p2).offset().left;
  p2.right = Number($(p2).offset().left) + Number($(p2).width());
  p2.bottom = Number($(p2).offset().top) + Number($(p2).height());
  if (p1.right > p2.left && p1.left < p2.right && p1.top < p2.bottom && p1.bottom > p2.top) {
    if (plyr1.value === 1 && plyr2.value === 0) {
      plyr2.value = 1;
      plyr1.value = 0;
      sprite.style.backgroundImage = "url('red.png')";
      sprite2.style.backgroundImage = "url('blueflag.png')";
      steal.play();
    } else if (plyr1.value === 0 && plyr2.value === 1) {
      plyr2.value = 0;
      plyr1.value = 1;
      sprite.style.backgroundImage = "url('redflag.png')";
      sprite2.style.backgroundImage = "url('blue.png')";
      steal.play();
    }
  }
}
