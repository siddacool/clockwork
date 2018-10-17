import getTime from './get-time';

function convertMinsToHrsMins(min) {
  const realMin = min;
  const mins = Math.abs(realMin);
  const h = Math.floor(mins / 60);
  const m = mins % 60;

  return {
    h: realMin < 0 ? (h * (-1)) : (h + 1),
    m,
  };
}

function calculateTimezoneGap(timezoneBase, timezoneAlt) {
  let t1 = getTime(timezoneBase);
  let t2 = getTime(timezoneAlt);
  t1 = t1.utcOffset();
  t2 = t2.utcOffset();
  const diff = t1 - t2;
  const diffObj = convertMinsToHrsMins(diff);

  console.log(diffObj);

  return diffObj;
}

export default calculateTimezoneGap;
