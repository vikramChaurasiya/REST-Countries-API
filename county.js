const countryName = new URLSearchParams(location.search).get('name');
const flageImg = document.querySelector(' .country-details img');
const countryNameE = document.querySelector('.country-details h1');
const nativeName = document.querySelector('.native-name');
const population = document.querySelector('.population');
const region = document.querySelector('.Region');
const Subregion = document.querySelector('.subregion');
const capital = document.querySelector('.capital');
const topLevel = document.querySelector('.top-level');
const currence = document.querySelector('.Currence');
const language = document.querySelector('.Language');
const borderCountries = document.querySelector('.border-countries');
const themeChanger = document.querySelector('.theme-Changer');

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
    // console.log([country])
    flageImg.src = country.flags.svg;
    countryNameE.innerText = country.name.common;
    population.innerText = country.population.toLocaleString();
    region.innerText = country.region;
    Subregion.innerText = country.subregion;
    capital.innerText = country.capital;
    topLevel.innerText = country.tld.join(', ');

    if(country.name.nativeName){
        nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    }else{
        nativeName.innerText = country.name.common;
    }

    if(country.currencies){
        currence.innerText = Object.values(country.currencies).map((currency)=> currency.name).join(', ');
    }


    if(country.languages){
        language.innerText= Object.values(country.languages).join(', ')
    }
    if(country.subregion){
        Subregion.innerText = country.subregion;
    }
    if(country.capital){
        capital.innerText = country.capital;
    }

    if(country.borders){
        country.borders.forEach((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res)=> res.json())
            .then(([borderCountry])=> {
                // console.log(borderCountry);
                const borderCountryTag = document.createElement('a');
                borderCountryTag.innerText = borderCountry.name.common;
                borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                // console.log(borderCountryTag);
                borderCountries.append(borderCountryTag)
            })
        });
    }
})

themeChanger.addEventListener('click',(e) => {
    document.body.classList.toggle('dark')
})