import { paths, operations, components } from '../../openapi_schema';
import { DateTime } from 'luxon';
import { config } from '../../config/config';

function createEvent(
  game: components['schemas']['Game-Input'],
  location: components['schemas']['Location'],
  homeTeam: components['schemas']['Team'],
  awayTeam: components['schemas']['Team'],
  officiatingTeam: components['schemas']['Team']
): string {
  let date = DateTime.fromISO(game.datetime).setZone('UTC');
  return `BEGIN:VEVENT
DTSTART:${date.toFormat('yyyyLLdd')}T${date.toFormat('HHmmss')}Z
DURATION:PT1H
SUMMARY:UIRP Softball Game
LOCATION:${location.name}: ${location.link}
DESCRIPTION:${homeTeam.name} vs. ${awayTeam.name}\\nUmpires: ${
    officiatingTeam.name
  }\\nGame Details: https://${config.frontendUrl}/game/${game.id}
END:VEVENT`;
}

export { createEvent };
