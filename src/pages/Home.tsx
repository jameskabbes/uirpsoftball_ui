import React, { useEffect } from 'react';
import { useApiCall } from '../utils/api';
import { paths, operations, components } from '../openapi_schema';
import { Panels } from '../components/Schedule/Week';
import { DivisionCards } from '../components/Standings/DivisionCards';
import { BlockI } from '../components/icons/BlockI';
import { Tournament } from '../components/Schedule/Tournament';
import { GridDiv } from '../components/GridDiv';
import { ApiServiceResponseDataByStatus } from '../types';
import { getHomePage } from '../services/apiServices';

function Home() {
  const { data, loading, status, refetch } = useApiCall(getHomePage, {});

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
                    {/* <Panels
                      data={
                        data !== undefined && {
                          game_ids: obj.game_ids,
                          games: apiData.games,
                          teams: apiData.teams,
                          locations: apiData.locations,
                        }
                      }
                      roundId={obj === null ? index : obj.round}
                    ></Panels> */}
                    <p>{obj?.game_ids}</p>
                  </div>
                )
              )}
            </GridDiv>
          </div>
          <h1 className="text-center mt-8">Tournaments</h1>
          {/* <div className="flex flex-col space-y-6">
            {data === null
              ? null
              : data.tournaments.map((tournament) => {
                  return (
                    <div key={tournament.id}>
                      <Tournament
                        data={{
                          tournament: tournament,
                          tournament_games:
                            data.tournament_games[tournament.id] || {},
                          games: data.games,
                          teams: data.teams,
                          scores: data.scores,
                          locations: data.locations,
                        }}
                      />
                    </div>
                  );
                })}
          </div> */}

          {/* <h2 className="text-center mt-4">Standings</h2>
          <DivisionCards
            data={
              data !== undefined && {
                divisions: data.divisions,
                division_ids_ordered: data.division_ids_ordered,
                standings_by_division_id: data.standings_by_division_id,
                teams: data.teams,
              }
            }
          /> */}
        </div>
      </div>
    );
  }
}

export { Home };
