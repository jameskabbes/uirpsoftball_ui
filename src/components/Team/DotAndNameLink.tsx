import React from 'react';
import { Link } from './Link';
import { DotAndName } from './DotAndName';
import { paths, operations, components } from '../../openapi_schema';

interface Props {
  team: components['schemas']['Team'];
}

function DotAndNameLink({ team }: Props) {
  return (
    <div className="">
      <Link team={team}>
        <DotAndName team={team} />
      </Link>
    </div>
  );
}

export { DotAndNameLink };
