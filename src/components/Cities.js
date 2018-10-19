import * as Sortable from 'sortablejs';
import { Component } from 'domr-framework';
import { select, range } from 'd3';
import City from './City';
import scales from './scales';
import {
  getCityDataAll,
  removeCityData,
  updateOrderNo,
  saveTimezoneBase,
} from '../utils/repository';
import calculateTimezoneGap from '../utils/calculate-timezone-gap';

function clockAltShow() {
  const base = select('#alt-clock');

  base
    .attr('style', 'opacity: 1;');
}

function clockAltHide() {
  const base = select('#alt-clock');

  base
    .attr('style', 'opacity: 0;');
}

function clearAltLabelsGroup(className) {
  const base = select(`.group-${className}`);

  base
    .selectAll('*')
    .remove();
}

function updateAltLabels(className, slantPoints, scaleName) {
  clearAltLabelsGroup(className);
  clockAltShow();
  const radians = 0.0174532925;
  const base = select(`.group-${className}`);
  const radius = JSON.parse(base.attr('data-radius'));
  const offset = JSON.parse(base.attr('data-offset'));
  const thisScale = scales[scaleName];
  let rangeArr = base.attr('data-rangeArr');
  rangeArr = rangeArr.split(',');

  base
    .selectAll(`.${className}`)
    .data(range(...rangeArr))
    .enter()
    .append('text')
    .attr('class', `${className}`)
    .attr('text-anchor', 'middle')
    .attr('x', d => (radius * Math.sin(thisScale(d + slantPoints) * radians)))
    .attr('y', d => (-radius * Math.cos(thisScale(d + slantPoints) * radians) + offset))
    .text(d => d);
}

function updateAltHourLabels(slantPoints) {
  updateAltLabels('hour-alt-label', slantPoints, 'hourScale');
}

function updateAltMinuteLabels(slantPoints) {
  updateAltLabels('minute-alt-label', slantPoints, 'minuteScale');
}

function updateClock() {
  getCityDataAll()
    .then((data) => {
      const timezoneBase = data[0].timezone;

      if (data[1]) {
        const timezoneAlt = data[1].timezone;
        const gap = calculateTimezoneGap(timezoneBase, timezoneAlt);
        const hourAltTick = select('.group-hour-alt-tick')
          .selectAll('.hour-alt-tick');
        const secondAltTick = select('.group-second-alt-tick')
          .selectAll('.second-alt-tick');
        updateAltHourLabels(gap.h);
        updateAltMinuteLabels(gap.m);

        hourAltTick
          .attr('stroke', (d) => {
            let strokeColor = '#fff';

            if (d % 3 === 0) {
              strokeColor = 'red';
            }

            return strokeColor;
          })
          .attr('transform', d => `rotate(${scales.hourScale(d + gap.h)})`);

        secondAltTick
          .attr('transform', d => `rotate(${scales.secondScale(d - gap.m)})`);
      } else {
        clockAltHide();
      }

      saveTimezoneBase(timezoneBase);
    })
    .catch((err) => {
      console.log(err);
      location.href = '#/add';
    });
}

export default class extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  Markup() {
    return `
      <div id="cities-list" class="cities">
      </div>
    `;
  }

  AfterRenderDone() {
    const thisSelf = this.GetThisComponent();
    const { citiesArr } = this.props;

    thisSelf.innerHTML = `
      <a href="#/add" class="add-btn">Add</a>
      <ul>
        ${citiesArr.map(c => City(c)).join('')}
      </ul>
    `;

    const el = thisSelf.querySelector('ul');
    el.addEventListener('click', (event) => {
      if (event.target && event.target.matches('.delete')) {
        event.preventDefault();
        const parent = event.target.parentElement;
        const grandParent = parent.parentElement;

        removeCityData(parent.getAttribute('data-city-id'))
          .then(() => {
            grandParent.removeChild(parent);
            updateClock();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    const sortable = Sortable.create(el, {
      onUpdate: () => {
        const ul = thisSelf.querySelector('ul');
        const cities = ul.querySelectorAll('li');

        cities.forEach((city, i) => {
          const cityId = city.getAttribute('data-city-id');
          const name = city.getAttribute('data-name');

          updateOrderNo(cityId, i + 1)
            .then(() => {
              console.log('updated');
              updateClock();
            })
            .catch((err) => {
              console.log(err);
              console.log(name);
            });
        });
      },
    });
  }
}
