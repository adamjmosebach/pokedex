//Some global variables
const userInput = document.querySelector('#nameNum');
const form = document.querySelector('#nameNumSelect')

function displayData(pokeData) {

  //Reset input box
  userInput.value = '';

  //Display main information & image
  const card = document.querySelector('#left-panel');
  card.classList = 'poke-card';
  const pokeNum = document.createElement('h2');
  pokeNum.innerText = `# ${pokeData.id}`;
  const pokeName = document.createElement('h1');
  const pokeLowerName = pokeData.name;
  const nameArr = pokeLowerName.split('');
  nameArr[0] = nameArr[0].toUpperCase();
  pokeCapital = nameArr.join('');
  //Deals with the two pokemon that have dashes-for-spaces in API
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
  const displayHeader = document.querySelector('#displayHeader');
  displayHeader.append(pokeName, pokeNum);
  const picSection = document.querySelector('#picSection');
  picSection.append(pokeImg);
  const movesSection = document.querySelector('#movesSection');
  movesSection.append(movesHeader, movesList);

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
  pokeTypeHeader.innerText = `${pokeCapital} is the following type(s):`;
  const pokeTypeList = document.createElement('ul');
  pokeTypeList.id = 'pokeTypeList';
  typesDiv.append(pokeTypeHeader, pokeTypeList);

  //Good-Week Section
  const goodWeak = document.querySelector('#good-weak');

  //Add good button & hidden display area
  const goodButtonCreate = document.createElement('div');
  goodButtonCreate.classList = 'battle-button';
  goodButtonCreate.id = 'good-button';
  goodButtonCreate.innerText = 'Good Against';
  const goodDisplayCreate = document.createElement('div');
  goodDisplayCreate.id = 'good-display';
  goodDisplayCreate.classList = 'display-hidden';
  goodWeak.append(goodButtonCreate, goodDisplayCreate);

  //Event listener for good button
  const goodButton = document.querySelector('#good-button');
  goodButton.addEventListener('click', () => {
    const goodDisplay = document.querySelector('#good-display');
    goodDisplay.classList.toggle('display-hidden');
  });

  //Add weak button & hidden display area
  const weakButtonCreate = document.createElement('div');
  weakButtonCreate.classList = 'battle-button';
  weakButtonCreate.id = 'weak-button';
  weakButtonCreate.innerText = 'Weak Against';
  const weakDisplayCreate = document.createElement('div');
  weakDisplayCreate.id = 'weak-display';
  weakDisplayCreate.classList = 'display-hidden';
  goodWeak.append(weakButtonCreate, weakDisplayCreate);

  //Event listener for weak button
  const weakButton = document.querySelector('#weak-button');
  weakButton.addEventListener('click', () => {
    const weakDisplay = document.querySelector('#weak-display');
    weakDisplay.classList.toggle('display-hidden');
  });

  //Display: Type(s) / Good against / Weak against
  const typesArr = pokeData.types;
  for (let i = 0; i < typesArr.length; i++) {
    const pokeType = typesArr[i].type.name;
    const createTypeItem = document.createElement('li');
    createTypeItem.textContent = pokeType;
    goodWeakOutcomes(pokeType);
    const pokeTypeList = document.querySelector('#pokeTypeList');
    pokeTypeList.append(createTypeItem);
  }
}

//Finds what each type this pokemon is and sets the stage
async function goodWeakOutcomes(pokeType) {
  try {
    const typesObj = await axios.get('https://pokeapi.co/api/v2/type');
    const typeDataArr = typesObj.data.results;
    for (let i = 0; i < typeDataArr.length; i++) {
      if (typeDataArr[i].name === pokeType) {

        //Sets up 'Good Against' section
        const bestAgainstHeader = document.createElement('h4');
        bestAgainstHeader.innerText = `${pokeType} types are best against:`;
        const bestList = document.createElement('ul');
        bestList.id = `best-against-${pokeType}`;
        const goodSection = document.querySelector('#good-display');
        goodSection.append(bestAgainstHeader, bestList);

        //Sets up 'Weak Against' section
        const weakestAgainstHeader = document.createElement('h4');
        weakestAgainstHeader.innerText = `${pokeType} types are weakest against:`;
        const weakestList = document.createElement('ul');
        weakestList.id = `weak-against-${pokeType}`;
        const weakSection = document.querySelector('#weak-display');
        weakSection.append(weakestAgainstHeader, weakestList);

        //Gets each type's url and passes it to getTypeData
        const typeUrl = typeDataArr[i].url;
        getTypeData(typeUrl, pokeType);
      }
    }
  }
  catch (err) {
    console.log(`My error is ${err}`);
  }
}

//For each type, lists out which types it is good and weak against
async function getTypeData(typeUrl, pokeType) {
  try {
    const typeObj = await axios.get(typeUrl);

    //Displays what each type deals double damge to
    const bestAgainstArr = typeObj.data.damage_relations.double_damage_to;
    if (bestAgainstArr.length != 0) {
      for (let i = 0; i < bestAgainstArr.length; i++) {
        const bestAgainstItem = document.createElement('li');
        bestAgainstItem.textContent = `${bestAgainstArr[i].name}`;
        const bestList = document.querySelector(`#best-against-${pokeType}`);
        bestList.append(bestAgainstItem);
      }
    } else {
      //Accounting for Normal type: which does not deal double damage to anyone, so must move to half damage
      const secondBestAgainstArr = typeObj.data.damage_relations.half_damage_to;
      for (let i = 0; i < secondBestAgainstArr.length; i++) {
        const secondBestAgainstItem = document.createElement('li');
        secondBestAgainstItem.textContent = `${secondBestAgainstArr[i].name}`;
        const bestList = document.querySelector(`#best-against-${pokeType}`);
        bestList.append(secondBestAgainstItem);
      }
    }

    //Display 'weak against' data
    const weakestAgainstArr = typeObj.data.damage_relations.double_damage_from;
    for (let i = 0; i < weakestAgainstArr.length; i++) {
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

//Displays the pokemon's moves
function displayMoves(movesArr, i) {
  const movesList = document.querySelector('#movesList');
  const move = document.createElement('li');
  const rawMove = movesArr[i].move.name;
  const moveNoSpaces = rawMove.replace('-', ' ');
  move.textContent = moveNoSpaces;
  movesList.appendChild(move);
}

//Gets general data on selected pokemon
async function getData(input) {
  try {
    //Deals with the two pokemon that have periods and spaces
    if (input == 'mr. mime' || input == 'Mr. Mime' || input == 'mr mime' || input == 'Mr Mime') {
      input = 'mr-mime';
    }
    if (input == 'mime jr' || input == 'Mime Jr' || input == 'mime jr.' || input == 'Mime Jr.') {
      input = 'mime-jr';
    }
    //Retrieving general data
    const url = `https://pokeapi.co/api/v2/pokemon/${input}`
    const pokeObj = await axios.get(url);
    const pokeData = pokeObj.data;
    displayData(pokeData);
  }
  catch (err) {
    console.log('My error is: ' + err);
    //Display error message if pokemon not found
    const errMessage = document.createElement('h1');
    const display = document.querySelector('#display');
    errMessage.innerText = 'Uh oh, that is not a known Pokémon';
    const errImg = document.createElement('img');
    errImg.classList = 'errorBall';
    errImg.src = 'https://i.imgur.com/OuhHR94.png';
    display.append(errMessage, errImg);
  }
}

//Remove previous data from each section
function removeData() {
  const displayHeader = document.querySelector('#displayHeader');
  while (displayHeader.lastChild) {
    displayHeader.lastChild.remove()
  }
  const picSection = document.querySelector('#picSection');
  while (picSection.lastChild) {
    picSection.lastChild.remove()
  }
  const movesSection = document.querySelector('#movesSection');
  while (movesSection.lastChild) {
    movesSection.lastChild.remove()
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

//Event listener for form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  removeData();
  getData(userInput.value);
})

//Opening pokéball - music
const ball = document.querySelector('#openingPage');
ball.addEventListener('click', () => {
  document.querySelector('#theme').play()
  ball.classList = 'display-hidden';
});