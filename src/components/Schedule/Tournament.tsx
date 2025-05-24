import React from 'react';
import { paths, operations, components } from '../../openapi_schema';
import { Panel as GamePanel } from '../Game/Panel';
import { Dot } from '../Team/Dot';
import { DotAndName } from '../Team/DotAndName';
import { Link } from '../Game/Link';

interface DataProps {
  tournament: components['schemas']['TournamentExport'];
  tournament_games: Record<
    number,
    Record<
      components['schemas']['GameExport']['round_id'],
      components['schemas']['TournamentGameExport'][]
    >
  >;
  games: Record<
    components['schemas']['GameExport']['id'],
    components['schemas']['GameExport']
  >;
  teams: Record<
    components['schemas']['TeamExport']['id'],
    components['schemas']['TeamExport']
  >;
  locations: Record<
    components['schemas']['LocationExport']['id'],
    components['schemas']['LocationExport']
  >;
}

interface Props {
  data: DataProps;
}

function Tournament({ data }: Props) {
  // get bracket ids

  let bracket_ids = Object.keys(data.tournament_games).map(Number);
  bracket_ids.sort((a, b) => a - b);

  return (
    <div className="rounded-3xl border-custom_dark dark:border-custom_light border-2 max-w-fit mx-auto">
      <h2 className="text-center">{data.tournament.name}</h2>
      <div className="overflow-x-auto">
        {bracket_ids.map((bracket_id) => {
          let maxRound = 0;
          if (
            Object.keys(data.tournament_games[bracket_id]).length > maxRound
          ) {
            maxRound = Math.max(
              ...Object.keys(data.tournament_games[bracket_id]).map(Number)
            );
          }
          return (
            <div className="flex flex-row">
              <div
                className="py-2"
                key={`bracket${bracket_id}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${maxRound}, 1fr)`,
                  justifyContent: 'center',
                  alignContent: 'center',
                }}
              >
                {[...Array(maxRound)].map((_, round_index) => (
                  <div
                    key={round_index}
                    className="flex flex-col justify-around w-80"
                  >
                    {round_index + 1 in data.tournament_games[bracket_id] ? (
                      <>
                        {data.tournament_games[bracket_id][round_index + 1].map(
                          (
                            tournament_game: components['schemas']['TournamentGame'],
                            game_index
                          ) => {
                            let game = null;

                            if (tournament_game.game_id in data.games) {
                              game = data.games[tournament_game.game_id];
                            }

                            if (game === null) {
                              return null;
                            }

                            return (
                              <GamePanel
                                data={{
                                  game: game,
                                  score: data.scores[tournament_game.game_id],
                                  teams: data.teams,
                                  location:
                                    game === null
                                      ? null
                                      : data.locations[game.location_id],
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
                          }
                        )}
                      </>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { Tournament };
