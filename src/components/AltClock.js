import Dial from './Dial';
import Ticks from './Ticks';
import Labels from './Labels';
import scales from './scales';

const { hourScale, secondScale } = scales;

export default function (props) {
  const {
    clockRadius,
    base,
    diff,
  } = props;

  const baseClock = base
    .append('g')
    .attr('id', 'alt-clock')
    .attr('class', 'alt-clock');

  const outerDial = Dial({
    base: baseClock,
    radius: clockRadius + 55,
    className: 'outer',
  });

  const secondTick = Ticks({
    base: baseClock,
    y1: clockRadius + 58,
    y2: (clockRadius + 58) + (-3),
    rangeArr: [0, 60],
    className: 'second-alt-tick',
    scaleName: 'secondScale',
    slantPoints: diff.m,
  });

  const hourTick = Ticks({
    base: baseClock,
    y1: clockRadius + 58,
    y2: (clockRadius + 58) + (-6),
    rangeArr: [0, 60],
    className: 'hour-alt-tick',
    scaleName: 'hourScale',
    slantPoints: diff.h,
  });

  secondTick
    .attr('transform', d => `rotate(${secondScale(d - diff.m)})`);

  hourTick
    .attr('stroke', (d) => {
      let strokeColor = '#fff';

      if (d % 3 === 0) {
        strokeColor = 'red';
      }

      return strokeColor;
    })
    .attr('transform', d => `rotate(${hourScale(d + diff.h)})`);

  const minuteLabel = Labels({
    base: baseClock,
    rangeArr: [5, 61, 5],
    className: 'minute-alt-label',
    scaleName: 'secondScale',
    radius: clockRadius + 70,
    offset: 3,
    slantPoints: diff.m,
  });

  const hourLabel = Labels({
    base: baseClock,
    rangeArr: [1, 13, 1],
    className: 'hour-alt-label',
    scaleName: 'hourScale',
    radius: clockRadius + 40,
    offset: 6,
    slantPoints: diff.h,
  });
}
