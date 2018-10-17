import * as moment from 'moment';

function getTime(zone) {
  const timezone = zone;
  const thisMoment = moment.utc();

  return thisMoment.utcOffset(timezone);
}

export default getTime;
