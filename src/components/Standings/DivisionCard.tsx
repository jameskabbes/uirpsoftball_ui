import React, { useEffect, useState } from 'react';
import { TeamPanel } from './TeamPanel';
import { Panel } from './Panel';
import { Link as TeamLink } from '../Team/Link';
import { config } from '../../config/config';
import { paths, operations, components } from '../../openapi_schema';

type DivisionAggregator = components['schemas']['DivisionAggregator'];
interface DataProps extends DivisionAggregator {
  teamIdsToBold: Set<components['schemas']['TeamID']>;
}

interface Props {
  data: DataProps | null;
}

function DivisionCard({ data }: Props) {
  return (
    <div className="panels max-w-sm">
      <Panel
        left={[
          <h3 className="mb-0">
            {data === null ? 'Division' : data.division.name}
          </h3>,
        ]}
        right={['W-L', 'RD']}
        isHoverable={false}
      />
      {(data === null
        ? Array.from({ length: config.defaultNTeamsPerDivision }, () => null)
        : data.standings
      ).map((standing: null | components['schemas']['Standing'], index) => (
        <TeamLink
          key={standing === null ? `index${index}` : standing.team_id}
          team={data === null ? null : data.teams[standing.team_id]}
        >
          <TeamPanel
            data={
              data === null
                ? null
                : {
                    team: data.teams[standing.team_id],
                    standing: standing,
                  }
            }
            bold={
              data === null ? false : data.teamIdsToBold.has(standing.team_id)
            }
          />
        </TeamLink>
      ))}
    </div>
  );
}

export { DivisionCard };
