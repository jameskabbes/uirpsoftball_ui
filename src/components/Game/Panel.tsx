import React, { useEffect, useState } from 'react';
import { paths, operations, components } from '../../openapi_schema';
import { Link as GameLink } from './Link';
import { BiTimeFive } from 'react-icons/bi';
import { CiLocationOn } from 'react-icons/ci';
import { DotAndName } from '../Team/DotAndName';
import { UmpireMask } from '../icons/UmpireMask';
import { BsCalendar4, BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { getDate } from '../../utils/getDate';
import { callApi } from '../../utils/api';
import { DateTime } from 'luxon';
import { Dot as TeamDot } from '../Team/Dot';

const API_PATH = '/game/{game_id}';

interface Props {
  data: components['schemas']['GameAggregator'] | null;
  admin?: boolean;
  includeDate?: boolean;
  includeTime?: boolean;
  includeLink?: boolean;
  displayId?: boolean;
  homeTeamFiller?: string;
  awayTeamFiller?: string;
}

function Panel({
  data,
  admin = false,
  includeDate = false,
  includeTime = true,
  includeLink = true,
  displayId = false,
  homeTeamFiller,
  awayTeamFiller,
}: Props) {
  const [date, setDate] = useState<DateTime | null>(null);
  const [includeScore, setIncludeScore] = useState<boolean>(false);
  const [winningTeam, setWinningTeam] = useState<'home' | 'away' | null>(null);

  const [isAcceptingScores, setIsAcceptingScores] = useState<boolean>(false);

  useEffect(() => {
    if (data !== null) {
      setDate(getDate(data.game.datetime, data.location.time_zone));

      // bold the team name that won the game
      if (data.score !== undefined) {
        if (data.score.home !== undefined && data.score.away !== undefined) {
          setIncludeScore(true);
          if (data.score.home > data.score.away) {
            setWinningTeam('home');
          } else if (data.score.away > data.score.home) {
            setWinningTeam('away');
          }
        } else {
          setIncludeScore(false);
        }
      }

      setIsAcceptingScores(data.game.is_accepting_scores);
    }
  }, [data]);

  function handleToggleAcceptingScores() {
    if (data !== null) {
      setIsAcceptingScores((prevIsAcceptingScores) => {
        async function call() {
          try {
            const response = await callApi<
              paths[typeof API_PATH]['patch']['responses']['200']['content']['application/json']
            >(API_PATH.replace('{game_id}', data.game.id.toString()), 'PATCH', {
              ...data.game,
              is_accepting_scores: !prevIsAcceptingScores,
            });
          } catch (error) {
            console.error(error);
          }
        }
        call();
        return !prevIsAcceptingScores;
      });
    }
  }

  if (includeLink && data !== null) {
    return <GameLink game={data.game}>{Component()}</GameLink>;
  } else {
    return Component();
  }

  function Component() {
    return (
      <>
        <div className={includeLink ? 'panel' : 'panel-no-hover'}>
          {/* the entire panel */}
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col space-y-1 justify-center">
                <div className="flex flex-row items-center space-x-2">
                  {displayId && (
                    <div className="border-custom_dark dark:border-custom_light border-2 rounded-xl p-1">
                      {data?.game?.id}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <div className="flex flex-row space-x-1 items-center">
                      {includeScore && (
                        <div
                          style={{ width: '1.25rem' }}
                          className={winningTeam === 'away' ? 'font-bold' : ''}
                        >
                          {data?.score?.away}
                        </div>
                      )}
                      <TeamDot
                        team={
                          data === null
                            ? null
                            : data.teams[data.game.away_team_id]
                        }
                      />
                      <span
                        className={winningTeam === 'away' ? 'font-bold' : ''}
                      >
                        {data === null
                          ? 'Away Team'
                          : data.game.away_team_id < 0 &&
                            awayTeamFiller !== undefined
                          ? awayTeamFiller
                          : data.teams[data.game.away_team_id].name}
                      </span>
                    </div>

                    <div className="flex flex-row space-x-1 items-center">
                      {includeScore && (
                        <span
                          style={{ width: '1.25rem' }}
                          className={winningTeam === 'home' ? 'font-bold' : ''}
                        >
                          {data?.score?.home}
                        </span>
                      )}
                      <TeamDot
                        team={
                          data === null
                            ? null
                            : data.teams[data.game.home_team_id]
                        }
                      />
                      <span
                        className={winningTeam === 'home' ? 'font-bold' : ''}
                      >
                        {data === null
                          ? 'Home Team'
                          : data.game.home_team_id < 0 &&
                            homeTeamFiller !== undefined
                          ? homeTeamFiller
                          : data.teams[data.game.home_team_id].name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center text-right">
                {includeDate && (
                  <div className="flex flex-row space-x-1 items-center justify-end">
                    <p className="text-right">
                      {date === null ? (
                        <span>loading...</span>
                      ) : (
                        date.toLocaleString({
                          month: 'long',
                          day: 'numeric',
                        })
                      )}
                    </p>
                    <p>
                      <BsCalendar4 className="bw-icon" />
                    </p>
                  </div>
                )}

                {includeTime && (
                  <div className="flex flex-row space-x-1 items-center justify-end">
                    <p>
                      {date === null ? (
                        <span>loading...</span>
                      ) : (
                        date.toLocaleString({
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                        })
                      )}
                    </p>
                    <p>
                      <BiTimeFive className="bw-icon" />
                    </p>
                  </div>
                )}

                <div className="flex flex-row space-x-1 items-center justify-end">
                  <p>
                    {data === null ? 'loading...' : data.location.short_name}
                  </p>
                  <p>
                    <CiLocationOn className="bw-icon" />
                  </p>
                </div>

                <div className="flex flex-row space-x-1 items-center justify-end">
                  <p>
                    <DotAndName
                      team={
                        data === null
                          ? null
                          : data.teams[data.game.officiating_team_id]
                      }
                    />
                  </p>
                  <p>
                    <UmpireMask />
                  </p>
                </div>
              </div>
            </div>
            {admin && (
              <>
                <div
                  onClick={handleToggleAcceptingScores}
                  className="flex flex-row items-center space-x-1"
                >
                  <p>Accepting Scores</p>
                  <p>{isAcceptingScores ? <BsToggleOn /> : <BsToggleOff />}</p>
                </div>
                <div>
                  <GameLink game={data === null ? null : data.game}>
                    <button>Game</button>
                  </GameLink>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export { Panel };
