import React, { useEffect } from 'react';
import { paths, operations, components } from '../../openapi_schema';
import { Panel as GamePanel } from '../Game/Panel';
import { Dot } from '../Team/Dot';
import { DotAndName } from '../Team/DotAndName';
import { Link } from '../Game/Link';
import {
  DataProps,
  GameExportsById,
  LocationExportsById,
  TeamExportsById,
} from '../../types';

interface Props
  extends DataProps<{
    tournament: components['schemas']['TournamentExport'];
    tournament_games: Record<
      number,
      Record<
        components['schemas']['GameExport']['round_id'],
        components['schemas']['TournamentGameExport'][]
      >
    >;
    games: GameExportsById;
    teams: TeamExportsById;
    locations: LocationExportsById;
  }> {}

function Tournament({ data }: Props) {
  // get bracket ids

  const [bracketIds, setBracketIds] = React.useState<
    Extract<keyof NonNullable<Props['data']>['tournament_games'], number>[]
  >([]);

  useEffect(() => {
    if (data !== undefined) {
      let ids = Object.keys(data.tournament_games).map(Number);
      ids.sort((a, b) => a - b);
      setBracketIds(
        ids as Extract<keyof typeof data.tournament_games, number>[]
      );
    }
  }, [data]);

  function getMaxRound(bracket: Record<number, any>) {
    const rounds = Object.keys(bracket).map(Number);
    return rounds.length === 0 ? 0 : Math.max(...rounds);
  }

  return (
    <div className="rounded-3xl border-custom_dark dark:border-custom_light border-2 max-w-fit mx-auto">
      <h2 className="text-center">
        {data === undefined ? 'loading...' : data.tournament.name}
      </h2>
      <div className="overflow-x-auto">
        {data !== undefined && (
          <>
            {bracketIds.map((bracketId) => {
              const bracket = data.tournament_games[bracketId];

              if (bracket === undefined) return null;
              const maxRound = getMaxRound(bracket);

              return (
                <div className="flex flex-row">
                  <div
                    className="py-2"
                    key={`bracket${bracketId}`}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${maxRound}, 1fr)`,
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}
                  >
                    {Array.from({ length: maxRound }, (_, round_index) => {
                      const round = bracket[round_index + 1];
                      return (
                        <div
                          key={round_index}
                          className="flex flex-col justify-around w-80"
                        >
                          {round !== undefined &&
                            round.map((tournament_game, game_index) => {
                              const game = data.games[tournament_game.game_id];
                              if (!game) return null;
                              return (
                                <GamePanel
                                  key={game.id}
                                  data={{
                                    game,
                                    teams: data.teams,
                                    location:
                                      game.location_id === null
                                        ? null
                                        : data.locations[game.location_id] ??
                                          null,
                                  }}
                                  displayId={true}
                                  includeDate={true}
                                  awayTeamFiller={
                                    tournament_game.away_team_filler
                                  }
                                  homeTeamFiller={
                                    tournament_game.home_team_filler
                                  }
                                />
                              );
                            })}
                        </div>
                      );
                    })}{' '}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export { Tournament };
