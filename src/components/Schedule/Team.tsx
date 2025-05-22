import React, { useEffect, useState } from 'react';
import { createCalendar, downloadCalendar } from '../../utils/Calendar';
import { createEvent } from '../Game/createEvent';
import { BsCalendar2Plus } from 'react-icons/bs';
import { Panels as BasePanels } from './Panels';
import { config } from '../../config/config';
import { paths, operations, components } from '../../openapi_schema';

type ScheduleAggregator = components['schemas']['ScheduleAggregator'];
interface DataProps extends ScheduleAggregator {
  game_known_ids: components['schemas']['GameID'][];
  game_tbd_ids: components['schemas']['GameID'][];
}

interface Props {
  data: DataProps | null;
}

function Panels({ data }: Props) {
  function generateICSFile(data: DataProps) {
    return createCalendar(
      data.game_known_ids.map((game_id) => {
        let game = data.games[game_id];
        return createEvent(
          game,
          data.locations[game.location_id],
          data.teams[game.home_team_id],
          data.teams[game.away_team_id],
          data.teams[game.officiating_team_id]
        );
      })
    );
  }

  const downloadICSFile = () => {
    const icsContent = generateICSFile(data);
    downloadCalendar(icsContent);
  };

  return (
    <>
      <div className="panels max-w-sm">
        <div className="card panel-padding">
          <h2 className="text-center mb-2">Schedule</h2>
          {data !== null && (
            <div className="flex flex-row justify-center">
              <button onClick={downloadICSFile}>
                <div className="flex flex-row space-x-2 items-center">
                  <BsCalendar2Plus />
                  <span>Add to Calendar</span>
                </div>
              </button>
            </div>
          )}
        </div>
        <div>
          {data === null ? (
            <BasePanels data={null} loadingN={config.defaultNGamesPerRound} />
          ) : (
            <>
              <BasePanels
                data={{
                  game_ids: data.game_known_ids,
                  games: data.games,
                  scores: data.scores,
                  teams: data.teams,
                  locations: data.locations,
                }}
                includeTime={true}
              />
              <BasePanels
                data={{
                  game_ids: data.game_tbd_ids,
                  games: data.games,
                  scores: data.scores,
                  teams: data.teams,
                  locations: data.locations,
                }}
                includeTime={false}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export { Panels };
