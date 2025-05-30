import React, { useEffect, useState } from 'react';
import { TeamPanel } from './TeamPanel';
import { Panel } from './Panel';
import { Link as TeamLink } from '../Team/Link';
import { config } from '../../config/config';
import { paths, operations, components } from '../../openapi_schema';
import {
  DataProps,
  TeamExportsById,
  TeamStatisticExportsByTeamId,
} from '../../types';

interface Props
  extends DataProps<{
    division: components['schemas']['DivisionExport'] | null;
    teams: TeamExportsById;
    team_statistics: TeamStatisticExportsByTeamId;
    team_ids_ranked: components['schemas']['TeamExport']['id'][];
    teamIdsToBold: Set<components['schemas']['TeamExport']['id']>;
  }> {}

function DivisionCard({ data }: Props) {
  return (
    <div className="panels max-w-sm">
      <Panel
        left={[
          <h3 className="mb-0">
            {data === undefined
              ? 'Division'
              : data.division === null
              ? 'Division'
              : data.division.name}
          </h3>,
        ]}
        right={['W-L', 'RD']}
        isHoverable={false}
      />
      {(data === undefined
        ? Array.from({ length: config.defaultNTeamsPerDivision }, () => null)
        : data.team_ids_ranked
      ).map(
        (teamId: null | components['schemas']['TeamExport']['id'], index) => (
          <TeamLink
            key={teamId === null ? `index${index}` : teamId}
            data={
              data === undefined
                ? undefined
                : { team: teamId === null ? null : data.teams[teamId] ?? null }
            }
          >
            <TeamPanel
              data={
                data === undefined ||
                teamId === null ||
                data?.teams[teamId] === undefined ||
                data?.team_statistics[teamId] === undefined
                  ? undefined
                  : {
                      team: data.teams[teamId],
                      team_statistics: data.team_statistics[teamId],
                      bold: data.teamIdsToBold.has(teamId),
                    }
              }
            />
          </TeamLink>
        )
      )}
    </div>
  );
}

export { DivisionCard };
