const pkmnContainer = document.querySelector('.js-pokemon-container')

// the function below returns the json of a fetch request
export async function fetchItem(url) {
  try { 
    const resp = await fetch(url);
  
    if (!resp.ok) {
      throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
    }
  
    const item = await resp.json();
  
    return item;
  
    }catch(err){
     if(err.name === 'AbortError'){
      console.log(`Abort Error, message: ${err.message}`)
     }else{
      console.log(`An issue occured while fetching, message: ${err.message}`)
     }
    }
}

export function getReigonLimits(){
  const region = document.querySelector('#regions');
  const regionOutput = region.value;

  const regionLimitsMap = {
    "kanto": [151, 0],  
    "johto": [100, 151], 
    "hoenn": [135, 251], 
    "sinnoh": [107, 386], 
    "unova": [156, 493], 
    "kalos": [72, 649], 
    "alola": [88, 721], 
    "galar": [96, 809], 
    "paldea": [120, 905] 
  };
    
  const regionOutputLower = regionOutput.toLowerCase();
  const regionLimits = regionLimitsMap[regionOutputLower] || null;
    
  return regionLimits;
};

// after the reigon is changed, the function below renders the changes.
export function renderChnage(func){
  let limits;

  document.querySelector('#regions').onchange = () => {
    
    pkmnContainer.innerHTML = '';
    limits = getReigonLimits();
    func(limits)
  }
};

export async function fetchPokeURL(limit, offset){
  try {

  const pokeAPIUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;

  const resp = await fetch(pokeAPIUrl);

  if (!resp.ok) {
    throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
  }

  const mons = await resp.json();

  return mons;

  }catch(err){
   if(err.name === 'AbortError'){
    console.log(`Abort Error, message: ${err.message}`)
   }else{
    console.log(`An issue occured while fetching, message: ${err.message}`)
   }
  }
};

export async function fetchPokemonDetails(url){

  const pokeURL = await fetch(url);

  const pokeDetails = await pokeURL.json();

  return pokeDetails;

};
