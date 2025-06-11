import React from 'react';
import { Panel as GamePanel } from '../Game/Panel';
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
                data !== undefined && game_id !== null
                  ? (() => {
                      const game = data.games[game_id];
                      if (game === undefined) return undefined;

                      const teams: TeamExportsById = {};
                      if (game.home_team_id != null)
                        teams[game.home_team_id] =
                          data.teams[game.home_team_id];
                      if (game.away_team_id != null)
                        teams[game.away_team_id] =
                          data.teams[game.away_team_id];
                      if (game.officiating_team_id != null)
                        teams[game.officiating_team_id] =
                          data.teams[game.officiating_team_id];

                      const location =
                        game.location_id !== null &&
                        data.locations[game.location_id] !== undefined
                          ? data.locations[game.location_id] ?? null
                          : null;

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
