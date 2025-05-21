import React from 'react';
import { paths, operations, components } from '../../openapi_schema';

import { BsCalendar4 } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { CiLocationOn } from 'react-icons/ci';
import { UmpireMask } from '../icons/UmpireMask';
import { DotAndName } from '../Team/DotAndName';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

interface Props {
  date: DateTime | null;
  location: components['schemas']['Location'] | null;
  officiatingTeam: components['schemas']['Team'] | null;
  includeLinks?: boolean;
}

function Details({
  date,
  location,
  officiatingTeam,
  includeLinks = true,
}: Props) {
  return (
    <div className="flex flex-row m-2 justify-center">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between space-x-8">
          <div className="flex flex-row space-x-1 items-center">
            <BsCalendar4 size={20} />
            <p>Date</p>
          </div>
          <p className="text-right">
            {date !== null
              ? date.toLocaleString({ month: 'long', day: 'numeric' })
              : 'loading...'}
          </p>
        </div>

        <div className="flex flex-row justify-between space-x-8">
          <div className="flex flex-row space-x-1 items-center">
            <BiTimeFive size={20} />
            <p>Time</p>
          </div>
          <p className="text-right">
            {date !== null
              ? date.toLocaleString({
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })
              : 'loading...'}
          </p>
        </div>

        <div className="flex flex-row justify-between space-x-8">
          <div className="flex flex-row space-x-1 items-center">
            <CiLocationOn size={20} />
            <p>Location</p>
          </div>
          <p className="text-right">
            {location === null ? (
              <span>loading...</span>
            ) : (
              <>
                {includeLinks ? (
                  <Link to={location.link}>
                    <span className="underline">{location.name}</span>
                  </Link>
                ) : (
                  <span className="underline">{location.name}</span>
                )}
              </>
            )}
          </p>
        </div>

        <div className="flex flex-row justify-between space-x-8">
          <div className="flex flex-row space-x-1 items-center">
            <UmpireMask />
            <p>Umpires</p>
          </div>
          <div className="text-right">
            <p>
              <DotAndName
                team={officiatingTeam === null ? null : officiatingTeam}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Details };
