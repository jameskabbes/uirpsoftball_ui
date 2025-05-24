import { paths, operations, components } from '../../openapi_schema';
import { config } from '../../config/config';

function getColor(team: components['schemas']['TeamExport'] | undefined) {
  if (team === undefined || team?.color === null) {
    return config.unknownColor;
  } else {
    return team.color;
  }
}

export { getColor };
