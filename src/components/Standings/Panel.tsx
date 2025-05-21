import React from 'react';

interface Props {
  left: any[];
  right: any[];
  isHoverable?: boolean;
}

function Panel({ left, right, isHoverable = true }: Props) {
  return (
    <div
      className={
        (isHoverable ? 'panel' : 'panel-no-hover') +
        ' flex flex-row justify-between space-x-6'
      }
    >
      <div className="flex flex-row space-x-2 items-center">
        {left.map((item, index) => (
          <React.Fragment key={index}>{item}</React.Fragment>
        ))}
      </div>

      <div className="flex flex-row space-x-2 items-center">
        {right.map((item, index) => {
          return (
            <div
              className="rounded-lg px-2 py-1 bg-color text-center w-12"
              key={index}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { Panel };
