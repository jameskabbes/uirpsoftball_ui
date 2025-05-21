import React from 'react';
import { DivisionCard } from './DivisionCard';
import { HeadToHeadMatrix } from './HeadToHeadMatrix';
import { paths, operations, components } from '../../openapi_schema';

interface Props {
  data: components['schemas']['DivisionAggregator'] | null;
}

function Division({ data }: Props) {
  return (
    <div className="panels space-y-2 max-w-lg">
      <DivisionCard
        data={
          data === null
            ? null
            : {
                division: data.division,
                standings: data.standings,
                teams: data.teams,
                teamIdsToBold: new Set(),
              }
        }
      />
      <HeadToHeadMatrix
        data={
          data === null
            ? null
            : { teams: data.teams, standings: data.standings }
        }
      />
    </div>
  );
}

export { Division };
