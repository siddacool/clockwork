import SerachInput from '../components/SerachInput';
import SearchResults from '../components/SearchResults';

export default function () {
  const serachInput = new SerachInput();
  const searchResults = new SearchResults();

  return `
    <div class="search-container">
      <div class="search-bar">
        ${serachInput.Render()}
      </div>
        ${searchResults.Render()}
    </div>
  `;
}
