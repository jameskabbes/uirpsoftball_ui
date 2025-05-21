import React, { useEffect, useState } from 'react';
import { paths, operations, components } from '../../openapi_schema';

import { getDate } from '../../utils/getDate';
import { DateTime } from 'luxon';
import { Details } from './Details';
import { DotAndNameMatchup } from './DotAndNameMatchup';

interface DataProps {
  game: components['schemas']['Game-Input'];
  teams: Record<components['schemas']['TeamID'], components['schemas']['Team']>;
  location: components['schemas']['Location'];
}

interface Props {
  data: DataProps | null;
}

function CardPreview({ data }: Props) {
  const [date, setDate] = useState<DateTime | null>(null);

  useEffect(() => {
    if (data !== null) {
      setDate(getDate(data.game.datetime, data.location.time_zone));
    }
  }, [data]);

  return (
    <div className="card">
      <div>
        <DotAndNameMatchup
          homeTeam={data === null ? null : data.teams[data.game.home_team_id]}
          awayTeam={data === null ? null : data.teams[data.game.away_team_id]}
          includeTeamLinks={false}
        />
      </div>
      <Details
        date={date}
        location={data === null ? null : data.location}
        officiatingTeam={
          data === null ? null : data.teams[data.game.officiating_team_id]
        }
        includeLinks={false}
      ></Details>
    </div>
  );
}

export { CardPreview };
