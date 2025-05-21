import React, { useEffect } from 'react';
import { paths, operations, components } from '../openapi_schema';
import { useApiData } from '../utils/api';
import { Division } from '../components/Standings/Division';
import { GridDiv } from '../components/GridDiv';
import siteConfig from '../siteConfig.json';

const API_PATH = '/pages/standings';

function Standings() {
  const [data, setData, loading, setLoading, status, setStatus] =
    useApiData<
      paths[typeof API_PATH]['get']['responses']['200']['content']['application/json']
    >(API_PATH);

  useEffect(() => {
    document.title = 'Standings';
  }, []);

  return (
    <>
      <div className="page">
        <div className="centered-page-content">
          <h1 className="text-center">Standings</h1>

          <div className="max-w-5xl mx-auto mt-8">
            <GridDiv
              n={
                data === null
                  ? siteConfig.default_n_divisions
                  : Object.keys(data.divisions).length
              }
            >
              {(data === null
                ? Array.from(
                    { length: siteConfig.default_n_divisions },
                    () => null
                  )
                : data.division_ids_ordered
              ).map((divisionId, index) => (
                <div
                  className="mt-4"
                  key={data === null ? `index${index}` : divisionId}
                >
                  <Division
                    data={
                      data === null
                        ? null
                        : {
                            division: data.divisions[divisionId],
                            standings:
                              data.standings_by_division_id[divisionId],
                            teams: data.teams_by_division_id[divisionId],
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

export { Standings };
