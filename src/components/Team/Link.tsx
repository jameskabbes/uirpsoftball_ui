import React, { ReactNode } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { paths, operations, components } from '../../openapi_schema';

interface Props {
  team: components['schemas']['TeamExport'] | undefined;
  children: ReactNode;
}

function Link({ team, children }: Props) {
  if (team === undefined) {
    return children;
  }
  if (team.id < 0) {
    return children;
  }
  return <ReactLink to={'/team/' + team.slug}>{children}</ReactLink>;
}

export { Link };
