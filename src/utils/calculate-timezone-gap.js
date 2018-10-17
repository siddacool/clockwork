import getTime from './get-time';

function convertMinsToHrsMins(min) {
  const realMin = min;
  const isPositive = realMin >= 0;
  const mins = Math.abs(realMin);
  let h = Math.floor(mins / 60);
  const m = mins % 60;
  h = isPositive ? h : JSON.parse(`-${h}`);

  return {
    h,
    m,
  };
}

function calculateTimezoneGap(timezoneBase, timezoneAlt) {
  const t1 = getTime(timezoneBase);
  const t2 = getTime(timezoneAlt);
  const diff = t1.utcOffset() - t2.utcOffset();
  const diffObj = convertMinsToHrsMins(diff);

  return diffObj;
}

export default calculateTimezoneGap;
