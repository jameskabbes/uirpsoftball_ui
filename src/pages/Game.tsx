import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { callApi, useApiCall } from '../utils/api';
import { NotFound } from '../components/Game/NotFound';
import { paths, operations, components } from '../openapi_schema';

import { Card } from '../components/Game/Card';
import { DivisionCards } from '../components/Standings/DivisionCards';
import { getGamePage, patchGameScore } from '../services/apiServices';
import { ApiServiceResponseDataByStatus } from '../types';

function Game() {
  const gameIdParam = useParams().gameId;

  const gameId = Number(
    gameIdParam
  ) as components['schemas']['GameExport']['id'];

  const { data, status, refetch } = useApiCall(getGamePage, {
    pathParams: {
      game_id: gameId,
    },
  });

  useEffect(() => {
    if (data !== undefined && status === 200) {
      const apiData = data as ApiServiceResponseDataByStatus<
        typeof getGamePage
      >['200'];
      document.title = 'Game ' + apiData.game.id;
    } else {
      document.title = 'Game';
    }
  }, [data]);

  async function submitScore(home: number, away: number) {
    try {
      const response = await patchGameScore.call({
        data: {
          home_team_score: home,
          away_team_score: away,
        },
        pathParams: {
          game_id: gameId,
        },
      });
      if (response.status === 200) {
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (status === 404) {
    return <NotFound />;
  } else if (data === undefined || status == 200) {
    const apiData = data as ApiServiceResponseDataByStatus<
      typeof getGamePage
    >['200'];
    return (
      <>
        <div className="page">
          <div className="centered-page-content">
            <div className="max-w-2xl mx-auto">
              <Card
                data={
                  apiData === undefined
                    ? undefined
                    : {
                        game: apiData.game,
                        teams: apiData.teams,
                        location: apiData.location,
                      }
                }
                submitScore={submitScore}
              />
            </div>
            {/* <div className="mt-8">
              <DivisionCards
                data={
                  apiData === undefined
                    ? undefined
                    : {
                        divisions: apiData.divisions,
                        division_ids_ordered: apiData.division_ids_ordered,
                        standings_by_division_id:
                          apiData.standings_by_division_id,
                        teams: apiData.teams,
                        game: apiData.game,
                      }
                }
              />
            </div> */}
          </div>
        </div>
      </>
    );
  }
}

export { Game };
