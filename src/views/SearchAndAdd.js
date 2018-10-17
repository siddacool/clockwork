import SearchContainer from '../containers/SearchContainer';

export default function () {
  const searchContainer = SearchContainer();

  const wrapper = document.getElementById('wrapper');
  wrapper.innerHTML = searchContainer;
}
