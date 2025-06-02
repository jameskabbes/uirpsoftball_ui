import React, { useEffect, useRef } from 'react';
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
import { ApiServiceResponseDataByStatus } from '../types';

function Team() {
  const teamSlug = useParams().teamSlug as
    | components['schemas']['TeamExport']['slug']
    | undefined;

  if (teamSlug === undefined) {
    return <NotFound />;
  }

  const { data, status, refetch } = useApiCall(getTeamPage, {
    pathParams: {
      team_slug: teamSlug,
    },
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    } else {
      refetch();
    }
  }, [teamSlug]);

  useEffect(() => {
    if (data !== undefined) {
      if (status === 200) {
        const apiData = data as ApiServiceResponseDataByStatus<
          typeof getTeamPage
        >['200'];
        document.title = apiData?.teams[apiData.team_id]?.name ?? 'Team';
      } else if (status === 404) {
        document.title = 'Team Not Found';
      }
    } else {
      document.title = 'Team';
    }
  }, [data, status]);

  if (status === 404) {
    return <NotFound />;
  } else if (data === undefined || status == 200) {
    const apiData = data as ApiServiceResponseDataByStatus<
      typeof getTeamPage
    >['200'];
    return (
      <>
        <div className="page">
          <div className="centered-page-content">
            <div className="flex flex-col items-center mt-4">
              <h1 className="text-center">
                <DotAndName
                  data={
                    data === undefined
                      ? undefined
                      : { team: apiData.teams[apiData.team_id] ?? null }
                  }
                />
              </h1>
            </div>
            {/* once loading is done, only render if featuredGameId is not null */}
            {(() => {
              if (apiData !== undefined && apiData.featured_game_id !== null) {
                const featuredGame = apiData.games[apiData.featured_game_id];
                if (featuredGame && featuredGame.location_id != null) {
                  return (
                    <GameLink data={{ game: featuredGame }}>
                      <div className="max-w-lg mx-auto mt-8">
                        <CardPreview
                          data={{
                            game: featuredGame,
                            teams: apiData.teams,
                            location:
                              apiData.locations[featuredGame.location_id] ??
                              null,
                          }}
                        />
                      </div>
                    </GameLink>
                  );
                }
              }
              return null;
            })()}
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto gap-4">
                <DivisionCard
                  data={
                    apiData === undefined
                      ? undefined
                      : {
                          division: apiData.division,
                          teams: apiData.teams,
                          teamIdsToBold: new Set([apiData.team_id]),
                          team_statistics: apiData.team_statistics,
                          team_ids_ranked: apiData.team_ids_ranked,
                        }
                  }
                />
                <Panels
                  data={
                    apiData === undefined
                      ? undefined
                      : {
                          game_known_ids: apiData.games_known_ids,
                          game_tbd_ids: apiData.games_unknown_ids,
                          games: apiData.games,
                          teams: apiData.teams,
                          locations: apiData.locations,
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
}
export { Team };
