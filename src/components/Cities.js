import * as Sortable from 'sortablejs';
import { Component } from 'domr-framework';
import City from './City';
import Clock from './Clock';
import { saveCityData, getCityDataAll, removeCityData, clearCityData } from '../utils/db-manipulation';

export default class extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  Markup() {
    return `
      <div id="cities-list" class="cities">
      </div>
    `;
  }

  AfterRenderDone() {
    const thisSelf = this.GetThisComponent();
    const { citiesArr } = this.props;

    thisSelf.innerHTML = `
      <a href="#/add" class="add-btn">Add</a>
      <ul>
        ${citiesArr.map(c => City(c)).join('')}
      </ul>
    `;

    const el = thisSelf.querySelector('ul');
    el.addEventListener('click', (event) => {
      if (event.target && event.target.matches('.delete')) {
        event.preventDefault();
        const parent = event.target.parentElement;
        const grandParent = parent.parentElement;

        removeCityData(parent.getAttribute('data-city-id'))
          .then(() => {
            grandParent.removeChild(parent);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    const sortable = Sortable.create(el, {
      onUpdate: () => {
        clearCityData()
          .then(() => {
            
          })
          .catch((clrerr) => {
            console.log(clrerr);
          });
      },
    });
  }
}
