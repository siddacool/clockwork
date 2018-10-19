import Dexie from 'dexie';
import db from './indexed-storage';

function saveCityData(city_id, name, country, country_name, timezone) {
  const promiseObj = new Promise((resolve, reject) => {
    let date = new Date();
    date = Date.parse(date);
    db.cities.put({
      city_id,
      name,
      country,
      country_name,
      timezone,
      date,
      order_no: date,
    })
      .then((id) => {
        return db.cities.get(id);
      })
      .then((item) => {
        resolve(item);
      })
      .catch((err) => {
        reject(err.stack || err);
      });
  });
  return promiseObj;
}

function getCityDataAll() {
  const promiseObj = new Promise((resolve, reject) => {
    db.cities.orderBy('order_no').toArray((data) => {
      if (data && data.length) {
        resolve(data);
      } else {
        reject('No Data');
      }
    }).catch((err) => {
      reject(err.stack || err);
    });
  });

  return promiseObj;
}

function removeCityData(city_id) {
  const promiseObj = new Promise((resolve, reject) => {
    db.cities.delete(city_id, () => {}).then(() => {
      resolve(city_id);
    }).catch((err) => {
      reject(err.stack || err);
    });
  });

  return promiseObj;
}

function clearCityData() {
  const promiseObj = new Promise((resolve, reject) => {
    db.cities.clear()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err.stack || err);
      });
  });
  return promiseObj;
}

function saveBulkCityData(drops) {
  const promiseObj = new Promise((resolve, reject) => {
    db.cities.bulkPut(drops)
      .then(() => {
        resolve();
      })
      .catch(Dexie.BulkError, (err) => {
        reject(err.stack || err);
      });
  });
  return promiseObj;
}

function updateOrderNo(city_id, orderNo) {
  const promiseObj = new Promise((resolve, reject) => {
    db.cities.update(city_id, { order_no: orderNo })
      .then(() => {
        resolve();
      })
      .catch(Dexie.BulkError, (err) => {
        reject(err.stack || err);
      });
  });
  return promiseObj;
}

function saveSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function getSessionStorage(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

function saveTimezoneBase(value) {
  saveSessionStorage('timezone-base-value', value);
}

function getTimezoneBase() {
  return getSessionStorage('timezone-base-value');
}


export {
  saveCityData,
  getCityDataAll,
  removeCityData,
  clearCityData,
  saveBulkCityData,
  updateOrderNo,
  saveTimezoneBase,
  getTimezoneBase,
};
