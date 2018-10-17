export default function (props) {
  const {
    name,
    city_id: cityId,
    country: countryCode,
    country_name: countryName,
    timezone,
  } = props;

  return `
    <li class="city" data-name="${name}" 
        data-city-id="${cityId}" 
        data-country-code="${countryCode}"
        data-country-name="${countryName}"
        data-timezone="${timezone}">
          <span>${name}, ${countryName}</span>
          <a href="#" class="delete"> X </a>
    </li>
  `;
}
