'use strict';

// SELECTORS

let inputName = document.querySelector('.js-inputName');
const button = document.querySelector('.js-button');
let results = document.querySelector('.js-results');
let favSeries = document.querySelector('.js-favs');
const resetBtn = document.querySelector('.js-btnReset');

//CREAMOS ARRAYS

let seriesList = [];
let favoritesSelect = getInfo || [];

// LLAMAMOS A LA API
const getDataFromApi = () => {
    const serieName = inputName.value;
    fetch(`http://api.tvmaze.com/search/shows?q=${serieName}`)
        .then(response => response.json())
        .then(data => {
            seriesList = data;
            paintSeriesCatalogue();
        })
        .catch(err => {
            console.log('Ha habido un error', err);
        });
};


//FUNCIÓN ALERTA WRITE A SERIE NAME
function fullInputSearch(evt) {
    if (inputName.value === '') {
        return alert('Write a serie name');
    }
};
button.addEventListener('click', fullInputSearch);


//FUNCION PARA PINTAR CATÁLOGO
const paintSeriesCatalogue = () => {
    let results = ''; {
        for (let index = 0; index < seriesList.length; index += 1) {
            let element = seriesList[index];
            results += `<article class="serie serie__btn js-selectFav " id="${element.show.id}" data-index="${index}" data-id="${element.show.id}">`;
            if (element.show.image !== null) {
                results += `<img src="${element.show.image.medium}  " class="serie__img" alt="${element.show.name} " />`;
            } else {
                results += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" class="serie__img" alt="${element.show.name} " />`;
            }
            results += `<h4 class="serie__title">${seriesList[index].show.name} </h4>`;
            results += `<h5 class="serie__title">${seriesList[index].show.premiered} </h5>`;
            results += `</article>`;
        }

        const seriesElement = document.querySelector('.js-results');
        seriesElement.innerHTML = results;
    }
    listenSearchClick();
};




'use strict';

//ASIGNO LOS LISTENERS A LOS ARTICLEs

const listenSearchClick = () => {
    const seriesBtns = document.querySelectorAll('.js-selectFav');
    for (let serieBtn of seriesBtns) {
        serieBtn.addEventListener('click', saveFavorites);
    }
};


// SELECCCIONAR COMO FAV       

function saveFavorites(ev) {
    const clickedId = parseInt(ev.currentTarget.id);
    const clikedIdFav = seriesList.find(favItem => favItem.show.id === clickedId);
    const serieFav = document.getElementById(clickedId);
    serieFav.classList.add('color');
    if (favoritesSelect.indexOf(clikedIdFav) === -1) {
        favoritesSelect.push(clikedIdFav);
        paintSeriesFavorites();
    } else {
        alert('This serie is already in your list');
    }
    saveInfo();
};

//FUNCIÓN PARA PINTAR EN FAVORITOS

const paintSeriesFavorites = (ev) => {
    resetBtn.innerHTML = '<button class="finder__btn">Reset</>';
    let results = ''; {
        for (let index = 0; index < favoritesSelect.length; index += 1) {
            let element = favoritesSelect[index];
            results += `<li class= "list">`;
            results += `<article class="serieFav" id="${element.show.id}"
            data-index="${index}"
            data-id="${element.show.id}">`;
            if (element.show.image !== null) {
                results += `<img src="${element.show.image.medium}  " class="serie__img" alt="${element.show.name} " />`;
            } else {
                results += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" class="serie__img" alt="${element.show.name} " />`;
            }
            results += `</article>`;
            results += `</li>`;
        }
        const seriesElement = document.querySelector('.js-favs');
        seriesElement.innerHTML = results;
    }

};


button.addEventListener('click', getDataFromApi);
button.addEventListener('click', paintSeriesCatalogue);
getInfo(favoritesSelect);

const resetFavorites = (ev) => {
    favoritesSelect = [];
    saveInfo();
    paintSeriesFavorites();
    paintSeriesCatalogue();
};

resetBtn.addEventListener("click", resetFavorites);
'use strict';

//LOCAL STORAGE

function saveInfo() {
    localStorage.setItem('favoriteSerie', JSON.stringify(favoritesSelect));
}

function getInfo() {
    const data = JSON.parse(localStorage.getItem('favoriteSerie'));
    if (data !== null) {
        favoritesSelect = data;
    }
    paintSeriesFavorites()
};


//# sourceMappingURL=main.js.map
