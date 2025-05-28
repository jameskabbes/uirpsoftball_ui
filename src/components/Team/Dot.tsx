import React from 'react';
import { Dot as UtilsDot } from '../utils/Dot';
import { getColor } from './getColor';
import { paths, operations, components } from '../../openapi_schema';
import { config } from '../../config/config';
import { DataProps } from '../../types';

interface Props
  extends DataProps<{
    team: components['schemas']['TeamExport'] | null;
  }> {
  style?: object;
}

function Dot({ data, style = {} }: Props) {
  return (
    <UtilsDot
      color={data === undefined ? config.unknownColor : getColor(data.team)}
      style={style}
    />
  );
}

export { Dot };
