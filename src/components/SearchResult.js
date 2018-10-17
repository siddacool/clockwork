export default function (props) {
  const {
    name,
    city_id: cityId,
    country_code: countryCode,
    country_name: countryName,
    timezone,
  } = props;
  console.log(props);
  return `
    <li>
      <a href="#" 
        data-name="${name}" 
        data-city-id="${cityId}" 
        data-country-code="${countryCode}"
        data-country-name="${countryName}"
        data-timezone="${timezone}">
          ${name}, ${countryName}
      </a>
    </li>
  `;
}
