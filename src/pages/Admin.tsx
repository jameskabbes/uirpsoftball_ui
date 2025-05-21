import React, { useEffect } from 'react';
import { callApi, useApiData } from '../utils/api';
import { Panels } from '../components/Schedule/Week';
import siteConfig from '../siteConfig.json';
import { paths, operations, components } from '../openapi_schema';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API_PATH = '/pages/admin';

function Admin() {
  const [data, setData, loading, setLoading, status, setStatus] =
    useApiData<
      paths[typeof API_PATH]['get']['responses']['200']['content']['application/json']
    >(API_PATH);

  async function handleShuffleDivisions() {
    const API_PATH_SHUFFLE = '/divisions/shuffle';
    try {
      const response = await callApi<
        paths['/divisions/shuffle']['post']['responses']['200']['content']['application/json']
      >(API_PATH_SHUFFLE, 'POST');
    } catch (error) {
      console.error(error);
    }
  }
  async function handleAssignMatchups() {
    const API_PATH_ASSIGN_MATCHUPS = '/games/assign_matchups';
    try {
      const response = await callApi<
        paths['/games/assign_matchups']['post']['responses']['200']['content']['application/json']
      >(API_PATH_ASSIGN_MATCHUPS, 'POST');
    } catch (error) {
      console.error(error);
    }
  }
  async function handleReprocessAllScores() {
    const API_PATH_REPROCESS_ALL_SCORES = '/reprocess_all_scores';
    try {
      const response = await callApi<
        paths['/reprocess_all_scores']['post']['responses']['200']['content']['application/json']
      >(API_PATH_REPROCESS_ALL_SCORES, 'POST');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    document.title = 'Admin | UIRP Softball';
  }, []);

  return (
    <div className="page">
      <div className="centered-page-content">
        <h1 className="text-center">Admin</h1>
        <div className="flex flex-row space-x-1 justify-center">
          <button onClick={handleShuffleDivisions}>Shuffle Divisions</button>
          <button onClick={handleAssignMatchups}>Assign Matchups</button>
          <button onClick={handleReprocessAllScores}>
            Reprocess All Scores
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {(loading
          ? Array.from({ length: siteConfig.default_n_rounds }, () => null)
          : data.game_ids_and_rounds
        ).map(
          (obj: null | components['schemas']['GameIdsAndRounds'], index) => (
            <div
              key={data === null ? `index${index}` : obj.round}
              className="panels"
            >
              <Panels
                data={
                  data === null
                    ? null
                    : {
                        game_ids: obj.game_ids,
                        games: data.games,
                        scores: data.scores,
                        teams: data.teams,
                        locations: data.locations,
                      }
                }
                roundId={obj === null ? index : obj.round}
                admin={true}
                includeLink={false}
              ></Panels>
            </div>
          )
        )}
      </div>
      <h2>Page Visits</h2>

      <div className="card">
        <Line
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: false,
              },
            },
          }}
          data={
            data === null
              ? { labels: [], datasets: [] }
              : {
                  labels: data.page_visits.datetime_binned_counts[0].map((x) =>
                    new Date(x).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                    })
                  ),
                  datasets: [
                    {
                      data: data.page_visits.datetime_binned_counts[1],
                    },
                  ],
                }
          }
        />
      </div>
      <div className="flex flex-row max-w-md mx-auto">
        <div className="flex flex-col w-full">
          <div className="card">
            <table className="w-full">
              <thead>
                <tr>
                  <th>
                    <p className="text-left">Page</p>
                  </th>
                  <th>
                    <p className="text-right">Visits</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data && (
                  <>
                    <tr>
                      <td>
                        <p>Total</p>
                      </td>
                      <td>
                        <p className="text-right">
                          {data.page_visits.path_counts.reduce(
                            (a, b) => a + b[1],
                            0
                          )}
                        </p>
                      </td>
                    </tr>
                    {data.page_visits.path_counts.map((arr, index) => (
                      <tr key={index}>
                        <td>
                          <p className="text-left">{arr[0]}</p>
                        </td>
                        <td>
                          <p className="text-right">{arr[1]}</p>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Admin };
