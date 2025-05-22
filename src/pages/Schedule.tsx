import React, { useEffect } from 'react';
import { useApiData } from '../utils/api';
import { config } from '../config/config';
import { Panels } from '../components/Schedule/Week';
import { Tournament } from '../components/Schedule/Tournament';
import { paths, operations, components } from '../openapi_schema';

const API_PATH = '/pages/schedule';

function Schedule() {
  const [data, setData, loading, setLoading, status, setStatus] =
    useApiData<
      paths[typeof API_PATH]['get']['responses']['200']['content']['application/json']
    >(API_PATH);

  useEffect(() => {
    document.title = 'Schedule';
  }, []);

  return (
    <>
      <div className="page">
        <div className="centered-page-content">
          <h1 className="text-center">Schedule</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {(data === null
              ? Array.from({ length: config.defaultNRounds }, () => null)
              : data.game_ids_and_rounds
            ).map(
              (
                obj: null | components['schemas']['GameIdsAndRounds'],
                index
              ) => (
                <div
                  key={data === null ? `index${index}` : obj.round}
                  className="panels"
                >
                  <Panels
                    data={
                      data === null
                        ? null
                        : {
                            games: data.games,
                            game_ids: obj.game_ids,
                            scores: data.scores,
                            teams: data.teams,
                            locations: data.locations,
                          }
                    }
                    roundId={obj === null ? index : obj.round}
                  ></Panels>
                </div>
              )
            )}
          </div>
          <h1 className="text-center mt-8">Tournaments</h1>
          <div className="flex flex-col space-y-6">
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
          </div>
        </div>
      </div>
    </>
  );
}

export { Schedule };
