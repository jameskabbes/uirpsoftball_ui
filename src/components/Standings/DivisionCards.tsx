import React from 'react';
import { DivisionCard } from './DivisionCard';
import { GridDiv } from '../GridDiv';
import { config } from '../../config/config';
import { paths, operations, components } from '../../openapi_schema';

interface DataProps {
  divisions: Record<
    components['schemas']['DivisionID'],
    components['schemas']['Division']
  >;
  division_ids_ordered: components['schemas']['DivisionID'][];
  standings_by_division_id: Record<
    components['schemas']['DivisionID'],
    components['schemas']['Standing'][]
  >;
  teams: Record<components['schemas']['TeamID'], components['schemas']['Team']>;
  game?: components['schemas']['Game-Input'];
}

interface Props {
  data: DataProps | null;
}

function DivisionCards({ data }: Props) {
  return (
    <div className="max-w-3xl mx-auto">
      <GridDiv
        n={
          data === null
            ? config.defaultNDivisionsPerGame
            : Object.keys(data.divisions).length
        }
      >
        {(data === null
          ? Array.from({ length: config.defaultNDivisionsPerGame }, () => null)
          : data.division_ids_ordered
        ).map(
          (divisionID: components['schemas']['DivisionID'] | null, index) => (
            <DivisionCard
              key={data === null ? `index${index}` : divisionID}
              data={
                data === null
                  ? null
                  : {
                      division: data.divisions[divisionID],
                      standings: data.standings_by_division_id[divisionID],
                      teams: data.teams,
                      teamIdsToBold: data.game
                        ? new Set([
                            data.game.home_team_id,
                            data.game.away_team_id,
                          ])
                        : new Set(),
                    }
              }
            />
          )
        )}
      </GridDiv>
    </div>
  );
}
export { DivisionCards };
