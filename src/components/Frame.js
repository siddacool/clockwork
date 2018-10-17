import { Component } from 'domr-framework';
import Clock from './Clock';

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
    const timezoneBase = '+05:30';
    const timezoneAlt = '+07:00';
    const clock = new Clock({ timezoneBase, timezoneAlt });

    clock
      .AddTo(frame);
  }
}
