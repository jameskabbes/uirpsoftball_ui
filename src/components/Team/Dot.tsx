import React from 'react';
import { Dot as UtilsDot } from '../utils/Dot';
import { getColor } from './getColor';
import { paths, operations, components } from '../../openapi_schema';

interface Props {
  team: components['schemas']['TeamExport'] | undefined;
  style?: object;
}

function Dot({ team, style = {} }: Props) {
  return <UtilsDot color={getColor(team)} style={style} />;
}

export { Dot };
