export default function (props) {
  const {
    name,
    city_id: cityId,
    country: countryCode,
    country_name: countryName,
    timezone,
  } = props;

  return `
    <li class="city list list--sort" data-name="${name}" 
        data-city-id="${cityId}" 
        data-country-code="${countryCode}"
        data-country-name="${countryName}"
        data-timezone="${timezone}">
          <div class="list__half list__half--place">
            <span class="place place--city">${name}</span>
            <span class="place place--country-name">${countryName}</span>
          </div>
          <div class="list__half list__half--time">
            <span class="time time--12">- -</span>
            <span class="time time--day">- -</span>
            <span class="time time--24">- -</span>
          </div>
          <a href="#" class="delete">
             <svg role="img" class="icon"><use xlink:href="#icon-iconmonstr-x-mark-10"></use></svg>
          </a>
    </li>
  `;
}
