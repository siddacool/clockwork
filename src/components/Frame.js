import { Component } from 'domr-framework';
import Clock from './Clock';
import { getCityDataAll } from '../utils/db-manipulation';

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
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
