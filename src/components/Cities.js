import * as Sortable from 'sortablejs';
import { Component } from 'domr-framework';
import City from './City';
import Clock from './Clock';
import { getCityDataAll, removeCityData, updateOrderNo } from '../utils/db-manipulation';

function updateClock() {
  getCityDataAll()
    .then((data) => {
      const timezoneBase = data[0].timezone;
      let timezoneAlt = null;

      if (data[1]) {
        timezoneAlt = data[1].timezone;
      }

      const oldClock = document.getElementById('clock');
      const clock = new Clock({ timezoneBase, timezoneAlt });
      clock
        .Replace(oldClock);
    })
    .catch((err) => {
      console.log(err);
      location.href = '#/add';
    });
}

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
            location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    const sortable = Sortable.create(el, {
      onUpdate: () => {
        const ul = thisSelf.querySelector('ul');
        const cities = ul.querySelectorAll('li');

        cities.forEach((city, i) => {
          const cityId = city.getAttribute('data-city-id');
          const name = city.getAttribute('data-name');

          updateOrderNo(cityId, i + 1)
            .then(() => {
              console.log('updated');
              location.reload();
            })
            .catch((err) => {
              console.log(err);
              console.log(name);
            });
        });
      },
    });
  }
}
