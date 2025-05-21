import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { callApi, useApiData } from '../utils/api';
import { getPageTitle } from '../components/Game/getPageTitle';
import { NotFound } from '../components/Game/NotFound';
import { paths, operations, components } from '../openapi_schema';

import { Card } from '../components/Game/Card';
import { DivisionCards } from '../components/Standings/DivisionCards';

const API_PATH = '/pages/game/{game_id}';

function Game() {
  const { gameId } = useParams();
  const [data, setData, loading, setLoading, status, setStatus] = useApiData<
    paths[typeof API_PATH]['get']['responses']['200']['content']['application/json']
  >(API_PATH.replace('{game_id}', gameId));

  useEffect(() => {
    if (data !== null) {
      document.title = getPageTitle(data.game);
    } else {
      document.title = 'Game';
    }
  }, [data]);

  async function submitScore(home: number, away: number) {
    try {
      const response = await callApi<
        paths[typeof API_PATH]['get']['responses']['200']['content']['application/json']
      >('/game/' + gameId + '/score', 'POST', {
        home: home,
        away: away,
        game_id: gameId,
      });
      setData(response.data);
      setStatus(response.status);
    } catch (error) {
      console.error(error);
    }
  }

  if (status === 404) {
    return <NotFound />;
  } else {
    return (
      <>
        <div className="page">
          <div className="centered-page-content">
            <div className="max-w-2xl mx-auto">
              <Card
                data={
                  data === null
                    ? null
                    : {
                        game: data.game,
                        score: data.score,
                        teams: data.teams,
                        location: data.location,
                      }
                }
                submitScore={submitScore}
              />
            </div>
            <div className="mt-8">
              <DivisionCards
                data={
                  data === null
                    ? null
                    : {
                        divisions: data.divisions,
                        division_ids_ordered: data.division_ids_ordered,
                        standings_by_division_id: data.standings_by_division_id,
                        teams: data.teams,
                        game: data.game,
                      }
                }
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export { Game };
