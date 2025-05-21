import { DateTime } from 'luxon';

function getDate(isoString: string, time_zone: string): DateTime {
  return DateTime.fromISO(isoString).setZone(time_zone);
}

export { getDate };
