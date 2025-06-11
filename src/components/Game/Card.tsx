import React, { useEffect, useState } from 'react';
import { Scores } from './Scores';
import { paths, operations, components } from '../../openapi_schema_client';

import { getDate } from '../../utils/getDate';
import { BsCalendar2Plus } from 'react-icons/bs';
import { createCalendar, downloadCalendar } from '../../utils/Calendar';
import { createEvent } from './createEvent';
import { DateTime } from 'luxon';
import { Details } from './Details';
import { DotAndNameMatchup } from './DotAndNameMatchup';
import { DataProps, TeamExportsById } from '../../types';

interface Props
  extends DataProps<{
    game: components['schemas']['GameExport'];
    location: components['schemas']['LocationExport'] | null;
    teams: TeamExportsById;
  }> {
  submitScore: CallableFunction;
}

function Card({ data, submitScore }: Props) {
  const [date, setDate] = useState<DateTime | null>(null);

  useEffect(() => {
    if (data !== undefined && data.location !== null) {
      setDate(getDate(data.game.datetime, data.location.time_zone));
    }
  }, [data]);

  const downloadICSFile = () => {
    if (data !== undefined && data.location !== null) {
      const { game, location, teams } = data;
      const icsContent = createCalendar([
        createEvent(
          game,
          location,
          game.home_team_id !== null ? teams[game.home_team_id] ?? null : null,
          game.away_team_id !== null ? teams[game.away_team_id] ?? null : null
        ),
      ]);
      downloadCalendar(icsContent);
    }
  };

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
        />
      </div>
      <Scores
        data={data === undefined ? undefined : { game: data.game }}
        submitScore={submitScore}
      ></Scores>
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
      ></Details>

      <div className="flex flex-row justify-center">
        <button
          className="py-1 m-2"
          onClick={data !== null ? downloadICSFile : () => {}}
        >
          <div className="flex flex-row space-x-2 items-center">
            <BsCalendar2Plus className="inline" />
            {data === null ? (
              <span>loading...</span>
            ) : (
              <>
                <span>Add to Calendar</span>
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}

export { Card };
