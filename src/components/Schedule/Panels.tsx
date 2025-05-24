import React from 'react';
import { Panel as GamePanel } from '../Game/Panel';
import { paths, operations, components } from '../../openapi_schema';
import {
  GameExportsById,
  LocationExportsById,
  TeamExportsById,
} from '../../types';

interface DataProps {
  games: GameExportsById | undefined;
  locations: LocationExportsById | undefined;
  teams: TeamExportsById | undefined;
  game_ids: components['schemas']['GameExport']['id'][];
}

interface Props {
  data: DataProps | undefined;
  loadingN?: number;
  includeLink?: boolean;
  includeDate?: boolean;
  includeTime?: boolean;
  admin?: boolean;
}

function Panels({
  data,
  loadingN = 0,
  includeLink = true,
  includeDate = true,
  includeTime = true,
  admin = false,
}: Props) {
  return (
    <div>
      {(data === undefined
        ? Array.from({ length: loadingN }, () => null)
        : data.game_ids
      ).map(
        (game_id: null | components['schemas']['GameExport']['id'], index) => (
          <div key={game_id === null ? `index${index}` : game_id}>
            <GamePanel
              data={
                data !== undefined &&
                game_id !== null &&
                data.games !== undefined
                  ? (() => {
                      const game = data.games[game_id];
                      if (game === undefined) return undefined;

                      const teams: TeamExportsById = {};
                      if (data.teams !== undefined) {
                        if (game.home_team_id != null)
                          teams[game.home_team_id] =
                            data.teams[game.home_team_id];
                        if (game.away_team_id != null)
                          teams[game.away_team_id] =
                            data.teams[game.away_team_id];
                        if (game.officiating_team_id != null)
                          teams[game.officiating_team_id] =
                            data.teams[game.officiating_team_id];
                      }

                      let location = undefined;
                      if (data.locations !== undefined) {
                        if (game.location_id != null) {
                          const locationId = game.location_id;
                          if (locationId in data.locations) {
                            location = data.locations[locationId];
                          }
                        }
                      }

                      return {
                        game,
                        teams,
                        location,
                      };
                    })()
                  : undefined
              }
              includeLink={includeLink}
              includeDate={includeDate}
              includeTime={includeTime}
              admin={admin}
            />
          </div>
        )
      )}
    </div>
  );
}

export { Panels };
