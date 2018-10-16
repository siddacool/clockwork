import { range } from 'd3';
import scales from './scales';
import radians from './radians';

export default function (props) {
  const {
    base,
    rangeArr,
    className,
    slantPoints = 0,
    scaleName,
    radius,
    offset,
  } = props;

  const thisScale = scales[scaleName];

  return base
    .selectAll(`.${className}`)
    .data(range(...rangeArr))
    .enter()
    .append('text')
    .attr('class', className)
    .attr('text-anchor', 'middle')
    .attr('x', d => (radius * Math.sin(thisScale(d + slantPoints) * radians)))
    .attr('y', d => (-radius * Math.cos(thisScale(d + slantPoints) * radians) + offset))
    .text(d => d);
}
