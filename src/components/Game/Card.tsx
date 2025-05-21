import React, { useEffect, useState } from 'react';
import { Scores } from './Scores';
import { paths, operations, components } from '../../openapi_schema';

import { getDate } from '../../utils/getDate';
import { BsCalendar2Plus } from 'react-icons/bs';
import { createCalendar, downloadCalendar } from '../../utils/Calendar';
import { createEvent } from './createEvent';
import { DateTime } from 'luxon';
import { Details } from './Details';
import { DotAndNameMatchup } from './DotAndNameMatchup';

interface Props {
  data: components['schemas']['GameAggregator'];
  submitScore: CallableFunction;
}

function Card({ data, submitScore }: Props) {
  const [date, setDate] = useState<DateTime | null>(null);

  useEffect(() => {
    if (data !== null) {
      setDate(getDate(data.game.datetime, data.location.time_zone));
    }
  }, [data]);

  const generateICSFile = (): string => {
    return createCalendar([
      createEvent(
        data.game,
        data.location,
        data.teams[data.game.home_team_id],
        data.teams[data.game.away_team_id],
        data.teams[data.game.officiating_team_id]
      ),
    ]);
  };

  const downloadICSFile = () => {
    const icsContent = generateICSFile();
    downloadCalendar(icsContent);
  };

  return (
    <div className="card">
      <div>
        <DotAndNameMatchup
          homeTeam={data === null ? null : data.teams[data.game.home_team_id]}
          awayTeam={data === null ? null : data.teams[data.game.away_team_id]}
        />
      </div>
      <Scores
        data={
          data === null
            ? null
            : {
                game: data.game,
                score: data.score,
              }
        }
        submitScore={submitScore}
      ></Scores>
      <Details
        date={date}
        location={data === null ? null : data.location}
        officiatingTeam={
          data === null ? null : data.teams[data.game.officiating_team_id]
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
