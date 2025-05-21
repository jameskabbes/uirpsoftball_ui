import React from 'react';

interface Props {
  color: string;
  style?: object;
}

function Dot({ color, style = {} }: Props) {
  return (
    <span
      className="dot"
      style={{
        backgroundColor: `#${color}`,
        ...style,
      }}
    ></span>
  );
}

export { Dot };
