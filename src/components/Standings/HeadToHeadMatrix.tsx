import React, { useState, useEffect } from 'react';
import { Dot as TeamDot } from '../Team/Dot';
import { DotAndName } from '../Team/DotAndName';
import siteConfig from '../../siteConfig.json';
import { paths, operations, components } from '../../openapi_schema';

function CustomGrid({ columns, children }) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, minmax(25px, 1fr))`,
    gap: '0.5rem', // You can adjust the gap between columns
  };

  return <div style={gridStyle}>{children}</div>;
}

type TeamID = components['schemas']['TeamID'];
type GameID = components['schemas']['GameID'];
type Standing = components['schemas']['Standing'];

interface TeamRecordsByOpponent {
  [teamID: TeamID]: [number, number];
}
interface HeadToHeadRecords {
  [teamID: TeamID]: TeamRecordsByOpponent;
}
type HeadToHeadMatchup = [TeamID, TeamID];

interface DataProps {
  teams: Record<TeamID, components['schemas']['Team']>;
  standings: Standing[];
}

interface Props {
  data: DataProps;
}

function HeadToHeadMatrix({ data }: Props) {
  const [headToHeadRecords, setHeadToHeadRecords] =
    useState<null | HeadToHeadRecords>(null);
  const [headToHeadMatchups, setHeadToHeadMatchups] = useState<
    null | HeadToHeadMatchup[]
  >(null);

  useEffect(() => {
    if (data !== null) {
      let matchups: HeadToHeadMatchup[] = [];
      let records: HeadToHeadRecords = {};

      let game_ids_won_by_team: Record<TeamID, Set<GameID>> = {};
      let game_ids_lost_by_team: Record<TeamID, Set<GameID>> = {};
      data.standings.map((standing) => {
        game_ids_won_by_team[standing.team_id] = new Set(standing.game_ids_won);
        game_ids_lost_by_team[standing.team_id] = new Set(
          standing.game_ids_lost
        );
      });

      data.standings.map((team_standing) => {
        records[team_standing.team_id] = {};

        let record_by_opponent = {};

        data.standings.map((opponent_standing) => {
          matchups.push([team_standing.team_id, opponent_standing.team_id]);

          let wins_against_opponent = 0;
          game_ids_won_by_team[team_standing.team_id].forEach((gameID) => {
            if (game_ids_lost_by_team[opponent_standing.team_id].has(gameID)) {
              wins_against_opponent += 1;
            }
          });

          let losses_against_opponent = 0;
          game_ids_lost_by_team[team_standing.team_id].forEach((gameID) => {
            if (game_ids_won_by_team[opponent_standing.team_id].has(gameID)) {
              losses_against_opponent += 1;
            }
          });

          record_by_opponent[opponent_standing.team_id] = [
            wins_against_opponent,
            losses_against_opponent,
          ];
        });

        records[team_standing.team_id] = record_by_opponent;
      });

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
            {(data === null
              ? Array.from(
                  { length: siteConfig.default_n_teams_per_division },
                  () => null
                )
              : data.standings
            ).map((standing: Standing | null, index) => (
              <p key={standing === null ? `index${index}` : standing.team_id}>
                <DotAndName
                  team={data === null ? null : data.teams[standing.team_id]}
                />
              </p>
            ))}
          </div>
          <div className="flex flex-col overflow-x-auto whitespace-nowrap">
            <CustomGrid
              columns={
                data === null
                  ? siteConfig.default_n_teams_per_division
                  : data.standings.length
              }
            >
              {/* load the dots */}
              {(data === null
                ? Array.from(
                    { length: siteConfig.default_n_teams_per_division },
                    () => null
                  )
                : data.standings
              ).map((standing: Standing | null, index) => (
                <span
                  key={data === null ? `index${index}` : standing.team_id}
                  className="text-center"
                >
                  <TeamDot
                    team={data === null ? null : data.teams[standing.team_id]}
                  />
                </span>
              ))}
              {/* load the head to head records */}
              {(headToHeadMatchups === null || headToHeadRecords === null
                ? Array.from(
                    { length: siteConfig.default_n_teams_per_division ** 2 },
                    () => null
                  )
                : headToHeadMatchups
              ).map((matchup: null | [number, number], index) => {
                let text: string = '';
                let color: string = '';
                let record_against_opponent = [0, 0];

                if (matchup !== null) {
                  record_against_opponent =
                    headToHeadRecords[matchup[0]][matchup[1]];
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
                    <p>{data === null || text === '' ? <>&nbsp;</> : text}</p>
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
