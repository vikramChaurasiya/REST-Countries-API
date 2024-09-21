const countriesContainer = document.querySelector('.Countires-container');
const filterByregion = document.querySelector('.filter-by-region');
const searchInput = document.querySelector('.search-container input');
const themeChanger = document.querySelector('.theme-Changer');
let allCountriesData;


fetch('https://restcountries.com/v3.1/all')
.then((res)=> res.json())
.then((data) =>{
    renderedCountries(data)
    allCountriesData = data;
})

// filter start.

filterByregion.addEventListener('change',(e) => {
    // console.log(e.target.value);
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res)=> res.json())
    .then(renderedCountries) 
})
// filterByregion.addEventListener('change',(e) => {
//     // console.log(e.target.value);
//     fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
//     .then((res)=> res.json())
//     .then((data)=> {

//        data.forEach((country)=> {
//         console.log(country);
//         const countryCard = document.createElement('a');
//         countryCard.classList.add('country-card');
//         countryCard.href= `/country.html?name=${country.name.common}`
    
        
//         countryCard.innerHTML= `
//             <img src="${country.flags.svg}" alt="${country.flags.svg}">
//             <div class="card-text">
//                 <h3 class="card-title" >${country.name.common}</h3>
//                 <p><b>Population:</b> ${country.population.toLocaleString()}</p>
//                 <p><b>Region: </b>${country.region
//                 }</p>
//                 <p><b>Capital: </b>${country.capital}</p>
//             </div>
//         `;
         
    
//         countriesContainer.append(countryCard);
        
//        })
//     })
// })

function renderedCountries(data){

    countriesContainer.innerHTML = ''
    data.forEach((country)=> {
    // console.log(country);
    const countryCard = document.createElement('a');
    countryCard.classList.add('country-card');
    countryCard.href= `/country.html?name=${country.name.common}`

    
    countryCard.innerHTML= `
        <img src="${country.flags.svg}" alt="${country.flags.svg}">
        <div class="card-text">
            <h3 class="card-title" >${country.name.common}</h3>
            <p><b>Population:</b> ${country.population.toLocaleString()}</p>
            <p><b>Region: </b>${country.region
            }</p>
            <p><b>Capital: </b>${country.capital}</p>
        </div>
    `;
     

    countriesContainer.append(countryCard);
    
   })
}

searchInput.addEventListener('input' ,(e) =>{
    // console.log(e.target.value);
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    // console.log(filteredCountries);

    renderedCountries(filteredCountries)
    
})


themeChanger.addEventListener('click',(e) => {
    document.body.classList.toggle('dark')
})