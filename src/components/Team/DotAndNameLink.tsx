import React from 'react';
import { Link } from './Link';
import { DotAndName } from './DotAndName';
import { paths, operations, components } from '../../openapi_schema';
import { DataProps } from '../../types';

interface Props
  extends DataProps<{
    team: components['schemas']['TeamExport'];
  }> {}

function DotAndNameLink({ data }: Props) {
  return (
    <div className="">
      <Link data={data}>
        <DotAndName data={data} />
      </Link>
    </div>
  );
}

export { DotAndNameLink };
