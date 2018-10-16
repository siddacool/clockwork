import { select } from 'd3';
import scales from './scales';
import getTime from '../utils/get-time';

const { hourScale, minuteScale, secondScale } = scales;

export default function (props) {
  const {
    base,
    radius,
    timezone = '+05:30',
  } = props;

  const hourHandLength = 2 * radius / 3;
  const minuteHandLength = radius;
  const secondHandLength = radius - 12;

  const handData = [
    {
      type: 'hour',
      value: 0,
      length: -hourHandLength,
      scale: hourScale,
    },
    {
      type: 'minute',
      value: 0,
      length: -minuteHandLength,
      scale: minuteScale,
    },
    {
      type: 'second',
      value: 0,
      length: -secondHandLength,
      scale: secondScale,
      balance: 30,
    },
  ];

  function moveHands() {
    select('#clock-hands')
      .selectAll('line')
      .data(handData)
      .transition()
      .attr('transform', d => `rotate(${d.scale(d.value)})`);
  }

  function updateData() {
    const thisMoment = getTime(timezone);
    const getMinutes = JSON.parse(thisMoment.format('m'));
    const getSeconds = JSON.parse(thisMoment.format('s'));
    const getHours = JSON.parse(thisMoment.format('H'));
    handData[0].value = (getHours % 12) + getMinutes / 60;
    handData[1].value = getMinutes;
    handData[2].value = getSeconds;
  }

  const hands = base
    .append('g')
    .attr('id', 'clock-hands');

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
    updateData();
    moveHands();
  }, 1000);
}
