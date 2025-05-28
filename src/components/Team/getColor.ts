import { paths, operations, components } from '../../openapi_schema';
import { config } from '../../config/config';

function getColor(
  team: components['schemas']['TeamExport'] | null
): Exclude<components['schemas']['TeamExport']['color'], null> {
  if (team === null || team?.color === null) {
    return config.unknownColor;
  } else {
    return team.color;
  }
}

export { getColor };
