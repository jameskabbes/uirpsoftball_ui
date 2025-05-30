import React, { useEffect } from 'react';
import { paths, operations, components } from '../openapi_schema';
import { useApiCall } from '../utils/api';
import { Division } from '../components/Standings/Division';
import { GridDiv } from '../components/GridDiv';
import { config } from '../config/config';
import { getStandingsPage } from '../services/apiServices';
import { ApiServiceResponseDataByStatus } from '../types';

function Standings() {
  const { data, status, refetch } = useApiCall(getStandingsPage, {});

  useEffect(() => {
    document.title = 'Standings';
  }, []);

  if (data === undefined || status === 200) {
    const apiData = data as ApiServiceResponseDataByStatus<
      typeof getStandingsPage
    >['200'];
    return (
      <>
        <div className="page">
          <div className="centered-page-content">
            <h1 className="text-center">Standings</h1>

            <div className="max-w-5xl mx-auto mt-8">
              <GridDiv
                n={
                  apiData === undefined
                    ? config.defaultNDivisions
                    : Object.keys(apiData.divisions).length
                }
              >
                {(apiData === undefined
                  ? Array.from({ length: config.defaultNDivisions }, () => null)
                  : apiData.division_ids_ordered
                ).map((divisionId, index) => {
                  const division =
                    apiData === undefined || divisionId === null
                      ? null
                      : apiData.divisions[divisionId] ?? null;

                  const teamIdsRanked =
                    apiData === undefined || divisionId === null
                      ? null
                      : apiData.team_ids_ranked_by_division[divisionId] ?? null;

                  if (
                    apiData !== undefined &&
                    (division === null || teamIdsRanked === null)
                  ) {
                    return null;
                  } else {
                    return (
                      <div
                        className="mt-4"
                        key={divisionId === null ? `index${index}` : divisionId}
                      >
                        <Division
                          data={
                            apiData === undefined || divisionId === null
                              ? undefined
                              : {
                                  division: division!,
                                  teams: apiData.teams,
                                  team_ids_ranked: teamIdsRanked!,
                                  team_statistics: apiData.team_statistics,
                                }
                          }
                        />
                      </div>
                    );
                  }
                })}
              </GridDiv>
            </div>

            <div className="max-w-sm mx-auto mt-8">
              <div className="card">
                <h2>Seeding Parameters</h2>
                {data === undefined ? (
                  <p>loading...</p>
                ) : (
                  <ol>
                    {apiData.seeding_parameters.map(
                      (seeding_parameter, index) => (
                        <li key={seeding_parameter.id}>
                          <p>
                            {index + 1}. {seeding_parameter.name}
                          </p>
                        </li>
                      )
                    )}
                  </ol>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export { Standings };
