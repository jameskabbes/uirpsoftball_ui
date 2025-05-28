import React, { useEffect } from 'react';
import { useApiCall } from '../utils/api';
import { config } from '../config/config';
import { Panels } from '../components/Schedule/Week';
import { Tournament } from '../components/Schedule/Tournament';
import { paths, operations, components } from '../openapi_schema';
import { ApiServiceResponseDataByStatus } from '../types';
import { getSchedulePage } from '../services/apiServices';

function Schedule() {
  const { data, status, refetch } = useApiCall(getSchedulePage, {});

  useEffect(() => {
    document.title = 'Schedule';
  }, []);

  if (data === undefined || status === 200) {
    const apiData = data as ApiServiceResponseDataByStatus<
      typeof getSchedulePage
    >['200'];
    return (
      <div className="page">
        <div className="centered-page-content">
          <h1 className="text-center">Schedule</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {(apiData === undefined
              ? Array.from({ length: config.defaultNRounds }, () => null)
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
                      apiData !== undefined && obj !== null
                        ? {
                            games: apiData.games,
                            game_ids: obj.game_ids,
                            teams: apiData.teams,
                            locations: apiData.locations,
                          }
                        : undefined
                    }
                    roundId={obj === null ? index : obj.round}
                  ></Panels>
                </div>
              )
            )}
          </div>
          {/* <h1 className="text-center mt-8">Tournaments</h1>
          <div className="flex flex-col space-y-6">
            {apiData === undefined
              ? undefined
              : apiData.tournaments.map((tournament) => {
                  return (
                    <div key={tournament.id}>
                      <Tournament
                        data={{
                          tournament: tournament,
                          tournament_games:
                            apiData.tournament_games[tournament.id] || {},
                          games: apiData.games,
                          teams: apiData.teams,
                          locations: apiData.locations,
                        }}
                      />
                    </div>
                  );
                })}
          </div> */}
        </div>
      </div>
    );
  }
}

export { Schedule };
