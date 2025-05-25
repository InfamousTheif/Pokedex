
export function handlingTypes(pokeInfo){
  const type = pokeInfo.types.map((poketype) => ({
      name: poketype.type.name,
      url: poketype.type.url
    }));

  if(type.length != 2){
    type.push({name: undefined, url: undefined})
  }

  return type;    
}

export function handlingImages(img){
  if (!img){
    return "";
  }

  return `./type-icons/${img}.avif` || `./type-icons(c)/${img}.svg`
} // If no image is available, i.e. the pokemon only has one type, "" is returned

export function refreshHandler(){
  document.querySelector('.js-refresh-page')
  .addEventListener('click', () => {
    window.location.href = 'pokedex.html'
  }); // refreshes the page
}