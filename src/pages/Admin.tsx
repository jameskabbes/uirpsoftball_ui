import React, { useEffect } from 'react';
import { callApi, useApiCall } from '../utils/api';
import { Panels } from '../components/Schedule/Week';
import { paths, operations, components } from '../openapi_schema_client';
import { getAdminPage } from '../services/apiServices';
import { config } from '../config/config';

import { ApiServiceResponseDataByStatus } from '../types';

function Admin() {
  const { data, status } = useApiCall(getAdminPage, {});

  useEffect(() => {
    document.title = 'Admin | UIRP Softball';
  }, []);

  if (data === undefined || status === 200) {
    const apiData = data as ApiServiceResponseDataByStatus<
      typeof getAdminPage
    >['200'];
    return (
      <div className="page">
        <div className="centered-page-content">
          <h1 className="text-center">Admin</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {(apiData === undefined
            ? Array.from({ length: config.defaultNRounds }, () => null)
            : apiData.game_ids_and_rounds
          ).map(
            (obj: null | components['schemas']['GameIdsAndRounds'], index) => (
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
                  admin={true}
                  includeLink={false}
                ></Panels>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

export { Admin };
