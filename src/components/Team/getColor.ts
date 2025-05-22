import { paths, operations, components } from '../../openapi_schema';
import { config } from '../../config/config';

function getColor(team: components['schemas']['Team'] | null) {
  if (team === null || team?.color === null || team?.color === undefined) {
    return config.unknownColor;
  } else {
    return team.color;
  }
}

export { getColor };
