import React, { useEffect } from 'react';
import { useApiData } from '../utils/api';
import { paths, operations, components } from '../openapi_schema';
import { Panels } from '../components/Schedule/Week';
import { DivisionCards } from '../components/Standings/DivisionCards';
import { BlockI } from '../components/icons/BlockI';
import { Tournament } from '../components/Schedule/Tournament';
import { GridDiv } from '../components/GridDiv';

const API_PATH = '/pages/home';

function Home() {
  const [data, setData, loading, setLoading, status, setStatus] =
    useApiData<
      paths[typeof API_PATH]['get']['responses']['200']['content']['application/json']
    >(API_PATH);

  useEffect(() => {
    document.title = 'UIRP Softball';
  }, []);

  return (
    <div className="page">
      <div className="centered-page-content">
        <h1>
          <div className="flex flex-row space-x-2 items-center justify-center">
            <div className="flex flex-row">
              <BlockI />
            </div>
            <span className="text-center">UIRP Softball</span>
          </div>
        </h1>
        {/* 
        <GalleryRow
          data={
            data === null
              ? null
              : {
                  images: data.images,
                }
          }
        />
         */}

        <div className="flex flex-row justify-center mt-4">
          <div className="card max-w-xl w-full">
            <h2>Announcements</h2>
            <h3 className="mt-2">Dexter Field games moved to Dodds</h3>
            <p>
              Due to wet field conditions, games originally scheduled for Dexter
              Field have been moved to{' '}
              <a
                className="underline"
                href={data !== null ? data.locations[3].link : '#'}
              >
                Dodds Park - Field 2
              </a>
              .
            </p>
            <h3 className="mt-2">League Social</h3>
            <ul>
              <li>
                <p>
                  Following the championship game on July 29th, join us for a
                  league social at Zahnd Park at 7:45pm. Featuring:
                  <ol>
                    <li className="ml-2">1) 1st place trophy presentation</li>
                    <li className="ml-2">
                      2) food and drinks
                      <ul>
                        <li className="ml-4">
                          • If you want to eat food,{' '}
                          <a
                            className="underline"
                            href="https://forms.illinois.edu/sec/961195061"
                          >
                            register for the event
                          </a>
                          .
                        </li>
                      </ul>
                    </li>

                    <li className="ml-2">
                      3){' '}
                      <a href="/combine" className="underline">
                        combine
                      </a>
                      <ul>
                        <li className="ml-4">
                          • Individuals and teammates participate in softball
                          competitions testing various skills: hitting,
                          baserunning, pitching, throwing, and fielding.
                        </li>
                      </ul>
                    </li>
                  </ol>
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <GridDiv
            n={data === null ? 2 : Math.min(2, data.game_ids_and_rounds.length)}
          >
            {(loading
              ? Array.from({ length: 2 }, () => null)
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
                            game_ids: obj.game_ids,
                            games: data.games,
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
          </GridDiv>
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

        <h2 className="text-center mt-4">Standings</h2>
        <DivisionCards
          data={
            data === null
              ? null
              : {
                  divisions: data.divisions,
                  division_ids_ordered: data.division_ids_ordered,
                  standings_by_division_id: data.standings_by_division_id,
                  teams: data.teams,
                }
          }
        />
      </div>
    </div>
  );
}

export { Home };
