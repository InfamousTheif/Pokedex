export function displayButton(){
  const topButton = document.querySelector(".backToTop");

  window.addEventListener('scroll', function() { 
    if (this.window.scrollY> 200) { 
      topButton.classList.add('show'); 
    } else { 
      topButton.classList.remove('show'); 
    } 
  }); 

}