import React from 'react';
import { DivisionCard } from './DivisionCard';
import { GridDiv } from '../GridDiv';
import { config } from '../../config/config';
import { paths, operations, components } from '../../openapi_schema_client';
import {
  DataProps,
  DivisionExportsById,
  TeamExportsById,
  TeamStatisticExportsByTeamId,
} from '../../types';

interface Props
  extends DataProps<{
    divisions: DivisionExportsById;
    division_ids_ordered: components['schemas']['DivisionExport']['id'][];
    teams: TeamExportsById;
    team_statistics: TeamStatisticExportsByTeamId;
    team_ids_ranked_by_division: Record<
      components['schemas']['DivisionExport']['id'],
      components['schemas']['TeamExport']['id'][] | undefined
    >;
    game?: components['schemas']['GameExport'];
  }> {}

function DivisionCards({ data }: Props) {
  return (
    <div className="max-w-3xl mx-auto">
      <GridDiv
        n={
          data === undefined
            ? config.defaultNDivisionsPerGame
            : Object.keys(data.divisions).length
        }
      >
        {(data === undefined
          ? Array.from({ length: config.defaultNDivisionsPerGame }, () => null)
          : data.division_ids_ordered
        ).map(
          (
            divisionID: components['schemas']['DivisionExport']['id'] | null,
            index
          ) => (
            <DivisionCard
              key={divisionID === null ? `index${index}` : divisionID}
              data={
                divisionID !== null && data !== undefined
                  ? {
                      division: data.divisions[divisionID] ?? null,
                      teams: data.teams,
                      team_statistics: data.team_statistics,
                      team_ids_ranked:
                        data.team_ids_ranked_by_division[divisionID] ?? [],
                      teamIdsToBold:
                        data.game === undefined
                          ? new Set()
                          : new Set(
                              [
                                data.game.home_team_id,
                                data.game.away_team_id,
                              ].filter((id) => id !== null)
                            ),
                    }
                  : undefined
              }
            />
          )
        )}
      </GridDiv>
    </div>
  );
}
export { DivisionCards };
