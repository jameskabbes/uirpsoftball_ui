import React from 'react';
import { DivisionCard } from './DivisionCard';
import { HeadToHeadMatrix } from './HeadToHeadMatrix';
import { paths, operations, components } from '../../openapi_schema';
import {
  DataProps,
  TeamExportsById,
  TeamStatisticExportsByTeamId,
} from '../../types';

interface Props
  extends DataProps<{
    division: components['schemas']['DivisionExport'];
    teams: TeamExportsById;
    team_statistics: TeamStatisticExportsByTeamId;
    team_ids_ranked: components['schemas']['TeamExport']['id'][];
  }> {}

function Division({ data }: Props) {
  return (
    <div className="panels space-y-2 max-w-lg">
      <DivisionCard
        data={
          data === undefined
            ? undefined
            : {
                division: data.division,
                team_statistics: data.team_statistics,
                teams: data.teams,
                team_ids_ranked: data.team_ids_ranked,
                teamIdsToBold: new Set(),
              }
        }
      />
      {/* <HeadToHeadMatrix
        data={
          data === null
            ? null
            : { teams: data.teams, standings: data.standings }
        }
      /> */}
    </div>
  );
}

export { Division };
