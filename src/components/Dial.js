export default function (props) {
  const {
    base,
    x = 0,
    y = 0,
    radius,
    className,
  } = props;

  return base
    .append('g')
    .append('circle')
    .attr('class', className)
    .attr('x', x)
    .attr('y', y)
    .attr('r', radius);
}
