import { GetAllPlaces } from 'purple-maps-api';

const noDataError = 'No Data';

function fireSearchEvent(searchTerm) {
  const promiseObj = new Promise((resolve, reject) => {
    GetAllPlaces()
      .then((result) => {
        if (result !== '' && result.length > 0) {
          const arr = result;
          const arrSorted = arr.sort((a, b) => a.name.localeCompare(b.name));
          const cityArr = arrSorted.filter(e => e.city_id);
          const countryArr = arrSorted.filter(e => e.country_id);
          const val = searchTerm.toLowerCase();
          let finalArr = [];

          cityArr.forEach((city) => {
            const thisCity = city;
            thisCity.country = thisCity.country_code;
            const assignCountry = countryArr.filter(e => e.country_code === thisCity.country);
            thisCity.country_name = assignCountry[0].name;
            const newCityName = thisCity.name.toLowerCase();
            thisCity.name = newCityName;

            if (thisCity.name.toLowerCase().startsWith(val)) {
              thisCity.priority = 1;
              finalArr.push(thisCity);
            }
          });

          countryArr.forEach((country) => {
            const thisCountry = country;
            const newCountryName = thisCountry.name.toLowerCase();
            thisCountry.name = newCountryName;
            if (thisCountry.name.startsWith(val)) {
              cityArr.forEach((city) => {
                const thisCity = city;
                thisCity.country = thisCity.country_code;
                if (thisCountry.country_code === thisCity.country) {
                  const duplicates = finalArr.find(obj => obj.city_id === thisCity.city_id);
                  if (!duplicates) {
                    thisCity.header = thisCountry.name;
                    thisCity.priority = 2;
                    finalArr.push(thisCity);
                  }
                }
              });
            }
          });

          if (finalArr.length) {
            finalArr = finalArr.sort((a, b) => a.priority < b.priority ? -1 : 1);
            resolve(finalArr);
          } else {
            reject(noDataError);
          }
        } else {
          reject(noDataError);
        }
      }).catch((err) => {
        reject(err);
      });
  });

  return promiseObj;
}

export default fireSearchEvent;
