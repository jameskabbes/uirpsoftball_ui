import React from 'react';
import { Panel as GamePanel } from '../Game/Panel';
import { paths, operations, components } from '../../openapi_schema';

type ScheduleAggregator = components['schemas']['ScheduleAggregator'];
interface DataProps extends ScheduleAggregator {
  game_ids: components['schemas']['GameID'][];
}

interface Props {
  data: DataProps | null;
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
      {(data === null
        ? Array.from({ length: loadingN }, () => null)
        : data.game_ids
      ).map((game_id: null | components['schemas']['GameID'], index) => (
        <div key={data === null ? `index${index}` : game_id}>
          <GamePanel
            data={
              data === null
                ? null
                : {
                    game: data.games[game_id],
                    score: data.scores[game_id],
                    teams: {
                      [data.games[game_id].home_team_id]:
                        data.teams[data.games[game_id].home_team_id],
                      [data.games[game_id].away_team_id]:
                        data.teams[data.games[game_id].away_team_id],
                      [data.games[game_id].officiating_team_id]:
                        data.teams[data.games[game_id].officiating_team_id],
                    },
                    location: data.locations[data.games[game_id].location_id],
                  }
            }
            includeLink={includeLink}
            includeDate={includeDate}
            includeTime={includeTime}
            admin={admin}
          />
        </div>
      ))}
    </div>
  );
}

export { Panels };
