import Dial from './Dial';
import Ticks from './Ticks';
import Labels from './Labels';
import HandsCover from './HandsCover';
import Hands from './Hands';
import scales from './scales';

const { hourScale, secondScale } = scales;

export default function (props) {
  const {
    clockRadius,
    base,
    secondTickLength,
    hourTickLength,
    timezone = '+05:30',
  } = props;
  const secondTickStart = clockRadius;
  const hourTickStart = clockRadius;

  const baseClock = base
    .append('g')
    .attr('id', 'base-clock')
    .attr('class', 'base-clock');

  const innerDial = Dial({
    base: baseClock,
    radius: clockRadius + 25,
    className: 'inner',
  });

  const secondTick = Ticks({
    base: baseClock,
    y1: secondTickStart,
    y2: secondTickStart + secondTickLength,
    rangeArr: [0, 60],
    className: 'second-tick',
  });

  secondTick
    .attr('transform', d => `rotate(${secondScale(d)})`);

  const hourTick = Ticks({
    base: baseClock,
    y1: hourTickStart,
    y2: hourTickStart + hourTickLength,
    rangeArr: [0, 12],
    className: 'hour-tick',
  });

  secondTick
    .attr('transform', d => `rotate(${secondScale(d)})`);

  hourTick
    .attr('stroke', (d) => {
      let strokeColor = '#fff';

      if (d % 3 === 0) {
        strokeColor = 'red';
      }

      return strokeColor;
    })
    .attr('transform', d => `rotate(${hourScale(d)})`);

  const hourLabel = Labels({
    base: baseClock,
    rangeArr: [1, 13, 1],
    className: 'hour-label',
    scaleName: 'hourScale',
    radius: clockRadius + 10,
    offset: 4,
  });

  const hour24Label = Labels({
    base: baseClock,
    rangeArr: [13, 25],
    className: 'hour24-label',
    scaleName: 'hourScale',
    radius: clockRadius - 24,
    offset: 3,
  });

  const hands = Hands({
    base: baseClock,
    radius: clockRadius,
    timezone,
  });

  const handsCover = HandsCover({
    base: baseClock,
    radius: clockRadius / 20,
  });
}
