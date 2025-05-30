import React from 'react';
import { Dot as TeamDot } from '../Team/Dot';
import { Panel } from './Panel';
import { paths, operations, components } from '../../openapi_schema';
import { DataProps } from '../../types';

interface Props
  extends DataProps<{
    team: components['schemas']['TeamExport'];
    team_statistics: components['schemas']['TeamStatisticsExport'];
    bold?: boolean;
  }> {}

function TeamPanel({ data }: Props) {
  return (
    <Panel
      left={[
        <>
          <p
            style={{ width: '.5rem' }}
            className={data?.bold ? 'font-bold' : ''}
          >
            {data === undefined ? '' : data.team.seed}
          </p>
          <TeamDot
            data={data === undefined ? undefined : { team: data.team }}
          />
          <div className="flex flex-row">
            <p className={data?.bold ? 'font-bold' : ''}>
              {data === undefined ? 'Team' : data.team.name}
            </p>
          </div>
        </>,
      ]}
      right={[
        <p>
          {data === undefined
            ? '0-0'
            : `${new Set(data.team_statistics.game_ids_won).size}-${
                new Set(data.team_statistics.game_ids_lost).size
              }`}
        </p>,
        <p>
          {data === undefined ? (
            '0'
          ) : (
            <>
              {data.team_statistics.run_differential > 0 ? `+` : ``}
              {data.team_statistics.run_differential}
            </>
          )}
        </p>,
      ]}
    />
  );
}

export { TeamPanel };
