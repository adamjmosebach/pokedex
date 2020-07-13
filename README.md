# Project Overview

## Project Name

Pokedex

## Project Description

This project will create a Pokedex - which is a sort of encyclopedia of different pokemon. The user will be able to select a pokemon based on their number or name.  Then the app will display the various information on the selected pokemon, including their number, type, and other attributes.  It will also have another area where the user can see more information, such as what types said-pokemon would be good against and weak against in battle.

## API and Data Sample

### Main page of API:

https://pokeapi.co/

### Endpoint code below from:

https://pokeapi.co/api/v2/pokemon-species/144/

```json
{
    "base_happiness": 35,
    "capture_rate": 3,
    "color": {
        "name": "blue",
        "url": "https://pokeapi.co/api/v2/pokemon-color/2/"
    },
    "egg_groups": [
        {
            "name": "no-eggs",
            "url": "https://pokeapi.co/api/v2/egg-group/15/"
        }
    ],
    "evolution_chain": {
        "url": "https://pokeapi.co/api/v2/evolution-chain/73/"
    },
    "evolves_from_species": null,
    "flavor_text_entries": [
        {
            "flavor_text": "A legendary bird\nPOKéMON that is\nsaid to appear to\fdoomed people who\nare lost in icy\nmountains.",
            "language": {
                "name": "en",
                "url": "https://pokeapi.co/api/v2/language/9/"
            },
            "version": {
                "name": "red",
                "url": "https://pokeapi.co/api/v2/version/1/"
            }
        },
```


### Second API endpoint

https://www.pokemon.com/us/api/pokedex/kalos

### Second API code snippet

```json
{
        "abilities": [
            "Overgrow"
        ],
        "detailPageURL": "/us/pokedex/bulbasaur",
        "weight": 15.2,
        "weakness": [
            "Fire",
            "Psychic",
            "Flying",
            "Ice"
        ],
        "number": "001",
        "height": 28.0,
        "collectibles_slug": "bulbasaur",
        "featured": "true",
        "slug": "bulbasaur",
        "name": "Bulbasaur",
        "ThumbnailAltText": "Bulbasaur",
        "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
        "id": 1,
        "type": [
            "grass",
            "poison"
        ]
    },
    {
        "abilities": [
            "Overgrow"
        ],
        "detailPageURL": "/us/pokedex/ivysaur",
        "weight": 28.7,
        "weakness": [
            "Fire",
            "Psychic",
            "Flying",
            "Ice"
        ],
        "number": "002",
        "height": 39.0,
        "collectibles_slug": "ivysaur",
        "featured": "true",
        "slug": "ivysaur",
        "name": "Ivysaur",
        "ThumbnailAltText": "Ivysaur",
        "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/002.png",
        "id": 2,
        "type": [
            "grass",
            "poison"
        ]
    },
 ```



## Wireframes

#### Computer View

https://wireframe.cc/9XrkTJ

#### Responsive View

https://wireframe.cc/uMmnp

## MVP/PostMVP

#### MVP 

- Meet all GA project requirements
- User enters Name or Number of pokemon
- App displays relevant pokemon-specific attributes on the screen
- User can then click one of two buttons on the side to find out more information about which types the pokemon selected would be good and bad against in battle

#### PostMVP

- Having rendered information appear in a pokemon card-like format
- Good-Weak dropdown animation
- Pokedex cover image when page first loads
- Music when page first loads (then stops when you enter site)
- Be able to select pokemon by type
- A personality test to deterine which pokemon you are most like (this is a reach goal)

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|July 10-12| Prompt / Wireframes / Priority Matrix / Timeframes | Complete
|July 13| Project Approval | Complete
|July 13| Groundwork HTML and CSS / Retrieving data from API | Complete
|July 14| Working with API data / Laying data out on screen / Begin looking at Good-Weak data | Incomplete
|July 15| Finish working with Good-Weak data / Advanced CSS | Incomplete
|July 16| Responsive Design / Post - MVPs | Incomplete
|July 17| Presentations | Incomplete

## Priority Matrix

My matrix can be foundn at: https://i.imgur.com/dRo8X5Z.png

## Timeframes

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Basic HTMl | H | 30 mins | 0 | 0 |
| Adding Basic CSS | L | 2 hrs| 0 | 0 |
| Accessing API based on input | H | 1.5 hrs | 0 | 0 |
| Rendering API data | H | 4 hrs | 0| 0 |
| Getting Good-Weak buttons to render data | H | 4 hrs | 0 | 0 |
| Advanced CSS | M | 4 hrs | 0 | 0 |
| Responsive Design | M | 4 hrs | 0 | 0 |
| *Select by type | L | 3 hrs | 0 | 0 |
| *Coverphoto/Removing Cover Photo | L | 2.5 hrs | 0 | 0 |
| *Music on opening page | L | 2 hrs | 0 | 0 |
| *Personality Test | L | 7 hrs | 0 | 0 |
| Total | H | 34.5 hrs|0 |0 |
 * (* deonotes Post-MVP)


## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of and a brief description.  

```
Looking forward to finding some great snippet to put here
```

## Change Log
 - Since the first API with most of the data did not have images, my thought was to loop over a second API to find the entered pokemon's name as a key in the object, then correlate that property with another key-value: an image-url. Instead, I used a link to a site that contained various pokemon images by number. I thought looping over a second API would slow the app's runtime considerably as oppsed to the way I ended up doing it.
