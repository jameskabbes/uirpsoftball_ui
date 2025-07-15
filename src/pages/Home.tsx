import React, { useEffect } from 'react';
import { useApiCall } from '../utils/api';
import { paths, operations, components } from '../openapi_schema_client';
import { Panels } from '../components/Schedule/Week';
import { DivisionCards } from '../components/Standings/DivisionCards';
import { BlockI } from '../components/icons/BlockI';
import { Tournament } from '../components/Schedule/Tournament';
import { GridDiv } from '../components/GridDiv';
import { ApiServiceResponseDataByStatus } from '../types';
import { getHomePage } from '../services/apiServices';

function Home() {
  const { data, status, refetch } = useApiCall(getHomePage, {});

  useEffect(() => {
    document.title = 'UIRP Softball';
  }, []);

  if (data === undefined || status === 200) {
    const apiData = data as ApiServiceResponseDataByStatus<
      typeof getHomePage
    >['200'];
    return (
      <div className="page">
        <div className="centered-page-content">
          <h1>
            <div className="flex flex-row space-x-2 items-center justify-center">
              <div className="flex flex-row">
                <BlockI />
              </div>
              <span className="text-center">UIRP Softball</span>
            </div>
          </h1>
          <div className="flex flex-row justify-center">
            <div className="card max-w-xl">
              <h2>Tournament Rules Changes</h2>
              <ol>
                <li>1. There is no mercy rule in effect.</li>
                <li>
                  2. There is no limit to the amount of runs that can be scored
                  in a half inning.
                </li>
                <li>
                  3. The higher rated seed of the two teams (ratings after week
                  6 games) will be the home team.
                </li>
              </ol>
            </div>
          </div>

          {/* 
        <GalleryRow
          data={
            data === null
              ? null
              : {
                  images: data.images,
                }
          }
        />
         */}

          <div className="mx-auto max-w-3xl">
            <GridDiv
              n={
                apiData === undefined
                  ? 2
                  : Math.min(2, apiData.game_ids_and_rounds.length)
              }
            >
              {(apiData === undefined
                ? Array.from({ length: 2 }, () => null)
                : apiData.game_ids_and_rounds
              ).map(
                (
                  obj: null | components['schemas']['GameIdsAndRounds'],
                  index
                ) => (
                  <div
                    key={obj === null ? `index${index}` : obj.round}
                    className="panels"
                  >
                    <Panels
                      data={
                        data !== undefined && obj !== null
                          ? {
                              game_ids: obj.game_ids,
                              games: apiData.games,
                              teams: apiData.teams,
                              locations: apiData.locations,
                            }
                          : undefined
                      }
                      roundId={obj === null ? undefined : obj.round}
                    ></Panels>
                  </div>
                )
              )}
            </GridDiv>
          </div>
          <h1 className="text-center mt-8">Tournaments</h1>
          <div className="flex flex-col space-y-6">
            {apiData === undefined
              ? undefined
              : apiData.tournaments.map((tournament) => {
                  return (
                    <div key={tournament.id}>
                      <Tournament
                        data={{
                          tournament: tournament,
                          tournament_games: (() => {
                            const games =
                              apiData.tournament_games[tournament.id];
                            if (!games) return {};

                            return Object.entries(games).reduce(
                              (bracketAcc, [bracketIdStr, bracketGames]) => {
                                const bracketId = Number(bracketIdStr);

                                if (bracketGames) {
                                  bracketAcc[bracketId] = Object.entries(
                                    bracketGames
                                  ).reduce(
                                    (roundAcc, [roundIdStr, roundGames]) => {
                                      const roundId = Number(roundIdStr);
                                      roundAcc[roundId] = roundGames || [];
                                      return roundAcc;
                                    },
                                    {} as Record<number, any[]>
                                  );
                                }

                                return bracketAcc;
                              },
                              {} as Record<number, Record<number, any[]>>
                            );
                          })(),
                          games: apiData.games,
                          teams: apiData.teams,
                          locations: apiData.locations,
                        }}
                      />
                    </div>
                  );
                })}
          </div>

          <h2 className="text-center mt-4">Standings</h2>
          <DivisionCards
            data={
              data === undefined
                ? undefined
                : {
                    divisions: data.divisions,
                    division_ids_ordered: data.division_ids_ordered,
                    teams: data.teams,
                    team_statistics: data.team_statistics,
                    team_ids_ranked_by_division:
                      data.team_ids_ranked_by_division,
                  }
            }
          />
        </div>
      </div>
    );
  }
}

export { Home };
