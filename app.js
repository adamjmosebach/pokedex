//Opening pokéball - music
const ball = document.querySelector('#openingPage');
ball.addEventListener('click', () => {
  document.querySelector('#theme').play()
  ball.classList = 'displayHidden';
});

//Some global variables
const userInput = document.querySelector('#nameNum');
const nameNumForm = document.querySelector('#nameNumSelect')

//Event listener for form
nameNumForm.addEventListener('submit', (e) => {
  e.preventDefault();
  removeData();
  userInputValue = userInput.value.toLowerCase();
  getData(userInputValue);
  //Reset input box
  userInput.value = '';
});

//Gets general data on selected pokemon
async function getData(input) {
  try {
      //Deals with the two pokemon that have periods and spaces
      if (input == 'mr. mime' || input == 'mr mime') {
        input = 'mr-mime';
      }
      if (input == 'mime jr' || input == 'mime jr.') {
        input = 'mime-jr';
      }
    //Retrieving general data
    const url = `https://cors-anywhere.herokuapp.com/https://pokeapi.co/api/v2/pokemon/${input}`
    const pokeObj = await axios.get(url);
    const pokeData = pokeObj.data;
    displayData(pokeData);
  }
  //If pokémon is not recognized
  catch (err) {
    console.log('My error is: ' + err);
    //Remove previous style
    const display = document.querySelector('#leftPanel');
    display.classList.toggle('pokeCard', false);
    //Display error message if pokemon not found
    const errorDivCreate = document.createElement('div');
    errorDivCreate.id = 'errorDiv';
    const errMessage = document.createElement('h1');
    errMessage.innerText = 'Uh oh, that is not a known Pokémon';
    errMessage.classList = 'errorFound';
    const errImg = document.createElement('img');
    errImg.classList = 'errorFound';
    errImg.id = 'errorBall';
    errImg.src = 'https://cors-anywhere.herokuapp.com/https://i.imgur.com/OuhHR94.png';
    display.append(errorDivCreate);
    const errorDiv = document.querySelector('#errorDiv');
    errorDiv.append(errMessage, errImg);
  }
}


function displayData(pokeData) {

  //If narrow-down selectors are present, remove them
  while (document.querySelector('#narrowDown').lastChild) {
    document.querySelector('#narrowDown').lastChild.remove();
  }

  //Sets the stage for displaying data
  const card = document.querySelector('#leftPanel');
  card.classList = 'pokeCard';
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

  //More stage setting, including image
  const pokeImg = document.createElement('img');
  pokeImg.src = `https://cors-anywhere.herokuapp.com/https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`;
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

  //Display moveset by calling a function
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
  const goodWeak = document.querySelector('#goodWeak');

  //Add good button & hidden display area
  const goodButtonCreate = document.createElement('div');
  goodButtonCreate.classList = 'battleButton';
  goodButtonCreate.id = 'goodButton';
  goodButtonCreate.innerText = 'Good Against';
  const goodDisplayCreate = document.createElement('div');
  goodDisplayCreate.id = 'goodDisplay';
  goodDisplayCreate.classList = 'displayHidden';
  goodWeak.append(goodButtonCreate, goodDisplayCreate);

  //Event listener for good button
  const goodButton = document.querySelector('#goodButton');
  goodButton.addEventListener('click', () => {
    const goodDisplay = document.querySelector('#goodDisplay');
    goodDisplay.classList.toggle('displayHidden');
  });

  //Add weak button & hidden display area
  const weakButtonCreate = document.createElement('div');
  weakButtonCreate.classList = 'battleButton';
  weakButtonCreate.id = 'weakButton';
  weakButtonCreate.innerText = 'Weak Against';
  const weakDisplayCreate = document.createElement('div');
  weakDisplayCreate.id = 'weakDisplay';
  weakDisplayCreate.classList = 'displayHidden';
  goodWeak.append(weakButtonCreate, weakDisplayCreate);

  //Event listener for weak button
  const weakButton = document.querySelector('#weakButton');
  weakButton.addEventListener('click', () => {
    const weakDisplay = document.querySelector('#weakDisplay');
    weakDisplay.classList.toggle('displayHidden');
  });

  //Calls functions to handle good and weak against sections
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

//Finds what type(s) this pokemon is and sets the stage
async function goodWeakOutcomes(pokeType) {
  try {
    const typesObj = await axios.get('https://cors-anywhere.herokuapp.com/https://pokeapi.co/api/v2/type');
    const typeDataArr = typesObj.data.results;
    for (let i = 0; i < typeDataArr.length; i++) {
      if (typeDataArr[i].name === pokeType) {

        //Sets up 'Good Against' section
        const bestAgainstHeader = document.createElement('h4');
        bestAgainstHeader.innerText = `${pokeType} types are best against:`;
        const bestList = document.createElement('ul');
        bestList.id = `bestAgainst${pokeType}`;
        const goodSection = document.querySelector('#goodDisplay');
        goodSection.append(bestAgainstHeader, bestList);

        //Sets up 'Weak Against' section
        const weakestAgainstHeader = document.createElement('h4');
        weakestAgainstHeader.innerText = `${pokeType} types are weakest against:`;
        const weakestList = document.createElement('ul');
        weakestList.id = `weakAgainst${pokeType}`;
        const weakSection = document.querySelector('#weakDisplay');
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
        const bestList = document.querySelector(`#bestAgainst${pokeType}`);
        bestList.append(bestAgainstItem);
      }
    } else {
      //Accounting for Normal type: which does not deal double damage to anyone, so must move to half damage
      const secondBestAgainstArr = typeObj.data.damage_relations.half_damage_to;
      for (let i = 0; i < secondBestAgainstArr.length; i++) {
        const secondBestAgainstItem = document.createElement('li');
        secondBestAgainstItem.textContent = `${secondBestAgainstArr[i].name}`;
        const bestList = document.querySelector(`#bestAgainst${pokeType}`);
        bestList.append(secondBestAgainstItem);
      }
    }

    //Display 'weak against' data
    const weakestAgainstArr = typeObj.data.damage_relations.double_damage_from;
    for (let i = 0; i < weakestAgainstArr.length; i++) {
      const weakestAgainstItem = document.createElement('li');
      weakestAgainstItem.textContent = `${weakestAgainstArr[i].name}`;
      const weakestList = document.querySelector(`#weakAgainst${pokeType}`);
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
  const goodWeak = document.querySelector('#goodWeak');
  while (goodWeak.lastChild) {
    goodWeak.lastChild.remove()
  }
  if (document.querySelector('#errorDiv')) {
    document.querySelector('#errorDiv').remove();
  }
  if (document.querySelector('#bothResult')) {
    document.querySelector('#bothResult').remove();
  }
}


//Event listener for the Narrow-Down button
const narrowButton = document.querySelector('#narrowButton');
narrowButton.addEventListener('click', listTypes);

//Selecting the narrow-down section
const narrowDown = document.querySelector('#narrowDown');

//Provides type choices, if not there already
async function listTypes(e) {
  e.preventDefault();
  removeData();
  document.querySelector('#leftPanel').classList.remove('pokeCard');
  if (!document.querySelector('#typeSelect')) {
    const dropdownTypeCreate = document.createElement('select');
    dropdownTypeCreate.id = 'typeSelect';
    dropdownTypeCreate.onchange = setsColorChoices;
    const br = document.createElement('br');
    narrowDown.append(br, dropdownTypeCreate);
    try {
      const pokeTypeApiObj = await axios.get('https://cors-anywhere.herokuapp.com/http://pokeapi.co/api/v2/type/');
      const typeArr = pokeTypeApiObj.data.results;
      const dropdownTypeOptions = document.querySelector('#typeSelect');
      for (let i = 0; i < typeArr.length; i++) {
        const theType = typeArr[i].name;
        const typeOption = document.createElement('option');
        typeOption.value = theType;
        typeOption.text = `${theType}`;
        dropdownTypeOptions.append(typeOption);
      }
    }
    catch (err) {
      console.log(err);
    }
  }
}

//Provides color choices
async function setsColorChoices() {
  if (document.querySelector('#colorSelect')) {
    document.querySelector('#colorSelect').remove();
  }
  const dropdownColorCreate = document.createElement('select');
  dropdownColorCreate.id = 'colorSelect';
  dropdownColorCreate.onchange = gatherValues;
  narrowDown.append(dropdownColorCreate);
  try {
    const pokeColorApiObj = await axios.get('https://cors-anywhere.herokuapp.com/https://pokeapi.co/api/v2/pokemon-color/');
    const colorArr = pokeColorApiObj.data.results;
    const dropdownColorOptions = document.querySelector('#colorSelect');
    for (let i = 0; i < colorArr.length; i++) {
      const theColor = colorArr[i].name;
      const colorOption = document.createElement('option');
      colorOption.value = theColor;
      colorOption.text = `${theColor}`;
      dropdownColorOptions.append(colorOption);
    }
  }
  catch (err) {
    console.log(err);
  }
}

//Some globals
let correctTypeArr = [];
let correctColorArr = [];

//Creates the type and color arrays and passes values to the match functions
function gatherValues() {
  correctTypeArr = [];
  correctColorArr = [];
  const selectedType = document.querySelector('#typeSelect').value;
  const selectedColor = document.querySelector('#colorSelect').value;
  if (document.querySelector('#bothResult')) {
    document.querySelector('#bothResult').remove();
  }
  getMatchesForType(selectedType, selectedColor);
}

//Adds names of those pokémon matching the type selected to an array
async function getMatchesForType(selectedType, selectedColor) {
  try {
    const pokeTypeApiObj = await axios.get(`https://cors-anywhere.herokuapp.com/http://pokeapi.co/api/v2/type/${selectedType}/`);
    const typeArr = pokeTypeApiObj.data.pokemon;
    for (let i = 0; i < typeArr.length; i++) {
      const typePoke = typeArr[i].pokemon;
      correctTypeArr.push(`${typePoke.name}`);
    }
    getMatchesForColor(selectedColor, correctTypeArr);
  }
  catch (err) {
    console.log(err);
  }
}

//Adds names of those pokémon matching the color selected to an array
async function getMatchesForColor(selectedColor, correctTypeArr) {
  try {
    const pokeColorApiObj = await axios.get(`https://cors-anywhere.herokuapp.com/http://pokeapi.co/api/v2/pokemon-color/${selectedColor}/`);
    const colorArr = pokeColorApiObj.data.pokemon_species;
    for (let i = 0; i < colorArr.length; i++) {
      const colorPoke = colorArr[i].name;
      correctColorArr.push(`${colorPoke}`);
    }
    combineChoices(correctTypeArr, correctColorArr);
  }
  catch (err) {
    console.log(err);
  }
}

//Compare and list those that fit both criteria & make each andswer clickable
function combineChoices(correctTypeArr, correctColorArr) {
  const bothResultDivCreate = document.createElement('div');
  bothResultDivCreate.id = 'bothResult';
  document.querySelector('main').append(bothResultDivCreate);
  const bothResult = document.querySelector('#bothResult');
  const bothListHeading = document.createElement('p');
  bothListHeading.innerText = 'Those with both your selected type and color:';
  const bothListCreate = document.createElement('ul');
  bothListCreate.id = 'bothList';
  bothResult.append(bothListHeading, bothListCreate);
  const bothList = document.querySelector('#bothList');
  for (let i = 0; i < correctColorArr.length; i++) {
    for (let j = 0; j < correctTypeArr.length; j++) {
      if (correctColorArr[i] === correctTypeArr[j]) {
        const bothListItem = document.createElement('li');
        bothListItem.textContent = correctColorArr[i];
        bothListItem.addEventListener('click', () => {
          removeData();
          getData(correctColorArr[i])
        });
        bothList.append(bothListItem);
      }
    }
  }
  //Error handling if none matched both criteria
  if (!bothList.lastChild) {
    const noneMatched = document.createElement('p');
    noneMatched.id = 'noneMatched';
    noneMatched.innerText = 'Unfortunately no Pokémon matched your search criteria';
    bothList.append(noneMatched);
  }
}