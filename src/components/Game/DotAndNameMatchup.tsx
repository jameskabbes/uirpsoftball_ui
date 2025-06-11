import React from 'react';
import { paths, operations, components } from '../../openapi_schema_client';

import { Dot as TeamDot } from '../Team/Dot';
import { Link as TeamLink } from '../Team/Link';
import { DataProps } from '../../types';

interface Props
  extends DataProps<{
    homeTeam: components['schemas']['TeamExport'] | null;
    awayTeam: components['schemas']['TeamExport'] | null;
  }> {
  includeTeamLinks?: boolean;
}

function DotAndNameMatchup({ data, includeTeamLinks = true }: Props) {
  interface Props
    extends DataProps<{
      team: components['schemas']['TeamExport'] | null;
    }> {
    loadingFiller: string;
    includeTeamLinks: boolean;
  }

  function DotAndName({ data, loadingFiller, includeTeamLinks }: Props) {
    function Inner() {
      return (
        <div className="flex flex-col items-center">
          <h1>
            <TeamDot data={data} />
          </h1>
          <h3>
            {data === undefined
              ? loadingFiller
              : data.team === null
              ? 'Team TBD'
              : data.team.name}
          </h3>
        </div>
      );
    }

    if (data !== undefined && includeTeamLinks && data.team !== null) {
      return (
        <TeamLink data={{ team: data.team }}>
          <Inner />
        </TeamLink>
      );
    } else {
      return <Inner />;
    }
  }

  return (
    <div className="grid grid-cols-2">
      <h4 className="text-center">Away</h4>
      <h4 className="text-center">Home</h4>
      <DotAndName
        data={data === undefined ? undefined : { team: data.awayTeam }}
        loadingFiller="Away Team"
        includeTeamLinks={includeTeamLinks}
      />
      <DotAndName
        data={data === undefined ? undefined : { team: data.homeTeam }}
        loadingFiller="Home Team"
        includeTeamLinks={includeTeamLinks}
      />
    </div>
  );
}

export { DotAndNameMatchup };
