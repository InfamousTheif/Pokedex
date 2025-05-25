import formatID from "./utils/formatID.js";
import formatAnthropometry from "./utils/formatAnthropometry.js";
import { handlingImages, handlingTypes, refreshHandler } from "./utils/handlers.js";
import { getReigonLimits, renderChnage, fetchPokeURL, fetchPokemonDetails } from "./setup.js";
import { themeHandler } from "./darkmode.js";
import { displayButton } from "./backToTop.js";

const searchBar = document.querySelector('.js-search');
const searchButton = document.querySelector('.js-search-button')
const pkmnContainer = document.querySelector('.js-pokemon-container')

let filteredMons = []
let debounceTimeout;

renderChnage(fillHTML)

async function fillHTML(limitsArray,newList){

    const pokeLimits = limitsArray || [151,0]

    const limit = pokeLimits[0]
    const offset = pokeLimits[1]

    const mons = await fetchPokeURL(limit, offset)

    localStorage.setItem('pokemonNames', JSON.stringify(mons));

    filteredMons = newList || mons.results;

    getHTML()  
  
};


async function getHTML(){
  let pokemonHTML = '';

  // Make concurrent requests for each Pokémon's details
  const pokemons = await Promise.all(filteredMons.map(async (pokemon) => {
    return fetchPokemonDetails(pokemon.url);
  }));

  // console.log(pokemons)
  // console.log(pokemons[0].species.url)
  
  // const resp = await fetch(pokemons[0].species.url);

  // const info = await resp.json()

  // console.log(info)
  
  pokemons.forEach((pokeInfo) => {
      const sprites = pokeInfo.sprites;
      const type = handlingTypes(pokeInfo);

    let color1 = window.getComputedStyle(document.documentElement).getPropertyValue(`--${type[0].name}`);
    let color2 = window.getComputedStyle(document.documentElement).getPropertyValue(`--${type[0].name}2`);
    
    pkmnContainer.insertAdjacentHTML("beforeend",
      `
  <div class="pokemon-card js-pkm-card-${pokeInfo.id}" data-pkmn-id = "${pokeInfo.id}">
      <div class="card js-card-${type[0].name}" id="${pokeInfo.id}"
        style="background-color: ${color1};">

        <div class="pokemon-details-1">
          <div class="pokemon-image-container">
            <img loading="lazy" decoding="async" class="pokemon-image" src = "${sprites.front_default}">
          </div>

          <span class="number"
            style="background-color: ${color2};">${formatID(pokeInfo.id)}</span>

          <h3 class="name">${pokeInfo.name}</h3>

          <div class="types">
            <div class="type-container"><img loading="lazy" decoding="async" src= ${handlingImages(type[0].name)}></div>
            <div class="type-container"><img loading="lazy" decoding="async" src= ${handlingImages(type[1].name)}></div>
          </div>

        </div>

        <div class="pokemon-details-2">
          <div class="pokemon-image-container">
            <img loading="lazy" decoding="async" class="pokemon-image" src = "${sprites.back_default || sprites.front_default}">
          </div>

          <span class="number"
            style="background-color: ${color2};">${formatID(pokeInfo.id)}</span>

          <div class="anthropometry">
            <span>
              Height:
              <br>
              <strong>${formatAnthropometry(pokeInfo.height)}M</strong>
            </span>
            <span>
              Weight:
              <br>
              <strong>${formatAnthropometry(pokeInfo.weight)}KG</strong>
            </span>
          </div>

        </div>

      </div>
    </div>

  `
    )
  });

  addURLParams()
};

 function searchPokemon(){

  searchBar.addEventListener('keyup', async () => {

    const pokeLimits = getReigonLimits()

    const limit = pokeLimits[0]
    const offset = pokeLimits[1]

    const mons = await fetchPokeURL(limit, offset)

    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(async() => {
      const userInput = searchBar.value;

      filteredMons = mons.results;

      if(userInput){
        filteredMons = Object.values(filteredMons).filter((pokemon) => {
          return pokemon.name.replaceAll('-','').includes(userInput.toLowerCase())
        });
      }

      // const pokemons = await Promise.all(filteredMons.map(async (pokemon) => {
      //   return fetchPokemonDetails(pokemon.url);
      // }));

      pkmnContainer.innerHTML = '';

      updatePokemon(filteredMons)
    },100)
  });

};

function updatePokemon(newList){
  filteredMons = newList
  const pokemonNames = JSON.parse(localStorage.getItem("pokemonNames"));
  console.log(pokemonNames)
  
    if(filteredMons.length >= pokemonNames.length){
      fillHTML('',pokemonNames)
    }
    fillHTML('',filteredMons) 
}

function addURLParams(){
  const pkmnCards = document.querySelectorAll(".pokemon-card")
  pkmnCards.forEach((card) => {

    card.addEventListener('click', () => {
      const {pkmnId} = card.dataset
      window.location.href = `DetailsPage.html?search=${pkmnId}`
    });

  })

  document.querySelector('.rand-pkmn')
    .addEventListener('click', () => {
       window.location.href = `DetailsPage.html?search=${Math.floor(Math.random() * 1025)}`
    })
}

themeHandler()

searchPokemon()

displayButton()

// refreshHandler()

fillHTML('');

