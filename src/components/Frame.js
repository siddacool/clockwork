import { Component } from 'domr-framework';
import { getCityDataAll } from '../utils/db-manipulation';
import Clock from './Clock';
import Cities from './Cities';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      id: 'frame',
    };
  }

  Markup() {
    const { id } = this.state;

    return `
      <div id="${id}" class="${id}" >
        <div class="container"></div>
      </div>
    `;
  }

  AfterRenderDone() {
    const frame = this.GetThisComponent();

    getCityDataAll()
      .then((data) => {
        const timezoneBase = data[0].timezone;
        let timezoneAlt = null;

        if (data[1]) {
          timezoneAlt = data[1].timezone;
        }

        const clock = new Clock({ timezoneBase, timezoneAlt });
        clock
          .AddTo(frame);

        const cities = new Cities({ citiesArr: data });

        cities
          .AddTo(frame);
      })
      .catch((err) => {
        console.log(err);
        location.href = '#/add';
      });
  }
}
