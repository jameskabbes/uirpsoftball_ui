import React, { ReactNode } from 'react';

interface Props {
  n: number;
  children: ReactNode;
}

function GridDiv({ n, children }: Props) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-${Math.min(
        2,
        n
      )} justify-center gap-4`}
    >
      {children}
    </div>
  );
}

export { GridDiv };
