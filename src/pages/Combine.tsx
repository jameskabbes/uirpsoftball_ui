import React, { useEffect } from 'react';

function Combine() {
  useEffect(() => {
    document.title = 'Combine';
  }, []);

  return (
    <>
      <div className="page">
        <div className="centered-page-content">
          <h1 className="text-center">Combine</h1>
          <div className="flex flex-row justify-center">
            <div className="card max-w-xl">
              <h2>Overview</h2>
              <p>
                The combine is an event where individuals and teammates
                participate in softball competitions testing various skills:
                hitting, baserunning, pitching, throwing, and fielding.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-4">
            <div className="flex flex-col w-full md:w-1/2 md:flex-1">
              <div className="card">
                <div className="flex flex-row justify-between items-center mb-4">
                  <h2 className="mb-0">4 x 60 Relay</h2>
                  <p className="bg-color-invert rounded-full p-2 text-color-invert whitespace-nowrap">
                    Team of 4
                  </p>
                </div>
                <h4>Baserunning - Fastest Team</h4>
                <p>
                  Teams of 4 participate in a relay around the bases. Beginning
                  with a player at home plate, the player runs to 1st base. Once
                  1st base is reached by the 1st player, the second relay member
                  (waiting on 1st base) runs to 2nd base. This continues until
                  the anchor runs from 3rd base to home plate. Fastest time
                  wins.
                </p>
              </div>
              <div className="card">
                <div className="flex flex-row justify-between items-center mb-4">
                  <h2 className="mb-0">Diamond Dash</h2>
                  <p className="bg-color-invert rounded-full p-2 text-color-invert">
                    Individual
                  </p>
                </div>
                <h4>Baserunning - Fastest Player</h4>
                <p>
                  Individuals are timed as they round the bases, beginning at
                  home plate and ending at home plate. 5 fastest preliminary
                  times are selected as finalists. All finalists race again,
                  fastest finalist wins.
                </p>
              </div>
              <div className="card">
                <div className="flex flex-row justify-between items-center mb-4">
                  <h2 className="mb-0">King of the Hill</h2>
                  <p className="bg-color-invert rounded-full p-2 text-color-invert">
                    Individual
                  </p>
                </div>
                <h4>Pitching - Most Accurate Pitcher</h4>
                <p>
                  Beginning with all participating individuals, each player
                  attempts to throw a strike from the pitching rubber. Each
                  player has two tries to throw a strike. Players that do not
                  throw a strike are eliminated. The competition continues until
                  only one pitcher remains.
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full md:w-1/2 md:flex-1">
              <div className="card">
                <div className="flex flex-row justify-between items-center mb-4">
                  <h2 className="mb-0">Softball Balloon Toss</h2>
                  <p className="bg-color-invert rounded-full p-2 text-color-invert whitespace-nowrap">
                    Team of 2
                  </p>
                </div>
                <h4>Throwing | Fielding - Best Duo</h4>
                <p>
                  Like a water balloon toss, the softball balloon toss requires
                  careful throws and catches between a pair of competitors.
                  However, this competition uses softballs instead of water
                  balloons.
                </p>
                <p className="mt-2">
                  All competing pairs are lined up 10 feet apart from each
                  other. One player throws the softball to their partner. All
                  players take a step apart. The other player throws the ball
                  back to their partner and the process continues.
                </p>
                <p className="mt-2">Teams are eliminated when:</p>
                <ul>
                  <p>
                    <li className="ml-2">• the ball is not caught</li>
                  </p>
                  <p>
                    <li className="ml-2">
                      • the ball hits the ground before being caught
                    </li>
                  </p>
                  <p>
                    <li className="ml-2">
                      • the catching player moves more than 1 of their feet in
                      an attempt to catch the ball, including jumping (needs to
                      be a 1st baseman stretch)
                    </li>
                  </p>
                </ul>
                <p className="mt-2">The last remaining team wins.</p>
              </div>
              <div className="card">
                <div className="flex flex-row justify-between items-center mb-4">
                  <h2 className="mb-0">Slugfest</h2>
                  <p className="bg-color-invert rounded-full p-2 text-color-invert">
                    Individual
                  </p>
                </div>
                <h4>Hitting - Strongest Hitter</h4>
                <p>
                  An elimination style version of the league's{' '}
                  <a href="/rules#slugfest" className="underline">
                    Slugfest
                  </a>{' '}
                  tiebreaker. Each player is given 1 swing to hit the ball as
                  far as they can. The player can either 1) use a tee or 2)
                  throw the ball up to themsevles.
                </p>
                <p className="mt-2">
                  The bottom 50% of hits are eliminated after each round. This
                  continues until there is one winner.
                </p>
                <p className="mt-2"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { Combine };
