import { Component } from 'domr-framework';
import * as d3 from 'd3';
import BaseClock from './BaseClock';
import AltClock from './AltClock';

export default class extends Component {
  constructor() {
    super();
    this.wrapperWidth = document.querySelector('body').clientWidth;
    this.maxWidth = 500;
    this.clockRadius = 70;
    this.margin = 50;
    this.dimentions = d3.min([this.wrapperWidth, this.maxWidth]);
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
    const { id } = this.state;
    return `
      <div id="${id}" class="clock">
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

    const svg = d3.select(`#${id}`)
      .append('svg')
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
    });

    const altClock = AltClock({
      clockRadius,
      base: face,
    });
  }
}
