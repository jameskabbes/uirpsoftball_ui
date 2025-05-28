import React from 'react';
import { Dot as TeamDot } from './Dot';
import { paths, operations, components } from '../../openapi_schema';
import { DataProps } from '../../types';

interface Props
  extends DataProps<{
    team: components['schemas']['TeamExport'] | null;
  }> {}

function DotAndName({ data }: Props) {
  return (
    <span>
      <TeamDot data={data} style={{ marginRight: '0.25em' }} />
      {data === undefined
        ? 'loading...'
        : data.team === null
        ? 'TBD'
        : data.team.name}
    </span>
  );
}

export { DotAndName };
