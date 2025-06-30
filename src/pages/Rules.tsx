import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { paths, operations, components } from '../openapi_schema_client';

function Rules() {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Rules';
  }, []);

  useEffect(() => {
    if (location.hash === '#slugfest') {
      const element = document.getElementById('slugfest');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <div className="page">
        <div className="centered-page-content">
          <h1 className="text-center">Rules</h1>
          <div className="flex flex-row justify-center">
            <div className="card max-w-xl">
              <h2>Overview</h2>
              <p>
                All rules of the American Softball Association apply, with
                exceptions and affirmations noted below. The commissioner may
                change the rules on a week-by-week basis for the benefit of the
                league. This league exists to encourage friendly competition
                between Research Park companies, let's keep it that way! Have a
                great season!
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <div className="card max-w-xl">
              <h2>Notable Rules</h2>
              <ol className="space-y-2">
                <li>
                  <h6 className="inline font-semibold">1-1 Count: </h6>
                  <p className="inline">
                    All batters' counts start with one ball and one strike
                  </p>
                </li>
                <li>
                  <h6 className="inline font-semibold">Fouled 3rd strikes: </h6>
                  <p className="inline">
                    All foul balls in counts with two strikes will be called out
                  </p>
                </li>
                <li>
                  <h6 className="inline font-semibold">Legal Pitches: </h6>
                  <p className="inline">
                    Pitches must be thrown underhand and reach a height of 6-12
                    feet at its vertex
                  </p>
                </li>
                <li>
                  <h6 className="inline font-semibold">Balls and Strikes: </h6>
                  <p className="inline">
                    Pitches that land on home plate or the extension mat are
                    called strikes
                  </p>
                </li>
                <li>
                  <h6 className="inline font-semibold">Walk or Tee: </h6>
                  <p className="inline">
                    On ball 4, the batter has the choice between taking first
                    base (a walk) or hitting off a tee
                  </p>
                </li>
                <li>
                  <h6 className="inline font-semibold">Max 10 runs: </h6>
                  <p className="inline">
                    A team can only score a maximum of 10 runs in a half inning
                  </p>
                </li>
                <li>
                  <h6 className="inline font-semibold">Slugfest: </h6>
                  <p className="inline">
                    All tie games will be determined by Slugfest
                  </p>
                </li>
                <li>
                  <h6 className="inline font-semibold">Game Length: </h6>
                  <p className="inline">
                    Games last 7 innings or 60 minutes, whichever comes first
                  </p>
                </li>
                <li>
                  <h6 className="inline font-semibold">Plays at the Plate: </h6>
                  <p className="inline">
                    To avoid dangerous plays at the plate, all plays at the
                    plate are considered force outs (after a baserunner crosses
                    halfway)
                  </p>
                </li>
                <li>
                  <h6 className="inline font-semibold">
                    No hit by pitch (HBP):{' '}
                  </h6>
                  <p className="inline">
                    All pitches that hit the batter are considered a ball
                  </p>
                </li>
              </ol>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-4">
            <div className="flex flex-col w-full md:w-1/2 md:flex-1">
              <div className="card">
                <h2>Players</h2>
                <ol className="space-y-2">
                  <li>
                    <p>
                      • Players must be affiliated with a Research Park company
                    </p>
                  </li>
                  <li className="ml-4">
                    <p>
                      • Family and friends of company employees are welcome to
                      participate and represent the team in a manner consistent
                      with the spirit of the league
                    </p>
                  </li>
                  <li>
                    <p>• Players must be 13+ years old</p>
                  </li>
                  <li>
                    <p>
                      • Players must sign a waiver from the Champaign Park
                      District
                    </p>
                  </li>
                </ol>
              </div>
              <div className="card">
                <h2>Gameplay</h2>
                <ol className="space-y-2">
                  <li>
                    <p>• Teams must have at least 7 players to start a game</p>
                  </li>
                  <li className="ml-4">
                    <p>
                      • Pitcher and Catcher are mandatory positions to be played
                      by the fielding team
                    </p>
                  </li>
                  <li>
                    <p>• Teams can field up to 10 players</p>
                  </li>
                  <li>
                    <p>• Teams can bat as many players as they would like</p>
                  </li>
                  <li>
                    <p>
                      • All players that play the field must be in the batting
                      lineup
                    </p>
                  </li>
                  <li>
                    <p>
                      • Games that are shortened due to weather will be counted
                      if 4+ innings have been completed (or 3.5 with home team
                      leading)
                    </p>
                  </li>
                  <li>
                    <p>
                      • A team can only score a maximum of 10 runs in a half
                      inning. After 10 runs are scored, the half inning is over.
                    </p>
                  </li>
                </ol>
              </div>
              <div className="card">
                <h2>Pitches</h2>
                <ul className="space-y-2">
                  <li>
                    <p>• Pitches must be thrown underhand</p>
                  </li>
                  <li>
                    <p>
                      • Pitch must be thrown while the pitcher is in contact
                      with the rubber
                    </p>
                  </li>
                  <li>
                    <p>
                      • Pitches must have an arc that reaches a height of 6-12
                      feet at its highest point
                    </p>
                  </li>
                  <li className="ml-4">
                    <p>
                      • Pitches too high or too low will be called "illegal" by
                      an umpire before the ball reaches home late
                    </p>
                  </li>
                  <li className="ml-4">
                    <p>
                      • Illegal pitches will be scored as a ball. However, the
                      batter reserves the right to swing at an illegal pitch,
                      thereby forfeiting the ball.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="card">
                <h2>Balls and Strikes</h2>
                <ul className="space-y-2">
                  <li>
                    <p>• Each count starts with 1 ball and 1 strike</p>
                  </li>
                  <li>
                    <p>
                      • Foul balls with two strikes are treated as a strikeout
                    </p>
                  </li>
                  <li>
                    <p>
                      • The strikezone is denoted as home plate and the
                      surrounding mat. Balls that land in the strikezone are
                      suggested to be called strikes by the umpire.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="card">
                <h2>Walks | Tee it up</h2>
                <p>
                  When ball 4 is called on a batter, they have the choice
                  between:
                </p>
                <ul className="space-y-1 mt-2">
                  <li>
                    <p>• Taking 1st base (a regular walk)</p>
                  </li>
                  <li>
                    <p>• Hitting off a tee</p>
                  </li>
                  <li className="ml-4">
                    <p>
                      • Foul balls and swing and misses off the tee will be
                      counted towards the batter's strike count. A batter cannot
                      change their mind and take a walk after swinging with a
                      tee.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="card">
                <h2>Mercy Rule</h2>
                <ol className="space-y-2">
                  <li>
                    <p>• 15 runs after 3 complete innings</p>
                  </li>
                  <li>
                    <p>• 10 runs after 4 complete innings</p>
                  </li>
                  <li>
                    <p>
                      • All mercy rule games continue playing in recreational
                      mode until the time limit is reached
                    </p>
                  </li>
                </ol>
              </div>
              <div className="card">
                <h2>Recreational Mode</h2>
                <p>
                  To keep the league entertaining for all skills levels, games
                  will enter recreational mode after either:
                </p>
                <ol className="mt-2 space-y-1">
                  <li className="ml-4">
                    <p>• Mercy rule is reached</p>
                  </li>
                  <li className="ml-4">
                    <p>• Team Forfeit</p>
                  </li>
                </ol>
                <p className="mt-2">
                  When a team forfeits a game, the score will be recorded in
                  whatever option produces the greater run differential:
                </p>
                <ol className="mt-2 space-y-1">
                  <li className="ml-4">
                    <p>• Current score of the game</p>
                  </li>
                  <li className="ml-4">
                    <p>• Mercy rule differential for the current inning</p>
                  </li>
                </ol>
                <h4 className="mt-4">
                  <strong>Recreational Mode Rules</strong>
                </h4>
                <ol className="space-y-2 mt-2">
                  <li>
                    <p>
                      • Teams are encouraged to "trade" players to even up teams
                    </p>
                  </li>
                  <li>
                    <p>• Batter's choice to use tee or be pitched to</p>
                  </li>
                  <li>
                    <p>• 5 run limit for half inning</p>
                  </li>
                  <li>
                    <p>• Have fun!</p>
                  </li>
                </ol>
              </div>
              <div className="card">
                <h2>Umpire's Discretion</h2>
                <p>
                  The umpires reserve the judgement to eject, call a player out,
                  etc. for any player of team's actions that do not carry on the
                  spirit of the Research Park Softball League
                </p>
              </div>
            </div>

            <div className="flex flex-col w-full md:w-1/2 md:flex-1">
              <div className="card" id="slugfest">
                <h2>Slugfest</h2>
                <p>
                  For all regular and postseason games tied after 7 innings or
                  the time limit, the <strong>Slugfest</strong> tiebreaker is in
                  effect.
                </p>
                <ol className="space-y-2 mt-2">
                  <li>
                    <p>• Both teams elect one player to represent the team</p>
                  </li>
                  <li>
                    <p>
                      • Each player takes <strong>one swing</strong> at a ball
                      teed up on home plate
                    </p>
                  </li>
                  <li className="ml-4">
                    <p>• Away team always hit first, home team hits second</p>
                  </li>
                  <li>
                    <p>
                      • Essentially, the player who hits the ball farther wins
                      Slugfest. Detailed guidance is explained below.
                    </p>
                  </li>
                  <li>
                    <p>
                      • Ties result in another round of Slugfest. Teams elect a
                      new representative who has not yet participated and
                      continue with another round. This process continues until
                      a winner is chosen.
                    </p>
                  </li>
                </ol>
                <h3 className="text-center mt-4">Slug Hierarchy</h3>
                <div className="max-w-lg mx-auto space-y-2">
                  <p>
                    Slugfest attempts are grouped into one of the following
                    categories.
                  </p>
                  <div className="rounded-lg bg-color p-2">
                    <h5>
                      <strong>1. Home Run</strong>
                    </h5>
                    <p>Any fair ball that is hit over the fence</p>
                  </div>
                  <div className="rounded-lg bg-color p-2">
                    <h5>
                      <strong>2. Ground Rule Double</strong>
                    </h5>
                    <p>Any fair ball that bounces over the fence</p>
                  </div>
                  <div className="rounded-lg bg-color p-2">
                    <h5>
                      <strong>3. Outfield Fence</strong>
                    </h5>
                    <p>Any fair ball that hits the outfield fence</p>
                  </div>
                  <div className="rounded-lg bg-color p-2">
                    <h5>
                      <strong>4. Fair Ball (compare distance)</strong>
                    </h5>
                    <p>
                      Any fair ball that does not belong in the above groups.
                      Measure the final distance of the ball from home plate.
                      Compare between the two teams.
                    </p>
                  </div>
                  <div className="rounded-lg bg-color p-2">
                    <h5>
                      <strong>5. Foul Ball / Whiff</strong>
                    </h5>
                    <p>Any foul ball or a whiff (yikes)</p>
                  </div>
                  <p>
                    In each round, the player whose hit lands in the higher
                    ranked category wins. Home run beats a ground rule double, a
                    fair ball beats a foul ball, etc.
                  </p>
                  <p>
                    If hits from each player end up in the same category, the
                    round is ruled a tie. For example, if both players hit a
                    foul ball, the round is a tie. If both players' hits reach
                    the outfield fence, the round is a tie. If both players hit
                    home runs, the round is a tie, no matter whose home run went
                    farther.
                  </p>
                  <p>
                    The exception to this rule is category{' '}
                    <strong>4. Fair Ball</strong>. In this instance, each ball
                    is measured from home plate to its final location on the
                    field. The team whose ball is farther from home plate wins.
                  </p>
                </div>
              </div>

              <div className="card">
                <h2>Baserunning</h2>
                <ul className="space-y-2">
                  <li>
                    <p>• Stealing and leadoffs are not allowed</p>
                  </li>
                  <li>
                    <p>
                      • Runners cannot leave their base until the ball is hit
                    </p>
                  </li>
                </ul>
              </div>
              <div className="card">
                <h2>Plays at the Plate</h2>
                <p>
                  To eliminate dangerous tag plays at the plate, the following
                  rules are in effect:
                </p>
                <ul className="space-y-1 mt-2">
                  <li>
                    <p>
                      • If a baserunner goes more than{' '}
                      <strong>halfway home</strong> after rounding 3rd base,
                      they must proceed running home
                    </p>
                  </li>
                  <li className="ml-4">
                    <p>
                      • Runners that turn around and go back to 3rd base after
                      crossing halfway will be called out
                    </p>
                  </li>
                  <li className="ml-4">
                    <p>
                      • Most fields will have a chalk line designating "halfway
                      home"
                    </p>
                  </li>
                  <li>
                    <p>• All plays at the place are force outs</p>
                  </li>
                  <li className="ml-4">
                    <p>
                      • The catcher steppng on home with the ball before the
                      runner crosses home is equivalent to tagging the runner
                      out
                    </p>
                  </li>
                </ul>
              </div>
              <div className="card">
                <h2>Safety Home Plate</h2>
                <p>
                  On some softball fields, a secondary home plate is present. It
                  is to be thought of as the orange safety bag at 1st base.
                </p>
                <br></br>
                <p>
                  For all fields with a safety home plate, the following rules
                  are in effect:
                </p>
                <ul className="space-y-1 mt-2">
                  <li>
                    <p>
                      • All baserunners must use the safety home plate (the
                      secondary home plate)
                    </p>
                  </li>
                  <li>
                    <p>
                      • All fielding players (catcher, etc.) must use the
                      original home plate
                    </p>
                  </li>
                  <li>
                    <p>
                      • All rules from the “Plays at the Plate” section are
                      still in effect
                    </p>
                  </li>
                </ul>
              </div>

              <div className="card">
                <h2>Player Safety</h2>
                <ol className="space-y-2">
                  <li>
                    <p>• No metal cleats allowed, plastic cleats are fine</p>
                  </li>
                  <li>
                    <p>
                      • Dangerous slides are illegal and up to umpire discretion
                      (cleats up, out of baseline, aiming for fielders, etc)
                    </p>
                  </li>
                  <li>
                    <p>• No fake bunting</p>
                  </li>
                  <li>
                    <p>
                      • Bunting is allowed, players are expected to use good
                      judgement
                    </p>
                  </li>
                </ol>
              </div>
            </div>
            {/* end of flex col */}
          </div>
          {/* enf of flex row */}
        </div>
      </div>
    </>
  );
}

export { Rules };
