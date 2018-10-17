import { scaleLinear } from 'd3';

const hourScale = scaleLinear()
  .range([0, 330])
  .domain([0, 11]);

const minuteScale = scaleLinear()
  .range([0, 354])
  .domain([0, 59]);

const secondScale = scaleLinear()
  .range([0, 354])
  .domain([0, 59]);

const scales = {
  hourScale,
  minuteScale,
  secondScale,
};

export default scales;
