import Notiflix from 'notiflix';
export const fetchCountries = (name, outputList, countryInfo) => {
  fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (response.ok) return response.json();
      else {
        outputList.innerHTML = '';
        countryInfo.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name');
        throw new Error('Status code error :' + response.status);
      }
    })
    .then(arr => {
      if (arr.length > 10) {
        outputList.innerHTML = '';
        countryInfo.innerHTML = '';
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (arr.length <= 10 && arr.length >= 2) {
        outputList.innerHTML = '';
        countryInfo.innerHTML = '';
        arr.forEach(country => {
          outputList.insertAdjacentHTML(
            'beforeend',
            `<li><img src=${country.flags.svg} width=40px height=30px><span> ${country.name}</span></li>`
          );
        });
      }
      if (arr.length === 1) {
        outputList.innerHTML = '';
        countryInfo.innerHTML = '';
        let countryData = arr[0];
        let languageProp = countryData.languages.map(language => language.name);

        countryInfo.insertAdjacentHTML(
          'afterbegin',
          `<img src=${countryData.flags.svg} width=40px height=30px>
              <span> <b>${countryData.name}</b></span>
               <p>Capital: <b>${countryData.capital}</b></p>
               <p>Population: <b>${countryData.population}</b></p>
               <p>Languages: <b>${languageProp.join(', ')}</b></p>`
        );
      }
    })
    .catch(error => console.log(error));
};
