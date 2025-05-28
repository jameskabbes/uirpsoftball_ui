import React, { useEffect, useState } from 'react';
import { createCalendar, downloadCalendar } from '../../utils/Calendar';
import { createEvent } from '../Game/createEvent';
import { BsCalendar2Plus } from 'react-icons/bs';
import { Panels as BasePanels } from './Panels';
import { config } from '../../config/config';
import { paths, operations, components } from '../../openapi_schema';
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
    game_known_ids: components['schemas']['GameExport']['id'][];
    game_tbd_ids: components['schemas']['GameExport']['id'][];
  }> {}

function Panels({ data }: Props) {
  const downloadICSFile = () => {
    if (data !== undefined) {
      // Destructure after narrowing
      const { games, locations, teams, game_known_ids } = data;
      const validGames = game_known_ids
        .map((game_id) => games[game_id])
        .filter((game): game is NonNullable<typeof game> => game !== undefined);

      const icsContent = createCalendar(
        validGames.map((game) =>
          createEvent(
            game,
            game.location_id ? locations[game.location_id] ?? null : null,
            game.home_team_id ? teams[game.home_team_id] ?? null : null,
            game.away_team_id ? teams[game.away_team_id] ?? null : null,
            game.officiating_team_id
              ? teams[game.officiating_team_id] ?? null
              : null
          )
        )
      );
      downloadCalendar(icsContent);
    }
  };
  return (
    <>
      <div className="panels max-w-sm">
        <div className="card panel-padding">
          <h2 className="text-center mb-2">Schedule</h2>
          {data !== undefined && (
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
          {data === undefined ? (
            <BasePanels
              data={undefined}
              loadingN={config.defaultNGamesPerRound}
            />
          ) : (
            <>
              <BasePanels
                data={{
                  game_ids: data.game_known_ids,
                  games: data.games,
                  teams: data.teams,
                  locations: data.locations,
                }}
                includeTime={true}
              />
              <BasePanels
                data={{
                  game_ids: data.game_tbd_ids,
                  games: data.games,
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
