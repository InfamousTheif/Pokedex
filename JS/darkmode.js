export function themeHandler(){
  let darkmode = localStorage.getItem('darkmode')
  const themeToggle = document.querySelector("#theme-button");
  const themeDiv = document.querySelector('.theme-div');
  const darkIcon = document.querySelector('.dark-icon')
  const lightIcon = document.querySelector('.light-icon')

  function enableDarkmode(){
    document.body.classList.remove('light-mode')
    document.body.classList.add('dark-mode')
    localStorage.setItem('darkmode','active')
    themeDiv.ariaLabel = "light theme";
    darkIcon.classList.add('show')
    lightIcon.classList.remove('show')
  }

  function enableLightmode(){
    document.body.classList.remove('dark-mode')
    document.body.classList.add('light-mode')
    localStorage.setItem('darkmode', null)
    themeDiv.ariaLabel = "dark theme";
    lightIcon.classList.add('show')
    darkIcon.classList.remove('show')
  }

  if(darkmode === "active"){
    enableDarkmode();
  }else {
    enableLightmode()
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.contains("light-mode") 
      ? enableDarkmode() 
      : enableLightmode()
  })
}