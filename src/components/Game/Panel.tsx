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
import { DataProps, TeamExportsById } from '../../types';
import {
  patchGameScore,
  patchGameIsAcceptingScores,
} from '../../services/apiServices';
import { ApiServiceResponseDataByStatus } from '../../types';

interface Props
  extends DataProps<{
    game: components['schemas']['GameExport'];
    location: components['schemas']['LocationExport'] | null;
    teams: TeamExportsById;
  }> {
  admin?: boolean;
  includeDate?: boolean;
  includeTime?: boolean;
  includeLink?: boolean;
  displayId?: boolean;
  homeTeamFiller?: string | null;
  awayTeamFiller?: string | null;
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
    if (data !== undefined) {
      setDate(
        getDate(
          data.game.datetime,
          data.location !== null ? data.location.time_zone : 'UTC'
        )
      );
      // bold the team name that won the game
      if (
        data.game.home_team_score !== null &&
        data.game.away_team_score !== null
      ) {
        setIncludeScore(true);
        if (data.game.home_team_score > data.game.away_team_score) {
          setWinningTeam('home');
        } else if (data.game.home_team_score < data.game.away_team_score) {
          setWinningTeam('away');
        }
      } else {
        setIncludeScore(false);
      }

      setIsAcceptingScores(data.game.is_accepting_scores);
    }
  }, [data]);

  function handleToggleAcceptingScores() {
    if (data !== undefined) {
      setIsAcceptingScores((prevIsAcceptingScores) => {
        patchGameIsAcceptingScores.call({
          data: {
            is_accepting_scores: !prevIsAcceptingScores,
          },
          pathParams: {
            game_id: data.game.id,
          },
        });
        return !prevIsAcceptingScores;
      });
    }
  }

  if (includeLink && data !== undefined) {
    return <GameLink data={{ game: data.game }}>{Component()}</GameLink>;
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
                          {data?.game.away_team_score ?? null}{' '}
                        </div>
                      )}
                      <TeamDot
                        data={
                          data === undefined
                            ? undefined
                            : {
                                team:
                                  data.game.away_team_id === null
                                    ? null
                                    : data.teams[data.game.away_team_id] ??
                                      null,
                              }
                        }
                      />
                      <span
                        className={winningTeam === 'away' ? 'font-bold' : ''}
                      >
                        {(() => {
                          if (data === undefined) return 'Away Team';
                          if (data.game.away_team_id === null) {
                            if (awayTeamFiller) {
                              return awayTeamFiller;
                            } else {
                              return 'TBD';
                            }
                          }
                          const team = data.teams[data.game.away_team_id];
                          if (team === undefined)
                            return awayTeamFiller
                              ? awayTeamFiller
                              : 'Away Team';
                          return team.name;
                        })()}{' '}
                      </span>
                    </div>

                    <div className="flex flex-row space-x-1 items-center">
                      {includeScore && (
                        <span
                          style={{ width: '1.25rem' }}
                          className={winningTeam === 'home' ? 'font-bold' : ''}
                        >
                          {data?.game.home_team_score ?? null}{' '}
                        </span>
                      )}
                      <TeamDot
                        data={
                          data === undefined
                            ? undefined
                            : {
                                team:
                                  data.game.home_team_id === null
                                    ? null
                                    : data.teams[data.game.home_team_id] ??
                                      null,
                              }
                        }
                      />
                      <span
                        className={winningTeam === 'home' ? 'font-bold' : ''}
                      >
                        {(() => {
                          if (data === undefined) return 'Home Team';
                          if (data.game.home_team_id === null) {
                            if (homeTeamFiller) {
                              return homeTeamFiller;
                            } else {
                              return 'TBD';
                            }
                          }
                          const team = data.teams[data.game.home_team_id];
                          if (team === undefined)
                            return homeTeamFiller
                              ? homeTeamFiller
                              : 'Home Team';
                          return team.name;
                        })()}{' '}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center text-right">
                {includeDate && (
                  <div className="flex flex-row space-x-1 items-center justify-end">
                    <p className="text-right">
                      {data === undefined
                        ? 'loading...'
                        : date === null
                        ? 'TBD'
                        : date.toLocaleString({
                            month: 'long',
                            day: 'numeric',
                          })}
                    </p>
                    <p>
                      <BsCalendar4 className="bw-icon" />
                    </p>
                  </div>
                )}

                {includeTime && (
                  <div className="flex flex-row space-x-1 items-center justify-end">
                    <p>
                      {data === undefined
                        ? 'loading...'
                        : date === null
                        ? 'TBD'
                        : date.toLocaleString({
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                          })}
                    </p>
                    <p>
                      <BiTimeFive className="bw-icon" />
                    </p>
                  </div>
                )}

                <div className="flex flex-row space-x-1 items-center justify-end">
                  <p>
                    {data === undefined
                      ? 'loading...'
                      : data.location === null
                      ? 'TBD'
                      : data.location.short_name}
                  </p>
                  <p>
                    <CiLocationOn className="bw-icon" />
                  </p>
                </div>

                <div className="flex flex-row space-x-1 items-center justify-end">
                  <p>
                    <DotAndName
                      data={
                        data === undefined
                          ? undefined
                          : {
                              team:
                                data.game.officiating_team_id === null
                                  ? null
                                  : data.teams[data.game.officiating_team_id] ??
                                    null,
                            }
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
                  <GameLink
                    data={data === undefined ? undefined : { game: data.game }}
                  >
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
