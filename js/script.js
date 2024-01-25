
const switchMode = document.getElementById("switch-light-to-dark"); 
const iconDarkLight = document.getElementById("switch-light-to-dark");
const languages = document.getElementById("select-languages");
const languageOptions = document.querySelector('#languages ol');
const languageOptionEnglish = document.getElementById("language-option-en");
const languageOptionFrench = document.getElementById("language-option-fr");
const languageOptionPortuguese = document.getElementById("language-option-pt");
const hamburguer = document.querySelector(".hamburguer");
const menu = document.querySelector("#menu-list")
let themeSystem = localStorage.getItem("themeSystem") || "light"; //get from the local storage the theme if don't have anything the light theme is the default one. 
let languageSystem = localStorage.getItem("languageSystem") || "en";
let menuOpen = false;

//function to show the hamburguer nav bar when the user click it.
hamburguer.addEventListener("click", () => {
    if (!menuOpen) {
        menu.style.display = "block";
        hamburguer.classList.add("menu-open");
    } else {
        menu.style.display = "none";
        hamburguer.classList.remove("menu-open");
    }

    menuOpen = !menuOpen;
});

//function to change the nav bar 
window.addEventListener("resize", () => {

    if (window.innerWidth >= 680) {
        menu.style.display = "flex";
    }
    else{
        menu.style.display = "none";
    }
});

document.getElementById('nav-menu-contact').addEventListener('click', function() {
window.location.reload();
});

// function responsible to set the atribute to the local storage
function applyTheme(theme) {
    return new Promise((resolve, reject) => {
      try {
        document.documentElement.setAttribute("data-theme", theme);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
}


//function that is responsible for the user be able to change the mode
switchMode.addEventListener("click", async () => {
    try {
      let newTheme = themeSystem === "light" ? "dark" : "light";
      localStorage.setItem("themeSystem", newTheme);
      await applyTheme(newTheme);
    } catch (error) {
      console.error('Erro to apply theme:', error);
    }
});

// function responsible to switch the mode icon 
function switchIcon(){
    if (themeSystem == "light"){
        iconDarkLight.innerHTML = `<li><a href="" id="switch-light-to-dark"><i class="fa-regular fa-moon"></i></a></li>`
    }
    else{
        iconDarkLight.innerHTML = `<li><a href="" id="switch-light-to-dark"><i class="fa-regular fa-sun"></i></a></li>`
    }
}

switchIcon();
applyTheme(themeSystem);

//function responsible for show when the user click in the icon, options of languages available in the website
languages.addEventListener('click', () => {
    languageOptions.classList.toggle('show');
    event.preventDefault(); // to keep the href unvailable and don't refresh the page when click
});

languageOptionEnglish.addEventListener('click', () => {
    console.log("click en");
    let choosedLanguage = languageSystem === "fr" ? "en" : "en"; // verify if languageSystem is equal fr and change to en if is not fr change to en anyway 
    localStorage.setItem("languageSystem", choosedLanguage); // set the new language in the local storage 
    window.location.reload(); // this is to refresh the page, cause we set the new value in local storage but it is necessary reload to apply the new language
})

languageOptionFrench.addEventListener('click', () => {
    console.log("click fr");
    let choosedLanguage = languageSystem === "en" ? "fr" : "fr";
    localStorage.setItem("languageSystem", choosedLanguage);
    window.location.reload(); 
})

languageOptionPortuguese.addEventListener('click', () => {
    console.log("click pt");
    let choosedLanguage = languageSystem === "en" ? "pt" : "pt";
    localStorage.setItem("languageSystem", choosedLanguage);
    window.location.reload();
})

function applyTranslations(languageSystem) {
    fetch(`languages/${languageSystem}.json`) //try to find the json file
        .then(response => response.json()) // convert the json file in js object
        .then(translations => { // after convert we will use Object.keys(translations) to get all the keys that exist in our json file and use foreach to iterate over this keys
            Object.keys(translations).forEach(key => {
                const tag = document.getElementById(key); //compare the tag id with the keys 
                if (tag) {
                    tag.innerHTML = translations[key]; //if matches, the content inside the key goes to the html tag
                }
            });
        })
        .catch(error => {
            console.error(`Error to apply translation to ${languageSystem}: ${error}`);
        });
}

applyTranslations(languageSystem);
