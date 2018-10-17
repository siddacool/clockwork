import { Component } from 'domr-framework';
import SearchResult from './SearchResult';
import fireSearchEvent from '../utils/fire-search-event';

export default class extends Component {
  constructor() {
    super();
  }

  Markup() {
    return `
      <input type="text" id="search-input" placeholder="Mumbai, New York"/>
    `;
  }

  Events() {
    let timeout = null;

    this.Keyup((self) => {
      const thisSelf = self;

      timeout = setTimeout(() => {
        const val = self.value.trim().toLowerCase();
        const ul = document.getElementById('search-results');
        if (val) {
          fireSearchEvent(val)
            .then((result) => {
              const thisResult = result;
              const searchTerm = val;
              ul.innerHTML = `
                 ${thisResult.map(r => SearchResult({ searchTerm, ...r })).join('')}
              `;
            })
            .catch((err) => {
              console.log(err);

              ul.innerHTML = `<h2>${err}</h2>`;
            });
        }
      }, 300);
    });
  }

  AfterRenderDone() {
    const thisSelf = this.GetThisComponent();

    thisSelf.focus();
  }
}
