import React, { useState, useEffect } from 'react';
import { Dot as TeamDot } from '../Team/Dot';
import { DotAndName } from '../Team/DotAndName';
import { config } from '../../config/config';
import { paths, operations, components } from '../../openapi_schema';
import {
  DataProps,
  TeamExportsById,
  TeamStatisticExportsByTeamId,
} from '../../types';

interface CustomGridProps {
  columns: number;
  children: React.ReactNode;
}

function CustomGrid({ columns, children }: CustomGridProps) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, minmax(25px, 1fr))`,
    gap: '0.5rem', // You can adjust the gap between columns
  };

  return <div style={gridStyle}>{children}</div>;
}

type TeamID = components['schemas']['TeamExport']['id'];
type GameID = components['schemas']['GameExport']['id'];

interface TeamRecordsByOpponent {
  [teamID: TeamID]: [number, number];
}
interface HeadToHeadRecords {
  [teamID: TeamID]: TeamRecordsByOpponent;
}
type HeadToHeadMatchup = [TeamID, TeamID];

interface Props
  extends DataProps<{
    teams: TeamExportsById;
    team_statistics: TeamStatisticExportsByTeamId;
    team_ids_ranked: components['schemas']['TeamExport']['id'][];
  }> {}

function HeadToHeadMatrix({ data }: Props) {
  const [headToHeadRecords, setHeadToHeadRecords] = useState<
    undefined | HeadToHeadRecords
  >(undefined);
  const [headToHeadMatchups, setHeadToHeadMatchups] = useState<
    undefined | HeadToHeadMatchup[]
  >(undefined);

  useEffect(() => {
    if (data !== undefined) {
      let matchups: HeadToHeadMatchup[] = [];
      let records: HeadToHeadRecords = {};

      let game_ids_won_by_team: Record<TeamID, Set<GameID>> = {};
      let game_ids_lost_by_team: Record<TeamID, Set<GameID>> = {};

      data.team_ids_ranked.map((team_id) => {
        const team_statistics = data.team_statistics[team_id];

        if (team_statistics !== undefined) {
          game_ids_won_by_team[team_id] = new Set(team_statistics.game_ids_won);
          game_ids_lost_by_team[team_id] = new Set(
            team_statistics.game_ids_lost
          );
        }
      });

      data.team_ids_ranked.map(
        (team_id: components['schemas']['TeamExport']['id']) => {
          records[team_id] = {};
          let record_by_opponent: TeamRecordsByOpponent = {};

          data.team_ids_ranked.map((opponent_team_id) => {
            matchups.push([team_id, opponent_team_id]);

            let wins_against_opponent = 0;

            (game_ids_won_by_team[team_id] === undefined
              ? []
              : game_ids_won_by_team[team_id]
            ).forEach((gameID) => {
              if (
                (game_ids_lost_by_team[opponent_team_id] ?? new Set()).has(
                  gameID
                )
              ) {
                wins_against_opponent += 1;
              }
            });

            let losses_against_opponent = 0;
            (game_ids_lost_by_team[team_id] === undefined
              ? []
              : game_ids_lost_by_team[team_id]
            ).forEach((gameID) => {
              if (
                (game_ids_won_by_team[opponent_team_id] ?? new Set()).has(
                  gameID
                )
              ) {
                losses_against_opponent += 1;
              }
            });

            record_by_opponent[opponent_team_id] = [
              wins_against_opponent,
              losses_against_opponent,
            ];
          });

          records[team_id] = record_by_opponent;
        }
      );

      setHeadToHeadMatchups(matchups);
      setHeadToHeadRecords(records);
    }
  }, [data]);

  return (
    <>
      <div className="panel-no-hover">
        <div className="flex flex-row justify-between space-x-4">
          <div className="flex flex-col shrink-0 space-y-3">
            <div className="h-6">
              <h6 className="underline">
                <strong>Head to Head</strong>
              </h6>
            </div>
            {(data === undefined
              ? Array.from(
                  { length: config.defaultNTeamsPerDivision },
                  () => null
                )
              : data.team_ids_ranked
            ).map(
              (
                team_id:
                  | components['schemas']['TeamExport']['division_id']
                  | null,
                index
              ) => (
                <p key={team_id === null ? `index${index}` : team_id}>
                  <DotAndName
                    data={
                      data === undefined
                        ? undefined
                        : {
                            team:
                              team_id === null
                                ? null
                                : data.teams[team_id] ?? null,
                          }
                    }
                  />
                </p>
              )
            )}
          </div>
          <div className="flex flex-col overflow-x-auto whitespace-nowrap">
            <CustomGrid
              columns={
                data === undefined
                  ? config.defaultNTeamsPerDivision
                  : data.team_ids_ranked.length
              }
            >
              {/* load the dots */}
              {(data === undefined
                ? Array.from(
                    { length: config.defaultNTeamsPerDivision },
                    () => null
                  )
                : data.team_ids_ranked
              ).map(
                (
                  team_id: components['schemas']['TeamExport']['id'] | null,
                  index
                ) => (
                  <span
                    key={team_id === null ? `index${index}` : team_id}
                    className="text-center"
                  >
                    <TeamDot
                      data={
                        data === undefined
                          ? undefined
                          : {
                              team:
                                team_id === null
                                  ? null
                                  : data.teams[team_id] ?? null,
                            }
                      }
                    />
                  </span>
                )
              )}
              {/* load the head to head records */}
              {(headToHeadMatchups === undefined ||
              headToHeadRecords === undefined
                ? Array.from(
                    { length: config.defaultNTeamsPerDivision ** 2 },
                    () => null
                  )
                : headToHeadMatchups
              ).map((matchup: null | [number, number], index) => {
                let text: string = '';
                let color: string = '';
                let record_against_opponent: [number, number] = [0, 0];

                if (matchup !== null && headToHeadRecords !== undefined) {
                  record_against_opponent = headToHeadRecords?.[matchup[0]]?.[
                    matchup[1]
                  ] ?? [0, 0];
                  if (record_against_opponent[0] > record_against_opponent[1]) {
                    color = '#b9fcb3'; //green
                  } else if (
                    record_against_opponent[0] < record_against_opponent[1]
                  ) {
                    color = '#ffa1a1'; //red
                  } else if (
                    record_against_opponent[0] !== 0 &&
                    record_against_opponent[1] !== 0
                  ) {
                    color = '#999999'; //grey
                  }
                  if (
                    record_against_opponent[0] !== 0 ||
                    record_against_opponent[1] !== 0
                  ) {
                    if (record_against_opponent[0] === 0) {
                      if (record_against_opponent[1] > 1) {
                        text = String(record_against_opponent[1]);
                      }
                      text += 'L';
                    } else if (record_against_opponent[1] === 0) {
                      if (record_against_opponent[0] > 1) {
                        text = String(record_against_opponent[0]);
                      }
                      text += 'W';
                    } else {
                      text = `${record_against_opponent[0]}-${record_against_opponent[1]}`;
                    }
                  }
                }

                return (
                  <div
                    key={
                      matchup === null
                        ? `index${index}`
                        : `${matchup[0]}-${matchup[1]}`
                    }
                    className="text-center border-2 border-custom_light dark:border-custom_dark rounded-md"
                    style={{ borderColor: color }}
                  >
                    <p>
                      {data === undefined || text === '' ? <>&nbsp;</> : text}
                    </p>
                  </div>
                );
              })}
              {/* 
                

                
                */}
            </CustomGrid>
          </div>
        </div>
      </div>
    </>
  );
}

export { HeadToHeadMatrix };
