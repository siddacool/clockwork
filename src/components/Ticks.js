import { range } from 'd3';

export default function (props) {
  const {
    base,
    x1 = 0,
    x2 = 0,
    y1,
    y2,
    rangeArr,
    className,
  } = props;

  return base
    .selectAll(`.${className}`)
    .data(range(...rangeArr))
    .enter()
    .append('line')
    .attr('class', className)
    .attr('x1', x1)
    .attr('x2', x2)
    .attr('y1', y1)
    .attr('y2', y2);
}
