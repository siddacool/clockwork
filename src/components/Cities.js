import { Component } from 'domr-framework';
import City from './City';

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
      ${citiesArr.map(c => City(c)).join('')}
    `;

    console.log(citiesArr);
  }
}
