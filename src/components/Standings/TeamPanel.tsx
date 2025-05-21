import React from 'react';
import { Dot as TeamDot } from '../Team/Dot';
import { Panel } from './Panel';
import { paths, operations, components } from '../../openapi_schema';

interface DataProps {
  team: components['schemas']['Team'];
  standing: components['schemas']['Standing'];
}

interface Props {
  data: DataProps;
  bold?: boolean;
}

function TeamPanel({ data, bold = false }: Props) {
  return (
    <Panel
      left={[
        <>
          <p style={{ width: '.5rem' }} className={bold ? 'font-bold' : ''}>
            {data === null ? '' : data.standing.seed}
          </p>
          <TeamDot team={data?.team} />
          <div className="flex flex-row">
            <p className={bold ? 'font-bold' : ''}>
              {data === null ? 'Team' : data.team.name}
            </p>
          </div>
        </>,
      ]}
      right={[
        <p>
          {data === null
            ? '0-0'
            : `${new Set(data.standing.game_ids_won).size}-${
                new Set(data.standing.game_ids_lost).size
              }`}
        </p>,
        <p>
          {data === null ? (
            '0'
          ) : (
            <>
              {data.standing.run_differential > 0 ? `+` : ``}
              {data.standing.run_differential}
            </>
          )}
        </p>,
      ]}
    />
  );
}

export { TeamPanel };
