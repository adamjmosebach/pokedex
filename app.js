// console.log('hello world');
 
const userInput = document.querySelector('#nameNum');
const form = document.querySelector('#nameNumSelect')

// console.log(userInput);
// console.log(button);
// console.log(form);

function displayData(pokeData) {
  
  //Reset input box
  userInput.value = '';

  //Display main information & image
  const pokeNum = document.createElement('h3');
  pokeNum.innerText = `# ${pokeData.id}`;
  const pokeName = document.createElement('h1');
  const pokeLowerName = pokeData.name;
  const nameArr = pokeLowerName.split('');
  nameArr[0] = nameArr[0].toUpperCase();
  pokeCapital = nameArr.join('');
  if (pokeCapital === 'Mr-mime') {
    pokeCapital = 'Mr. Mime';
  }
  if (pokeCapital === 'Mime-jr') {
    pokeCapital = 'Mime Jr.';
  }
  pokeName.innerText = pokeCapital;
  const pokeImg = document.createElement('img');
  pokeImg.src = `https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`;
  pokeImg.classList = 'pokePic';
  const movesHeader = document.createElement('h3');
  movesHeader.innerText = `Here are some of ${pokeCapital}'s popular moves:`
  const movesArr = pokeData.moves;
  const movesList = document.createElement('ul');
  movesList.id = 'movesList';
  
  //Append
  const display = document.querySelector('#display');
  display.append(pokeNum, pokeName, pokeImg, movesHeader, movesList);
  
  //Display moveset
  if (movesArr.length < 5) {
    for (let i = 0; i < movesArr.length; i++) {
      displayMoves(movesArr, i);
    }
  } else {
    for (let i = 0; i < 5; i++) {
      displayMoves(movesArr, i);
    }
  }

  //Display types
  const typesDiv = document.querySelector('#types');
  const pokeTypeHeader = document.createElement('h3');
  pokeTypeHeader.innerText = `${pokeCapital} is the following type(s):`
  const pokeTypeList = document.createElement('ul');
  typesDiv.append(pokeTypeHeader, pokeTypeList);

  //Good-Week Section
  const goodWeak = document.querySelector('#good-weak');

  //Add good button
  const goodButton = document.createElement('div');
  goodButton.classList = 'battle-button';
  goodButton.id = 'good-button';
  goodButton.innerText = 'Good Against';
  const goodDisplayCreate = document.createElement('div');
  goodDisplayCreate.id = 'good-display';
  goodWeak.append(goodButton, goodDisplayCreate);

  //Add weak button
  const weakButton = document.createElement('div');
  weakButton.classList = 'battle-button';
  weakButton.id = 'weak-button';
  weakButton.innerText = 'Weak Against';
  const weakDisplayCreate = document.createElement('div');
  weakDisplayCreate.id = 'weak-display';
  goodWeak.append(weakButton, weakDisplayCreate);
  // weakButton.addEventListener('click', () => {

  // })
 
  
  const typesArr = pokeData.types;
  for (let i = 0; i < typesArr.length; i++) {
    //console.log(typesArr[i].type.name);

    const pokeType = typesArr[i].type.name

    const createTypeItem = document.createElement('li')
   
    //console.log(pokeType);
    createTypeItem.textContent = pokeType;
    goodWeakOutcomes(pokeType);
    typesDiv.append(createTypeItem);
  }
  
}


async function goodWeakOutcomes(pokeType) {
  try {
    const typesObj = await axios.get('https://pokeapi.co/api/v2/type');
    //console.log(typeObj);
    const typeDataArr = typesObj.data.results;
    //console.log(typeDataArr);
    console.log(pokeType);
    for (let i = 0; i < typeDataArr.length; i++) {
      //console.log(typeDataArr[i].name);
      if (typeDataArr[i].name === pokeType) {

        const bestAgainstHeader = document.createElement('h4');
        bestAgainstHeader.innerText = `${pokeType} types are best against:`;
        const bestList = document.createElement('ul');
        bestList.id = `best-against-${pokeType}`;
        const goodSection = document.querySelector('#good-display');
        goodSection.append(bestAgainstHeader, bestList);

        const weakestAgainstHeader = document.createElement('h4');
        weakestAgainstHeader.innerText = `${pokeType} types are weakest against:`;
        const weakestList = document.createElement('ul');
        weakestList.id = `weak-against-${pokeType}`;
        const weakSection = document.querySelector('#weak-display');
        weakSection.append(weakestAgainstHeader, weakestList);

        console.log(`${typeDataArr[i].name} is indici ${i}`);
        const typeUrl = typeDataArr[i].url;
        getTypeData(typeUrl, pokeType);
      }
    }
  }
  catch (err) {
    console.log(`My error is ${err}`);
  }
}

async function getTypeData(typeUrl, pokeType) {
  try {
    const typeObj = await axios.get(typeUrl);
    console.log(typeObj);
    //const createBest = document.createElement()
    
    //Display 'best against' data
    const bestAgainstArr = typeObj.data.damage_relations.double_damage_to;
    for (let i = 0; i < bestAgainstArr.length; i++) {
      console.log(`Best against: ${bestAgainstArr[i].name}`);
      const bestAgainstItem = document.createElement('li');
      bestAgainstItem.textContent = `${bestAgainstArr[i].name}`;
      const bestList = document.querySelector(`#best-against-${pokeType}`);
      bestList.append(bestAgainstItem);
    }

    //Display 'weak against' data
    const weakestAgainstArr = typeObj.data.damage_relations.double_damage_from;
    console.log('weakestAgainstArr = ' + weakestAgainstArr);
    for (let i = 0; i < weakestAgainstArr.length; i++) {
      console.log(`Worst against: ${weakestAgainstArr[i].name}`);
      const weakestAgainstItem = document.createElement('li');
      weakestAgainstItem.textContent = `${weakestAgainstArr[i].name}`;
      const weakestList = document.querySelector(`#weak-against-${pokeType}`);
      weakestList.append(weakestAgainstItem);
    }

  }
  catch (err) {
    console.log(`My error is: ${err}`);
  }
}

function displayMoves(movesArr, i) {
  const movesList = document.querySelector('#movesList');
  const move = document.createElement('li');
  const rawMove = movesArr[i].move.name;
  const moveNoSpaces = rawMove.replace('-', ' ');
  move.textContent = moveNoSpaces;
  //console.log(movesArr[i].move.name);
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
    if (input == 'mr. mime' || input == 'Mr. Mime' || input == 'mr mime' || input == 'Mr Mime') {
      input = 'mr-mime';
    }
    if (input == 'mime jr' || input == 'Mime Jr' || input == 'mime jr.' || input == 'Mime Jr.') {
      input = 'mime-jr';
    }
    const url = `https://pokeapi.co/api/v2/pokemon/${input}`
    const pokeObj = await axios.get(url);
    //console.log(pokeObj);
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
  const typesDiv = document.querySelector('#types');
  while (typesDiv.lastChild) {
    typesDiv.lastChild.remove()
  }
  const goodWeak = document.querySelector('#good-weak');
  while (goodWeak.lastChild) {
    goodWeak.lastChild.remove()
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  removeData();
  //console.log(userInput.value);
  getData(userInput.value);
})