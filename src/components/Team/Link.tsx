import React, { ReactNode } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { paths, operations, components } from '../../openapi_schema';
import { DataProps } from '../../types';
import { getLink } from './getLink';

interface Props
  extends DataProps<{
    team: components['schemas']['TeamExport'] | null;
  }> {
  children: ReactNode;
}

function Link({ data, children }: Props) {
  if (data === undefined || data.team === null) {
    return children;
  }

  return <ReactLink to={getLink(data.team)}>{children}</ReactLink>;
}

export { Link };
