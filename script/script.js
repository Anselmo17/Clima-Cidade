// config api
const key = '&units=metric&appid=c0248e94dec6f66826cb62438335f605&lang=pt_br';
const url = `https://api.openweathermap.org/data/2.5/weather?q=`;

// url falf
const URL_apiBandeira = 'https://countryflagsapi.com/png/';

// variables cards
const city = document.getElementById("cityCurrent");
const bandeira = document.getElementById("bandeiraCurrent");
const grau = document.getElementById("grauCurrent");
const temp = document.getElementById("tempoCurrent");
const umidade = document.getElementById("umidadeCurrent");
const vento = document.getElementById("ventoCurrent");

// valid item found
const notFound = document.querySelector(".notFound");
const found = document.querySelector(".found");



async function searchCity() {
    // value city
    const citySearch = document.getElementById("city").value.trim();

    // search api 
   show(true);
    const urlApi = `${url}${citySearch}${key}`;
    const result = await fetch(urlApi);
    const findCity = await result.json();

    show(false);
    const sucesso = 200;
    // add card
    const hiddenCard = document.querySelector(".hiddenCard");
    hiddenCard.style = 'display:block';
    

    if (findCity.cod !== sucesso) {
        notFound.style = 'display:block;';
        found.style = 'display:none'
        return;
    }

    notFound.style = 'display:none;';
    found.style = 'display:block'

    // add value find 
    city.innerText = findCity.name;
    bandeira.setAttribute('src', URL_apiBandeira + findCity.sys.country);
    grau.innerText = Math.round(findCity.main.temp) + '°C';
    temp.innerText = findCity.weather[0].description;
    umidade.innerHTML = findCity.main.humidity + '%';
    vento.innerHTML = findCity.wind.speed + 'km/h';
}

function clearFilds(){
    document.getElementById("city").value = '';
    notFound.style = 'display:none;';
    found.style = 'display:none'
}


function show(loading){
    const loadingCurrent = document.querySelector(".hiddenLoading");
    loadingCurrent.style = loading ? 'display:flex;': 'display:none';
}