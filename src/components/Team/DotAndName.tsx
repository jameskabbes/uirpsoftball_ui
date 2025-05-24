import React from 'react';
import { Dot as TeamDot } from './Dot';
import { paths, operations, components } from '../../openapi_schema';

interface Props {
  team: components['schemas']['TeamExport'] | undefined;
}

function DotAndName({ team }: Props) {
  return (
    <span>
      <TeamDot team={team} style={{ marginRight: '0.25em' }} />
      {team === undefined ? 'Team' : team.name}
    </span>
  );
}

export { DotAndName };
