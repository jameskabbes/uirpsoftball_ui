import { paths, operations, components } from '../../openapi_schema';
import { DateTime } from 'luxon';
import { config } from '../../config/config';

function createEvent(
  game: components['schemas']['GameExport'],
  location: components['schemas']['LocationExport'] | null,
  homeTeam: components['schemas']['TeamExport'] | null,
  awayTeam: components['schemas']['TeamExport'] | null
): string {
  let date = DateTime.fromISO(game.datetime).setZone('UTC');
  return `BEGIN:VEVENT
DTSTART:${date.toFormat('yyyyLLdd')}T${date.toFormat('HHmmss')}Z
DURATION:PT1H
SUMMARY:UIRP Softball Game
LOCATION:${location?.name ?? 'Location TBD'}: ${location?.link ?? ''}
DESCRIPTION:${homeTeam?.name ?? 'Home Team TBD'} vs. ${
    awayTeam?.name ?? 'Away Team TBD'
  }\\nGame Details: ${config.frontendUrl}/games/${game.id}
URL: ${config.frontendUrl}/games/${game.id}
END:VEVENT`;
}

export { createEvent };
