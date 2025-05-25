import formatID from "./utils/formatID.js";
import formatAnthropometry from "./utils/formatAnthropometry.js";
import { handlingImages, handlingTypes } from "./utils/handlers.js";
import { fetchPokeURL, fetchPokemonDetails, fetchItem } from "./setup.js";
import allTypes from "../Data/allTypes.json" with { type: "json" };

const params = new URLSearchParams(window.location.search)
const search = params.get('search');
const Specinfo = await getSpecies()
let debounceTimeout;

async function renderHTML(){
  const detailsWrapper = document.querySelector('.pokedex-container');

  const pokemons = await getPokemon();

  const pokemon = pokemons[0];

  const types = handlingTypes(pokemon);
  const speciesInfo = Specinfo;

  const color = window.getComputedStyle(document.documentElement).getPropertyValue(`--${types[0].name}`)
  document.body.style.backgroundColor = `${color}`;

  const container1 = await Promise.all([
    getStats(pokemon),
    getEvolutions(),
    getGender()
  ])
  console.log(container1)

  const evolutionHTML = container1[1];
  const stats = container1[0];
  const gender = container1[2]

  let total = 0;

  for(const stat of pokemon.stats){
    total = total + stat.base_stat
  }

  detailsWrapper.insertAdjacentHTML('beforeend',
    `
  

      <div class="nav-wrapper left-nav">
        <a href="DetailsPage.html?search=${search-1}" class="navigation-button">
          <img decoding="async" src="compressor/arrow-left-3099.svg">
          <span style="color: black;">${formatID(pokemon.id-1)}<span> <br>
         <span class="nav-name">${pokemons[2]}</span>
        </a>
      </div>

      <div class="column-1">

        <a href="pokedex.html">
          <div class="button-wrapper">
            <div class="pokedex-button">
              <img decoding="async" src="compressor/left-arrow-svgrepo-com.svg">
              Back to Pokedex
            </div>
          </div>
        </a>

        <div class="intro">
          
          <div class="name-wrapper">
            <h3 class="pokemon-name">
              ${pokemon.name} <div class="pokemon-Id">${formatID(pokemon.id)}</div>
            </h3>
          </div>

          <div class="type-container">
            <img decoding="async" src= ${handlingImages(types[0].name)}>
            <img decoding="async" src= ${handlingImages(types[1].name)}>
          </div>
          
        </div>

        <div class="pokemon-wrapper">
          <img decoding="async" src=
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png">
        </div>

        <div class="Evolution-chart">

          <div class="evolution-line-wrapper">

            ${ evolutionHTML[0]}

             <div class="arrow-wrapper arrow-1">
              <img decoding="async" src="compressor/arrow-icon.webp">
              <span></span>
             </div>

            ${ evolutionHTML[1] || ''}

            <div class="arrow-wrapper arrow-2">
              <img decoding="async" src="compressor/arrow-icon.webp">
              <span></span>
             </div>

           ${ evolutionHTML[2] || ''}

          </div>
        </div>

      </div>

      <div class="column-2">

        <div class="about-header" style="border-bottom-color:${color}">About</div>
        
        <div class="effectiveness-wrapper">

          <div class="weaknesses-wrapper">
              <h3>Weaknesses</h3>

              <div class="weaknesses-img-wrapper">
                
              </div>

          </div>

          <div class="resistances-wrapper">
              <h3>Resistances</h3>

              <div class="resistances-img-wrapper">
                
              </div>

          </div>

        </div>

        <div class="story-wrapper">
          <h3>Story</h3>
          <p class="pokemon-story">${speciesInfo[0]}</p>
        </div>

        <div class="tables-wrapper">

          <div class="vitals-div">
            <h3>Vitals</h3>
  
            <table class="vitals-table">
              <tbody>
                <tr>
                  <th>Species</th>
                  <td>${speciesInfo[2]}</td>
                </tr>
  
                <tr>
                  <th>Height</th>
                  <td>${formatAnthropometry(pokemon.height)}M</td>
                </tr>
  
                <tr>
                  <th>Weight</th>
                  <td>${formatAnthropometry(pokemon.weight)}KG</td>
                </tr>
  
                <tr>
                  <th>abilities</th>
                  <td class="abilities-row" style="text-transform: capitalize;">
                    
                  </td>
                </tr>
  
                <tr>
                  <th>Gender</th>
                  <td>
                    ${gender}
                  </td>
                </tr>
  
              </tbody>
            </table>
          </div>
  
          <div class="stats-wrapper">
            <h3>Base Stats</h3>
  
            <table class="stats-table">
              <tbody>
  
                <tr>
                  <th>HP</th>
                  <td class="stat-num">${stats[0].statValue}</td>
                  <td class="stat-barchart">
                    <div class="barchat-bar" style="width:${stats[0].width}%; background-color:${stats[0].bgColor};">
                      
                    </div>
                  </td>
                </tr>
  
                <tr>
                  <th>Attack</th>
                  <td class="stat-num">${stats[1].statValue}</td>
                  <td class="stat-barchart">
                    <div class="barchat-bar" style="width:${stats[1].width}%; background-color:${stats[1].bgColor};">
                      
                    </div>
                  </td>
                </tr>
  
                <tr>
                  <th>Defense</th>
                  <td class="stat-num">${stats[2].statValue}</td>
                  <td class="stat-barchart">
                    <div class="barchat-bar" style="width:${stats[2].width}%; background-color:${stats[2].bgColor};">
                      
                    </div>
                  </td>
                </tr>
  
                <tr>
                  <th>Sp.Atk</th>
                  <td class="stat-num">${stats[3].statValue}</td>
                  <td class="stat-barchart">
                    <div class="barchat-bar" style="width:${stats[3].width}%; background-color:${stats[3].bgColor};">
                      
                    </div>
                  </td>
                </tr>
  
                <tr>
                  <th>Sp.Def</th>
                  <td class="stat-num">${stats[4].statValue}</td>
                  <td class="stat-barchart">
                    <div class="barchat-bar" style="width:${stats[4].width}%; background-color:${stats[4].bgColor};">
                      
                    </div>
                  </td>
                </tr>
  
                <tr>
                  <th>Speed</th>
                  <td class="stat-num">${stats[5].statValue}</td>
                  <td class="stat-barchart">
                    <div class="barchat-bar" style="width:${stats[5].width}%; background-color:${stats[5].bgColor};">
                      
                    </div>
                  </td>
                </tr>
  
                <tr>
                  <th>Total</th>
                  <td class="stat-num">${total}</td>
                  <td class="stat-barchart">
                    <div class="barchat-bar">
                      
                    </div>
                  </td>
                </tr>
  
              </tbody>
            </table>
  
          </div>
  
        </div>

        </div>

      <div class="nav-wrapper right-nav">
        <a href="DetailsPage.html?search=${search-(-1)}" class="navigation-button">
         <span style="color:black;">${formatID(pokemon.id+1)}</span>  <img decoding="async" src="compressor/arrow-right.svg">
         <br>
         <span class="nav-name">${pokemons[1]}</span>
        </a>
      </div>

    
  
  `
  ) 
  getMultipliers(types)
  // getWeaknesses(types)
  getAbilities(pokemon)
  hideElement((pokemon.id-1),document.querySelector('.left-nav'))

  if(evolutionHTML[2] === undefined){
    document.querySelector('.arrow-2').classList.add('hide')
    if(evolutionHTML[1] === undefined){
      document.querySelector('.arrow-1').classList.add('hide')
    }
  }// hiding the arrows if a pokemon has no evolutions
}

renderHTML()

async function getPokemon(){
  const pokeObj = await fetchPokeURL(1,search-1) // fetching the name and url of the current pokemon
                                                      // search params are used to uniquely identify the fetched pokemon 

  const pokeResults = pokeObj.results;
  const nextURL = pokeObj.next;
  const prevURL = pokeObj.previous;

  let prevName;
  let nextName;

  if(nextURL){
    const nextMon = await fetchItem(nextURL); // fetching the name and url of the next pokemon
    nextName = nextMon.results[0].name;
  }

  if(prevURL){
    const prevMon = await fetchItem(prevURL); // fetching the name and url of the previous pokemon
    prevName = prevMon.results[0].name;
  }

  const pokemon = await fetchPokemonDetails( pokeResults[0].url); // fetching the details of the current pokemon

  return [pokemon, nextName, prevName];
}



async function getSpecies(){
  const species = await fetchItem(`https://pokeapi.co/api/v2/pokemon-species/${search}/`);
  let dexEntry;

  for(const text of species.flavor_text_entries){
    if(text.language.name === "en"){
      dexEntry = text.flavor_text;
    }
  }// looping through the species.genera array to obtain a dex entry written in Eng language.

  const evoChain = species.evolution_chain.url;

  let genera;
  for(const genus of species.genera){
    if(genus.language.name === "en"){
      genera = genus.genus;
    }
  }// looping through the species.genera array to obtain a genus written in Eng language.

  return [dexEntry, evoChain, genera]
}

async function getEvolutions(){
  const speciesInfo = Specinfo;
  const evoInfo = await fetchItem(`${speciesInfo[1]}`);// fetching the pokemon's evolution chain.

  const base = evoInfo.chain.species.url
  let evolve1;
  let evolve2;

  if(evoInfo.chain.evolves_to[0]){
    evolve1 = evoInfo.chain.evolves_to[0].species.url;// If the first evolution stage exists, I save it to a variable

    if(evoInfo.chain.evolves_to[0].evolves_to[0]){
      evolve2 = evoInfo.chain.evolves_to[0].evolves_to[0].species.url;// If the first evolution stage exists, I save it to a variable
    }
  }

  const chainArray = [base, evolve1, evolve2];

  const chainInfo = await Promise.all(chainArray.map((stage) => {
    const info = fetchItem(stage)// fetching the details for each evolution stage and saving them to a variable.
    return info || ''
  }))


  const chainHTML = await Promise.all(chainInfo.map(async(info) => {
    if(info){
      
    const fetchedItem = await fetchPokeURL(1,info.id-1)
    const pokemon = await fetchPokemonDetails(fetchedItem.results[0].url)
    const types = handlingTypes(pokemon)
     return `<a href="DetailsPage.html?search=${info.id}">
              <div class="evolve-wrapper"> 
              <img  decoding="async" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${info.id}.png">
              <div class="evolve-details">
                <span style="text-transform: capitalize;">${info.name}</span>
                <div class="pkmn-type-img">
                  <img  decoding="async" src=${handlingImages(types[0].name)}>
                  <img  decoding="async" src=${handlingImages(types[1].name)}>
                </div>
              </div>
             </div>
              </a>` 
    }// generating html if a pokemon has an evolution stage, otherwise a value of null is returned.
    return;
  }))

  return chainHTML;
  
}

function hideElement(indicator,element){
  if( indicator === 0 || indicator === null){
    element.classList.add('hide')
  }
}

async function getAbilities(pokemon){
  for (const ability of pokemon.abilities ){
    if(ability.is_hidden){
      document.querySelector('.abilities-row').insertAdjacentHTML('beforeend',`<small>${ability.ability.name}(hidden)</small>`)
    }else {
      document.querySelector('.abilities-row').insertAdjacentHTML('beforeend', `${ability.ability.name}<br>`)
    }
  }// looping through the abilities array and generating different types of html depending on if the ability is hidden or not.
}

async function getStats(pokemon){
  const statsArray = pokemon.stats;
  const styleArray = statsArray.map((stat) => {
    const statValue = stat.base_stat;
    const width = (statValue/2);
    let bgColor;


    if(width <= 100 ){
      bgColor = 'lightseagreen';
    }

    if(width < 70){
      bgColor = '#23cd5e';
    }

    if(width < 50){
      bgColor = 'orange';
    }

    if(width < 20){
      bgColor = '#f34444';
    }

    return {width,bgColor,statValue}
  })
  return styleArray;
}

async function getGender(){
  const species = await fetchItem(`https://pokeapi.co/api/v2/pokemon-species/${search}/`);
  if(species.gender_rate === 0){
    return `<img decoding="async" class="male-icon" src="compressor/male-49 (1).svg"></img>`
  }

  if(species.gender_rate === 8){
    return `<img decoding="async" class="female-icon" src="compressor/female-19 (1).svg">`
  }

  if(species.gender_rate === -1){
    return 'Genderless'
  }

  return `<img decoding="async" class="male-icon" src="compressor/male-49 (1).svg">
          <img decoding="async" class="female-icon" src="compressor/female-19 (1).svg">`
}

async function getMultipliers(types){
  const type1 = types[0].name
  const type2 = types[1].name // retreiving data from allTypes.json file

  const singleType = allTypes[type1]
  const dualType = allTypes[`${type1}_${type2}`]
  const dualType2 = allTypes[`${type2}_${type1}`] // creating two dual types because some pokemon are listed fire-dark, while others dark-fire
                                                  // e.g Houndoom and Incineroar

  // utilising if conditions to determine if a pokemon is single type, or not, before listing weaknesses and resistances
  if(!type2){
    for(const weakness of singleType.weaknesses ){
      document.querySelector('.weaknesses-img-wrapper')
          .insertAdjacentHTML('beforeend', `<img decoding="async" src="${handlingImages(weakness)}">`);
     }
    
     for(const resistance of singleType.resistances ){
      document.querySelector('.resistances-img-wrapper')
          .insertAdjacentHTML('beforeend', `<img decoding="async" src="${handlingImages(resistance)}">`);
     }
  }else if(dualType){
    for(const weakness of dualType.weaknesses ){
      document.querySelector('.weaknesses-img-wrapper')
          .insertAdjacentHTML('beforeend', `<img decoding="async" src="${handlingImages(weakness)}">`);
     }
    
     for(const resistance of dualType.resistances ){
      document.querySelector('.resistances-img-wrapper')
          .insertAdjacentHTML('beforeend', `<img decoding="async" src="${handlingImages(resistance)}">`);
     }
  }else{
    for(const weakness of dualType2.weaknesses ){
      document.querySelector('.weaknesses-img-wrapper')
          .insertAdjacentHTML('beforeend', `<img decoding="async" src="${handlingImages(weakness)}">`);
     }
    
     for(const resistance of dualType2.resistances ){
      document.querySelector('.resistances-img-wrapper')
          .insertAdjacentHTML('beforeend', `<img decoding="async" src="${handlingImages(resistance)}">`);
     }
  }
  
}

// function renderLoadingScreen(){
//   const navButtons  = document.querySelectorAll('.name-wrapper')
//   const loadingScrn = document.querySelector('.loading-div');

//   navButtons.forEach((button) => {
//     button.addEventListener('click', () => {
//       console.log('loading...')
//       loadingScrn.classList.remove('hide')
//       debounceTimeout = setTimeout(loadingScrn.classList.add('hide'),4000)
//     })
//   })
// }
