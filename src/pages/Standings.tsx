import React, { useEffect } from 'react';
import { paths, operations, components } from '../openapi_schema';
import { useApiCall } from '../utils/api';
import { Division } from '../components/Standings/Division';
import { GridDiv } from '../components/GridDiv';
import { config } from '../config/config';
import { getStandingsPage } from '../services/apiServices';
import { ApiServiceResponseDataByStatus } from '../types';

function Standings() {
  const { data, loading, status, refetch } = useApiCall(getStandingsPage, {});

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
                {(apiData === null
                  ? Array.from({ length: config.defaultNDivisions }, () => null)
                  : apiData.division_ids_ordered
                ).map((divisionId, index) => (
                  <div
                    className="mt-4"
                    key={divisionId === null ? `index${index}` : divisionId}
                  >
                    <Division
                      data={
                        apiData === undefined
                          ? undefined
                          : {
                              division: apiData.divisions[divisionId],
                              standings:
                                apiData.standings_by_division_id[divisionId],
                              teams: apiData.teams_by_division_id[divisionId],
                            }
                      }
                    />
                  </div>
                ))}
              </GridDiv>
            </div>

            <div className="max-w-sm mx-auto mt-8">
              <div className="card">
                <h2>Seeding Parameters</h2>
                {data === null ? (
                  <p>loading...</p>
                ) : (
                  <ol>
                    {data.seeding_parameters.map((seeding_parameter, index) => (
                      <li key={seeding_parameter.id}>
                        <p>
                          {index + 1}. {seeding_parameter.name}
                        </p>
                      </li>
                    ))}
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
