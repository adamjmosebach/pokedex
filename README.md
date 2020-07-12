# Project Overview

## Project Name

Pokedex

## Project Description

This project will create a Pokedex - which is a sort of encyclopedia of different pokemon. The user will be able to select a pokemon based on their number or name.  Then the app will display the various information on the selected pokemon, including their number, type, and other attributes  It will also have another area where the user can see more information, such as what types said-pokemon would be good against and weak against in battle.

## API and Data Sample

Specify the API you are using and include a link. Show us a snippet of JSON returned by your API so we know you can access it and get the info you need

#Main page of API:

[Poke API] (https://pokeapi.co/)

#Code below from:

[Poke API for Articuno] (https://pokeapi.co/api/v2/pokemon-species/144/)

```json
{
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


## Wireframes

My wireframe can be found at: https://wireframe.cc/9XrkTJ

### MVP/PostMVP

#### MVP 

- User enters Name or Number of pokemon
- App displays relevant pokemon-specific attributes on the screen
- User can then click one of two buttons on the side to find out more information about which types the pokemon selected would be good and bad against in battle

#### PostMVP

- Having rendered information appear in a pokemon card-like format
- Good/Weak dropdown animation
- Pokedex cover image when page first loads
- A personality test to deterine which pokemon you are most like (this is a reach goal)

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|July 10-12| Prompt / Wireframes / Priority Matrix / Timeframes | Complete
|July 13| Project Approval | Incomplete
|July 13| Groundwork HTML and CSS / Retrieving data from API | Incomplete
|July 14| Working with API data / Laying it data out on screen / Begin looking at Good/Weak data | Incomplete
|July 15| Finish working with Good/Weak data / Advanced CSS | Incomplete
|July 16| Post - MVPs | Incomplete
|July 17| Presentations | Incomplete

## Priority Matrix

Include a full list of features that have been prioritized based on the `Time and Importance` Matrix.  Link this image in a similar manner to your wireframes

## Timeframes

Tell us how long you anticipate spending on each area of development. Be sure to consider how many hours a day you plan to be coding and how many days you have available until presentation day.

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe. Throughout your project, keep track of your Time Invested and Actual Time and update your README regularly.

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Adding Form | H | 3hrs| 3.5hrs | 3.5hrs |
| Working with API | H | 3hrs| 2.5hrs | 2.5hrs |
| Total | H | 6hrs| 5hrs | 5hrs |

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of and a brief description.  

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  
