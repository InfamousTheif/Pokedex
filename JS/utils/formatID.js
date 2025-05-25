export function formatID(n){

  let formattedId;

  if(n < 10){
    formattedId = '#00' + n;
  }else if( n > 9 && n < 100){
    formattedId = '#0' + n;
  }else {
    formattedId = '#' + n;
  }

  return formattedId;

}

export default formatID;

