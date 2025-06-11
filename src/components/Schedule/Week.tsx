import React, { useEffect, useState } from 'react';
import { Panels as BasePanels } from './Panels';
import { getDate } from '../../utils/getDate';
import { DateTime } from 'luxon';
import { config } from '../../config/config';
import { paths, operations, components } from '../../openapi_schema_client';
import {
  DataProps,
  GameExportsById,
  LocationExportsById,
  TeamExportsById,
} from '../../types';

interface Props
  extends DataProps<{
    games: GameExportsById;
    locations: LocationExportsById;
    teams: TeamExportsById;
    game_ids: components['schemas']['GameExport']['id'][];
  }> {
  roundId: components['schemas']['GameExport']['round_id'] | undefined;
  admin?: boolean;
  includeLink?: boolean;
}

function Panels({ data, roundId, admin = false, includeLink = true }: Props) {
  const [date, setDate] = useState<DateTime | null>(null);

  useEffect(() => {
    if (data !== undefined) {
      const firstGameId = data.game_ids[0];
      if (firstGameId !== undefined) {
        if (data.games !== undefined) {
          const firstGame = data.games[firstGameId];
          if (firstGame !== undefined) {
            if (data.locations !== undefined) {
              const locationId = firstGame.location_id;
              if (locationId !== null) {
                const location = data.locations[locationId];
                if (location !== undefined) {
                  setDate(getDate(firstGame.datetime, location.time_zone));
                }
              }
            }
          }
        }
      }
    }
  }, [data]);

  return (
    <>
      <div className="my-8 panels max-w-sm">
        <div className="card px-2 py-1 mx-1 my-4">
          <h2 className="text-center mb-0">
            <>
              {data !== undefined && roundId !== undefined && date !== null
                ? 'Week ' +
                  roundId +
                  ' - ' +
                  date.toLocaleString({ month: 'long', day: 'numeric' })
                : 'loading...'}
            </>
          </h2>
        </div>

        <BasePanels
          data={
            data === undefined
              ? undefined
              : {
                  games: data.games,
                  game_ids: data.game_ids,
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
