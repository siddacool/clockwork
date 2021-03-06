import { Component } from 'domr-framework';
import { select } from 'd3';
import BaseClock from './BaseClock';
import AltClock from './AltClock';
import calculateTimezoneGap from '../utils/calculate-timezone-gap';

export default class extends Component {
  constructor(props = {}) {
    super();
    this.props = props;
    this.maxWidth = 500;
    this.clockRadius = 60;
    this.margin = 50;
    this.dimentions = (this.clockRadius + this.margin) * 3;
    this.hourHandLength = 2 * this.clockRadius / 3;
    this.minuteHandLength = this.clockRadius;
    this.secondHandLength = this.clockRadius - 12;
    this.secondHandBalance = 30;
    this.secondTickStart = this.clockRadius;
    this.secondTickLength = -6;
    this.hourTickStart = this.clockRadius;
    this.hourTickLength = -9;
    this.secondLabelRadius = this.clockRadius - 35;
    this.secondLabelYOffset = 5;
    this.hourLabelYOffset = 4;
    this.hour24LabelRadius = this.clockRadius - 30;
    this.hour24LabelYOffset = 5;
    this.state = {
      id: 'clock',
      clockRadius: this.clockRadius,
      width: this.dimentions,
      height: this.dimentions,
      secondTickLength: this.secondTickLength,
      hourTickLength: this.hourTickLength,
    };
  }

  Markup() {
    const { id, height } = this.state;
    return `
      <div id="${id}" style="height:${height}px;"class="clock">
      </div>
    `;
  }

  AfterRenderDone() {
    const {
      id,
      clockRadius,
      width,
      height,
      secondTickLength,
      hourTickLength,
    } = this.state;

    const { timezoneBase, timezoneAlt } = this.props;
    const svg = select(`#${id}`)
      .append('svg')
      .attr('class', 'canvas')
      .attr('width', width)
      .attr('height', height);

    const face = svg.append('g')
      .attr('id', 'clock-face')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const baseClock = BaseClock({
      clockRadius,
      base: face,
      secondTickLength,
      hourTickLength,
      timezone: timezoneBase,
    });

    if (timezoneAlt) {
      const diffTimezone = calculateTimezoneGap(timezoneBase, timezoneAlt);

      console.log(diffTimezone);

      const altClock = AltClock({
        clockRadius,
        base: face,
        diff: diffTimezone,
      });
    }
  }
}
