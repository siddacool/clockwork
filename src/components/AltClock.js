import Dial from './Dial';
import TicksRing from './TicksRing';
import LabelsRing from './LabelsRing';
import scales from './scales';

const { hourScale, secondScale } = scales;

export default function (props) {
  const {
    clockRadius,
    base,
  } = props;

  const baseClock = base
    .append('g')
    .attr('id', 'alt-clock')
    .attr('class', 'alt-clock');

  const outerDial = Dial({
    base: baseClock,
    radius: clockRadius + 55,
    className: 'outer-dial',
  });

  const secondTick = TicksRing({
    base: baseClock,
    y1: clockRadius + 58,
    y2: (clockRadius + 58) + (-3),
    rangeArr: [0, 60],
    className: 'second-alt-tick',
    scaleName: 'secondScale',
    slantPoints: 30,
  });

  const hourTick = TicksRing({
    base: baseClock,
    y1: clockRadius + 58,
    y2: (clockRadius + 58) + (-6),
    rangeArr: [0, 60],
    className: 'hour-alt-tick',
    scaleName: 'hourScale',
    slantPoints: 1,
  });

  secondTick
    .attr('transform', d => `rotate(${secondScale(d + 30)})`);

  hourTick
    .attr('stroke', (d) => {
      let strokeColor = '#fff';

      if (d % 3 === 0) {
        strokeColor = 'red';
      }

      return strokeColor;
    })
    .attr('transform', d => `rotate(${hourScale(d - 1)})`);

  const minuteLabel = LabelsRing({
    base: baseClock,
    rangeArr: [5, 61, 5],
    className: 'minute-alt-label',
    scaleName: 'secondScale',
    radius: clockRadius + 70,
    offset: 5,
    slantPoints: 30,
  });

  const hourLabel = LabelsRing({
    base: baseClock,
    rangeArr: [1, 13, 1],
    className: 'hour-alt-label',
    scaleName: 'hourScale',
    radius: clockRadius + 40,
    offset: 6,
    slantPoints: -1,
  });
}
