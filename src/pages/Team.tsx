import React, { useEffect } from 'react';
import { useApiCall } from '../utils/api';
import { useParams } from 'react-router-dom';
import { NotFound } from '../components/Team/NotFound';
import { paths, operations, components } from '../openapi_schema';
import { DotAndName } from '../components/Team/DotAndName';
import { Link as GameLink } from '../components/Game/Link';
import { CardPreview } from '../components/Game/CardPreview';
import { DivisionCard } from '../components/Standings/DivisionCard';
import { Panels } from '../components/Schedule/Team';
import { getTeamPage } from '../services/apiServices';
import { stat } from 'fs';

function Team() {
  const teamSlug = useParams()
    .teamSlug as components['schemas']['TeamExport']['slug'];

  const { data, loading, status, refetch } = useApiCall(getTeamPage, {
    pathParams: {
      team_slug: teamSlug,
    },
  });

  useEffect(() => {
    if (data !== null && data !== undefined) {
      const apiData = data as (typeof getTeamPage.responses)['200'];
      document.title = apiData?.teams[apiData.team_id]?.name ?? 'Team';
    } else {
      document.title = 'Team';
    }
  }, [data]);

  if (status === 404) {
    return <NotFound />;
  } else if (loading || (status == 200 && data !== null)) {
    data as (typeof getTeamPage.responses)['200'];
  return (
    <>
      <div className="page">
        <div className="centered-page-content">
          <div className="flex flex-col items-center mt-4">
            <h1 className="text-center">
              <DotAndName
                team={data === null ? null : data?.teams[data?.team_id]}
              />
            </h1>
          </div>
          {/* once loading is done, only render if featuredGameId is not null */}
          {(data === null ||
            (data !== null && data.featured_game_id !== null)) && (
            <>
              <GameLink
                game={
                  data === null || data.featured_game_id === null
                    ? null
                    : data.games[data.featured_game_id]
                }
              >
                <div className="max-w-lg mx-auto mt-8">
                  {data !== null && data.featured_game_id !== null && (
                    <CardPreview
                      data={{
                        game: data.games[data.featured_game_id],
                        teams: data.teams,
                        location:
                          data.locations[
                            data.games[data.featured_game_id].location_id
                          ],
                      }}
                    />
                  )}
                </div>
              </GameLink>
            </>
          )}
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto gap-4">
              <DivisionCard
                data={
                  data === null
                    ? null
                    : {
                        division: data.division,
                        standings: data.standings,
                        teams: data.teams,
                        teamIdsToBold: new Set([data.team_id]),
                      }
                }
              />
              <Panels
                data={
                  data === null
                    ? null
                    : {
                        game_known_ids: data.games_known_ids,
                        game_tbd_ids: data.games_tbd_ids,
                        games: data.games,
                        scores: data.scores,
                        teams: data.teams,
                        locations: data.locations,
                      }
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { Team };
