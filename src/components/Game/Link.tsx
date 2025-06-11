import React, { ReactNode } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { paths, operations, components } from '../../openapi_schema_client';
import { DataProps } from '../../types';
import { getLink } from './getLink';

interface Props
  extends DataProps<{
    game: components['schemas']['GameExport'] | null;
  }> {
  children: ReactNode;
}

function Link({ data, children }: Props) {
  if (data === undefined || data.game === null) {
    return children;
  }
  return <ReactLink to={getLink(data.game)}>{children}</ReactLink>;
}

export { Link };
