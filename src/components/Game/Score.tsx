import React from 'react';

import { BsPlusLg } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';

const minScore = 0;
const maxScore = 99;

interface Props {
  toggleRecord: boolean;
  value: number;
  setValue: CallableFunction;
  handleScoreChange: CallableFunction;
}

function Score({ toggleRecord, value, setValue, handleScoreChange }: Props) {
  return (
    <div className="flex flex-row items-center justify-center space-x-2">
      {toggleRecord && (
        <h4 className="mb-0">
          <BiMinus
            onClick={() => {
              if (value > minScore) {
                setValue(value - 1);
              }
            }}
            className="hover:cursor-pointer"
          />
        </h4>
      )}
      <h1 className="text-center mb-0 leading-tight">
        {toggleRecord ? (
          <input
            className="team-score-input "
            value={value}
            onChange={(e) => handleScoreChange(setValue, e, minScore, maxScore)}
          />
        ) : (
          <>{value}</>
        )}
      </h1>
      {toggleRecord && (
        <h4 className="mb-0">
          <BsPlusLg
            onClick={() => {
              if (value < maxScore) {
                setValue(value + 1);
              }
            }}
            className="hover:cursor-pointer"
          />
        </h4>
      )}
    </div>
  );
}

export { Score };
