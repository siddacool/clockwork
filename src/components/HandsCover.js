export default function (props) {
  const {
    base,
    x = 0,
    y = 0,
    radius,
  } = props;

  return base
    .append('g')
    .attr('id', 'face-overlay')
    .append('circle')
    .attr('class', 'hands-cover')
    .attr('x', x)
    .attr('y', y)
    .attr('r', radius);
}
