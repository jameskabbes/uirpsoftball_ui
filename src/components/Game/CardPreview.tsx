import React, { useEffect, useState } from 'react';
import { paths, operations, components } from '../../openapi_schema';

import { getDate } from '../../utils/getDate';
import { DateTime } from 'luxon';
import { Details } from './Details';
import { DotAndNameMatchup } from './DotAndNameMatchup';
import { DataProps, TeamExportsById } from '../../types';

interface Props
  extends DataProps<{
    game: components['schemas']['GameExport'];
    teams: TeamExportsById;
    location: components['schemas']['LocationExport'] | null;
  }> {}

function CardPreview({ data }: Props) {
  const [date, setDate] = useState<DateTime | null>(null);

  useEffect(() => {
    if (data !== undefined && data.location !== null) {
      setDate(getDate(data.game.datetime, data.location.time_zone));
    }
  }, [data]);

  return (
    <div className="card">
      <div>
        <DotAndNameMatchup
          data={
            data === undefined
              ? undefined
              : {
                  homeTeam:
                    data.game.home_team_id === null
                      ? null
                      : data.teams[data.game.home_team_id] ?? null,
                  awayTeam:
                    data.game.away_team_id === null
                      ? null
                      : data.teams[data.game.away_team_id] ?? null,
                }
          }
          includeTeamLinks={false}
        />
      </div>
      <Details
        data={
          data === undefined
            ? undefined
            : {
                date,
                location: data.location,
                officiatingTeam:
                  data.game.officiating_team_id === null
                    ? null
                    : data.teams[data.game.officiating_team_id] ?? null,
              }
        }
        includeLinks={false}
      ></Details>
    </div>
  );
}

export { CardPreview };
