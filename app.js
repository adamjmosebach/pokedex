console.log('hello world');

const userInput = document.querySelector('#nameNum');
const button = document.querySelector('#submitter');
const form = document.querySelector('#nameNumSelect')

console.log(userInput);
console.log(button);
console.log(form);

function displayData(pokeData) {
  const pokeNum = document.createElement('h3');
  pokeNum.innerText = pokeData.id;
  const pokeName = document.createElement('h1');
  const pokeLowerName = pokeData.name;
  const nameArr = pokeLowerName.split('');
  nameArr[0] = nameArr[0].toUpperCase();
  pokeCapital = nameArr.join('');
  if (pokeCapital === 'Mr-mime') {
    pokeCapital = 'Mr. Mime';
  }
  pokeName.innerText = pokeCapital;
  console.log('pokeName will be ' + pokeCapital);
  const pokeImg = document.createElement('img');
  pokeImg.src = `https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`;
  pokeImg.classList = 'pokePic';
  const movesHeader = document.createElement('h3');
  movesHeader.innerText = `Here are some of ${pokeCapital}'s popular moves:`
  const movesArr = pokeData.moves;
  const movesList = document.createElement('ul');
  const display = document.querySelector('#display');
  display.append(pokeNum, pokeName, pokeImg, movesHeader, movesList);
  console.log(movesArr);
  if (movesArr.length < 5) {
    for (let i = 0; i < movesArr.length; i++) {
      displayMoves(movesArr, i);
    }
  } else {
    for (let i = 0; i < 5; i++) {
      displayMoves(movesArr, i);
    }
  }

}

function displayMoves(movesArr, i) {
  const movesList = document.querySelector('ul');
  const move = document.createElement('li');
  const rawMove = movesArr[i].move.name;
  const moveNoSpaces = rawMove.replace('-', ' ');
  move.textContent = moveNoSpaces;
  console.log(movesArr[i].move.name);
  movesList.appendChild(move);
}

// async function getImage(pokeData) {
//   try {
//     const pokeNum = pokeData.id;
//     console.log('pokeNum in getImage is a ' + typeof pokeNum);
//     const url = `https://pokeres.bastionbot.org/images/pokemon/${pokeNum}.png`
//     const imageData = await axios.get(url);
//     displayData(pokeData, imageData);
//   }
//   catch (err) {
//     console.log('My error is: ' + err);
//   }
// }

async function getData(input) {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${input}`
    const pokeObj = await axios.get(url);
    console.log(pokeObj);
    const pokeData = pokeObj.data;
    displayData(pokeData);
  }
  catch (err) {
    console.log('My error is: ' + err);
    const errMessage = document.createElement('h1');
    const display = document.querySelector('#display');
    errMessage.innerText = 'Uh oh, that is not a known Pokémon';
    const errImg = document.createElement('img');
    errImg.classList = 'errorBall';
    errImg.src = 'https://i.imgur.com/OuhHR94.png';
    display.append(errMessage, errImg);
  }
}

function removeData() {
  const display = document.querySelector('#display');
  while (display.lastChild) {
    display.lastChild.remove()
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  removeData();
  console.log(userInput.value);
  getData(userInput.value);
})