import React from 'react';

import { BsPlusLg } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';

const minScore = 0;
const maxScore = 99;

type SetScore = React.Dispatch<React.SetStateAction<number | null>>;

export type HandleScoreChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setState: SetScore,
  minScore: number,
  maxScore: number
) => void;

interface Props {
  toggleRecord: boolean;
  value: number | null;
  setValue: SetScore;
  handleScoreChange: HandleScoreChange;
}

//   const handleScoreChange = (setState, e, minScore, maxScore) => {

function Score({ toggleRecord, value, setValue, handleScoreChange }: Props) {
  const safeValue = value ?? 0;
  return (
    <div className="flex flex-row items-center justify-center space-x-2">
      {toggleRecord && (
        <h4 className="mb-0">
          <BiMinus
            onClick={() => {
              if (safeValue > minScore) {
                setValue(safeValue - 1);
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
            value={value ?? ''}
            onChange={(e) => handleScoreChange(e, setValue, minScore, maxScore)}
            inputMode="numeric"
          />
        ) : (
          <>{value}</>
        )}
      </h1>
      {toggleRecord && (
        <h4 className="mb-0">
          <BsPlusLg
            onClick={() => {
              if (safeValue < maxScore) {
                setValue(safeValue + 1);
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
