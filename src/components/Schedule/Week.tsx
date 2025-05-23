import React, { useEffect, useState } from 'react';
import { Panels as BasePanels } from './Panels';
import { getDate } from '../../utils/getDate';
import { DateTime } from 'luxon';
import { config } from '../../config/config';
import { paths, operations, components } from '../../openapi_schema';

type ScheduleAggregator = components['schemas']['ScheduleAggregator'];
interface DataProps extends ScheduleAggregator {
  game_ids: components['schemas']['GameExport']['id'][];
}

interface Props {
  data: DataProps | undefined;
  roundId: components['schemas']['GameExport']['round_id'];
  admin?: boolean;
  includeLink?: boolean;
}

function Panels({ data, roundId, admin = false, includeLink = true }: Props) {
  const [date, setDate] = useState<DateTime | null>(null);

  useEffect(() => {
    if (data !== null) {
      setDate(
        getDate(
          data.games[data.game_ids[0]].datetime,
          data.locations[data.games[data.game_ids[0]].location_id].time_zone
        )
      );
    }
  }, [data]);

  return (
    <>
      <div className="my-8 panels max-w-sm">
        <div className="card px-2 py-1 mx-1 my-4">
          <h2 className="text-center mb-0">
            <>
              {data === null ? 'loading...' : `Week ${roundId}`}
              {date !== null &&
                ' - ' + date.toLocaleString({ month: 'long', day: 'numeric' })}
            </>
          </h2>
        </div>

        <BasePanels
          data={
            data === null
              ? null
              : {
                  games: data.games,
                  game_ids: data.game_ids,
                  scores: data.scores,
                  teams: data.teams,
                  locations: data.locations,
                }
          }
          loadingN={config.defaultNGamesPerRound}
          includeDate={false}
          includeLink={includeLink}
          admin={admin}
        />
      </div>
    </>
  );
}

export { Panels };
