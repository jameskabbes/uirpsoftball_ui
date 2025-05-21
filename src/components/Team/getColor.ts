import { paths, operations, components } from '../../openapi_schema';
import siteConfig from '../../siteConfig.json';

function getColor(team: components['schemas']['Team'] | null) {
  if (team === null || team?.color === null || team?.color === undefined) {
    return siteConfig.unknown_color;
  } else {
    return team.color;
  }
}

export { getColor };
