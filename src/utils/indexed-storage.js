import Dexie from 'dexie';
import { indexedDbCookie } from '../project.json';

const db = new Dexie(indexedDbCookie);
db.version(1).stores({
  cities: 'city_id, name, country, country_name, timezone, date, order_no',
});

export default db;
