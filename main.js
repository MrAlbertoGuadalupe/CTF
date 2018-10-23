const board = document.querySelector('.board');
const sprite = document.querySelector('.sprite');

const plyr1 = {
  x: 0,
  y: 0
};


const platforms = [{
  x: 2,
  y: 2
}, {
  x: 2,
  y: 4
}, {
  x: 6,
  y: 2
},{
  x: 6,
  y: 4
}

];

const createplatform = () => {
  for (let i = 0; i < platforms.length; i += 1) {
    const platform = platforms[i];
    const platformElement = document.createElement('div');
    platformElement.className = 'platform';
    platformElement.style.left = (platform.x * 1).toString() + 'px';
    platformElement.style.top = (platform.y * 1).toString() + 'px';
    board.appendChild(platformElement);
  }
}

createplatform();
document.addEventListener('keydown', evt => {
  if ([65, 87, 83].includes(evt.keyCode)) {
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
  }
});


const boardCheck = (x, y) => {
  if (x < 0 || y < 0 || x > 1000 || y > 600) { //cant go any further left than 0, can't go any further right than 3, can't go any further down than 3
    return false;
  }
  return true;
}
const platformCheck = (x, y) => {
  for (let i = 0; i < platforms.length; i += 1) {
    const platform = platforms[i];
    if (platform.x === x && platform.y === y) {
      return true;
    }
  }
  return false;
};
// const canMoveTo = (x, y) => {
//   if (!isCoordinateInGrid(x, y)) {
//     return false;
//   }
//   if (isThereARockAt(x, y)) {
//     return false;
//   }
//   return true;
// };
const movePossible = (x, y) => {
  if (!boardCheck(x, y)) {
    return false;
  }
  if (platformCheck(x, y)) {
    return false;
  }
  return true;
};

const movesprite = (x, y) => {
  sprite.style.left = (x * 1).toString() + 'px';
  sprite.style.top = (y * 1).toString() + 'px';
}

const moveRight = () => {
  if (movePossible(plyr1.x + 1, plyr1.y)) {
    plyr1.x += 1;
    movesprite(plyr1.x, plyr1.y);
  }
}
const moveLeft = () => {
  if (movePossible(plyr1.x - 1, plyr1.y)) {
    plyr1.x -= 1;
    movesprite(plyr1.x, plyr1.y);
  }
}
const moveDown = () => {
  if (movePossible(plyr1.x, plyr1.y + 1)) {
    plyr1.y += 1;
    movesprite(plyr1.x, plyr1.y);
  }
}
const moveUp = () => {
  if (movePossible(plyr1.x, plyr1.y - 1)) {
    plyr1.y -= 1;
    movesprite(plyr1.x, plyr1.y);
  }
}
let gravity = setInterval(moveDown, 100);
