import React, { useEffect, useState } from 'react';
import { paths, operations, components } from '../../openapi_schema';
import { Dot as TeamDot } from '../Team/Dot';
import { Link as TeamLink } from '../Team/Link';
import { HandleScoreChange, Score } from './Score';
import { DataProps } from '../../types';

interface Props
  extends DataProps<{
    game: components['schemas']['GameExport'];
  }> {
  submitScore: CallableFunction;
}

function Scores({ data, submitScore }: Props) {
  const [toggleRecord, setToggleRecord] = useState<boolean>(false);
  const [home, setHome] = useState<number | null>(null);
  const [away, setAway] = useState<number | null>(null);
  const [homeBase, setHomeBase] = useState<number | null>(null);
  const [awayBase, setAwayBase] = useState<number | null>(null);

  useEffect(() => {
    if (data !== undefined) {
      if (
        data.game.home_team_score !== null &&
        data.game.away_team_score !== null
      ) {
        setHome(data.game.home_team_score);
        setHomeBase(data.game.home_team_score);
        setAway(data.game.away_team_score);
        setAwayBase(data.game.away_team_score);
      }
    }
  }, [data]);

  const handleScoreChange: HandleScoreChange = (
    e,
    setState,
    minScore,
    maxScore
  ) => {
    const inputValue = parseInt(e.target.value);
    if (isNaN(inputValue)) {
      setState(0);
    } else if (
      !isNaN(inputValue) &&
      inputValue >= minScore &&
      inputValue <= maxScore
    ) {
      setState(inputValue);
    }
  };

  const handleCancel = () => {
    setHome(homeBase);
    setAway(awayBase);
    setToggleRecord(false);
  };

  // upon submission, send POST request updating the score with formData
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setHomeBase(home);
    setAwayBase(away);
    setToggleRecord(false);
    submitScore(home, away);
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="text-center">
          <Score
            toggleRecord={toggleRecord}
            value={away}
            setValue={setAway}
            handleScoreChange={handleScoreChange}
          />
        </div>
        <div className="text-center">
          <Score
            toggleRecord={toggleRecord}
            value={home}
            setValue={setHome}
            handleScoreChange={handleScoreChange}
          />
        </div>
      </div>

      <div className="flex justify-center p-1 mt-2">
        {data !== undefined &&
        !toggleRecord &&
        data.game.is_accepting_scores ? (
          <button
            onClick={() => {
              setToggleRecord(true);
              if (home === null && away === null) {
                setHome(0);
                setAway(0);
              }
            }}
          >
            Submit a Score
          </button>
        ) : null}

        {toggleRecord && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-right">
                <button className="button-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
              <div className="">
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export { Scores };
