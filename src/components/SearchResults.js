import { Component } from 'domr-framework';
import { saveCityData } from '../utils/db-manipulation';

export default class extends Component {
  constructor() {
    super();
  }

  Markup() {
    return `
      <ul id="search-results" class="search">
      </ul>
    `;
  }

  AfterRenderDone() {
    const handlingParent = this.GetThisComponent();
    handlingParent.addEventListener('click', (event) => {
      if (event.target && event.target.matches('a')) {
        event.preventDefault();
        const searchResult = event.target;
        const cityId = searchResult.getAttribute('data-city-id');
        const name = searchResult.getAttribute('data-name');
        const country = searchResult.getAttribute('data-country-code');
        const countryName = searchResult.getAttribute('data-country-name');
        const timezone = searchResult.getAttribute('data-timezone');

        saveCityData(cityId, name, country, countryName, timezone)
          .then(() => {
            location.href = '#/';
          }).catch((err) => {
            console.log(err);
          });
      }
    });
  }
}
