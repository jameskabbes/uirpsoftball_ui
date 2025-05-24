import React, { ReactNode } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { paths, operations, components } from '../../openapi_schema';

interface Props {
  game: components['schemas']['GameExport'] | undefined;
  children: ReactNode;
}

function Link({ game, children }: Props) {
  if (game === undefined) {
    return children;
  }
  return <ReactLink to={'/game/' + game.id}>{children}</ReactLink>;
}

export { Link };
