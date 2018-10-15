import { Component } from 'domr-framework';
import * as d3 from 'd3';
import * as moment from 'moment';

export default class extends Component {
  constructor() {
    super();
    this.radians = 0.0174532925;
    this.wrapperWidth = document.querySelector('body').clientWidth;
    this.maxWidth = 500;
    this.clockRadius = 80;
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
    this.hourLabelRadius = this.clockRadius + 10;
    this.hourLabelYOffset = 4;
    this.hour24LabelRadius = this.clockRadius - 30;
    this.hour24LabelYOffset = 5;
    this.hourScale = d3.scaleLinear()
      .range([0, 330])
      .domain([0, 11]);
    this.minuteScale = d3.scaleLinear()
      .range([0, 354])
      .domain([0, 59]);
    this.secondScale = d3.scaleLinear()
      .range([0, 354])
      .domain([0, 59]);
    this.hour24Scale = d3.scaleLinear()
      .range([0, 330])
      .domain([0, 11]);
    this.state = {
      id: 'clock',
      radians: this.radians,
      clockRadius: this.clockRadius,
      margin: this.margin,
      width: this.dimentions,
      height: this.dimentions,
      secondTickStart: this.secondTickStart,
      secondTickLength: this.secondTickLength,
      hourTickStart: this.hourTickStart,
      hourTickLength: this.hourTickLength,
      secondLabelRadius: this.secondLabelRadius,
      secondLabelYOffset: this.secondLabelYOffset,
      hourLabelRadius: this.hourLabelRadius,
      hourLabelYOffset: this.hourLabelYOffset,
      hour24LabelRadius: this.hour24LabelRadius,
      hour24LabelYOffset: this.hour24LabelYOffset,
      handData: [
        {
          type: 'hour',
          value: 0,
          length: -this.hourHandLength,
          scale: this.hourScale,
        },
        {
          type: 'minute',
          value: 0,
          length: -this.minuteHandLength,
          scale: this.minuteScale,
        },
        {
          type: 'second',
          value: 0,
          length: -this.secondHandLength,
          scale: this.secondScale,
          balance: this.secondHandBalance,
        },
      ],
    };
  }

  Markup() {
    const { id } = this.state;
    return `
      <div id="${id}" class="clock">
      </div>
    `;
  }

  createMoment() {
    return moment.utc();
  }

  moveHands() {
    const { handData } = this.state;
    d3
      .select('#clock-hands')
      .selectAll('line')
      .data(handData)
      .transition()
      .attr('transform', d => `rotate(${d.scale(d.value)})`);
  }

  updateData() {
    const timezone = '+05:30';
    let thisMoment = this.createMoment();
    thisMoment = thisMoment.utcOffset(timezone);
    const getMinutes = JSON.parse(thisMoment.format('m'));
    const getSeconds = JSON.parse(thisMoment.format('s'));
    const getHours = JSON.parse(thisMoment.format('H'));
    this.state.handData[0].value = (getHours % 12) + getMinutes / 60;
    this.state.handData[1].value = getMinutes;
    this.state.handData[2].value = getSeconds;
  }

  AfterRenderDone() {
    const {
      id,
      radians,
      clockRadius,
      margin,
      width,
      height,
      secondTickStart,
      secondTickLength,
      hourTickStart,
      hourTickLength,
      secondLabelRadius,
      secondLabelYOffset,
      hourLabelRadius,
      hourLabelYOffset,
      hour24LabelRadius,
      hour24LabelYOffset,
      handData,
    } = this.state;

    const svg = d3.select(`#${id}`)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const face = svg.append('g')
      .attr('id', 'clock-face')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    face
      .selectAll('.second-tick')
      .data(d3.range(0, 60)).enter()
      .append('line')
      .attr('class', 'second-tick')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', secondTickStart)
      .attr('y2', secondTickStart + secondTickLength)
      .attr('transform', d => `rotate(${this.secondScale(d)})`);

   /* face
      .selectAll('.second-label')
      .data(d3.range(5, 61, 5))
      .enter()
      .append('text')
      .attr('class', 'second-label')
      .attr('text-anchor', 'middle')
      .attr('x', d => (secondLabelRadius * Math.sin(this.secondScale(d) * radians)))
      .attr('y', d => (-secondLabelRadius * Math.cos(this.secondScale(d) * radians) + secondLabelYOffset))
      .text(d => d);*/

    face
      .selectAll('.hour-tick')
      .data(d3.range(0, 12))
      .enter()
      .append('line')
      .attr('class', 'hour-tick')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', hourTickStart)
      .attr('y2', hourTickStart + hourTickLength)
      .attr('stroke', (d) => {
        let strokeColor = '#000';

        if (d % 3 === 0) {
          strokeColor = 'red';
        }

        return strokeColor;
      })
      .attr('transform', d => `rotate(${this.hourScale(d)})`);

    face.selectAll('.hour-label')
      .data(d3.range(1, 13, 1))
      .enter()
      .append('text')
      .attr('class', 'hour-label')
      .attr('text-anchor', 'middle')
      .attr('x', d => (hourLabelRadius * Math.sin(this.hourScale(d) * radians)))
      .attr('y', d => (-hourLabelRadius * Math.cos(this.hourScale(d) * radians) + hourLabelYOffset))
      .text(d => d);

    face.selectAll('.hour24-label')
      .data(d3.range(13, 25))
      .enter()
      .append('text')
      .attr('class', 'hour24-label')
      .attr('text-anchor', 'middle')
      .attr('x', d => (hour24LabelRadius * Math.sin(this.hour24Scale(d) * radians)))
      .attr('y', d => (-hour24LabelRadius * Math.cos(this.hour24Scale(d) * radians) + hour24LabelYOffset))
      .text(d => d);

    const hands = face
      .append('g')
      .attr('id', 'clock-hands');

    face
      .append('g')
      .attr('id', 'face-overlay')
      .append('circle')
      .attr('class', 'hands-cover')
      .attr('x', 0)
      .attr('y', 0)
      .attr('r', clockRadius / 20);

    hands
      .selectAll('line')
      .data(handData)
      .enter()
      .append('line')
      .attr('class', d => `${d.type}-hand`)
      .attr('x1', 0)
      .attr('y1', d => (d.balance ? d.balance : 0))
      .attr('x2', 0)
      .attr('y2', d => d.length)
      .attr('transform', d => `rotate(${d.scale(d.value)})`);

    setInterval(() => {
      this.updateData();
      this.moveHands();
    }, 1000);
  }
}
