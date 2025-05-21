import React from 'react';
import { paths, operations, components } from '../../openapi_schema';

import { Dot as TeamDot } from '../Team/Dot';
import { Link as TeamLink } from '../Team/Link';

interface Props {
  homeTeam: components['schemas']['Team'] | null;
  awayTeam: components['schemas']['Team'] | null;
  includeTeamLinks?: boolean;
}

function DotAndNameMatchup({
  homeTeam,
  awayTeam,
  includeTeamLinks = true,
}: Props) {
  function Dot({ team }: { team: components['schemas']['Team'] | null }) {
    return (
      <h1>
        <TeamDot team={team} />
      </h1>
    );
  }

  function Name({
    team,
    loadingFiller,
  }: {
    team: components['schemas']['Team'] | null;
    loadingFiller: string;
  }) {
    return <h3>{team === null ? loadingFiller : team.name}</h3>;
  }

  function DotAndName({
    team,
    loadingFiller,
    includeTeamLinks,
  }: {
    team: components['schemas']['Team'] | null;
    includeTeamLinks: boolean;
    loadingFiller: string;
  }) {
    function Inner() {
      return (
        <div className="flex flex-col items-center">
          <Dot team={team} />
          <Name team={team} loadingFiller={loadingFiller} />
        </div>
      );
    }

    if (includeTeamLinks && team !== null) {
      return (
        <TeamLink team={team}>
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
        team={awayTeam}
        loadingFiller="Away Team"
        includeTeamLinks={includeTeamLinks}
      />
      <DotAndName
        team={homeTeam}
        loadingFiller="Home Team"
        includeTeamLinks={includeTeamLinks}
      />
    </div>
  );
}

export { DotAndNameMatchup };
