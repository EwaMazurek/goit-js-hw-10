import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
const searchBar = document.querySelector('#search-box');
const outputList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const style = document.createElement('style');
style.innerHTML = `
      .country-list {
        list-style: none;
        padding-left: 0;
      }
      .country-list li {
        display: flex;
        align-items: center;
       gap: 20px;
       padding-bottom: 20px;
      }`;
document.head.appendChild(style);

const inputHandler = e => {
  if (e.target.value.trim() === '') {
    outputList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(e.target.value.trim(), outputList, countryInfo);
};

searchBar.addEventListener('input', debounce(inputHandler, 300));
