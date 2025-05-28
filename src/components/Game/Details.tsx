import React from 'react';
import { paths, operations, components } from '../../openapi_schema';

import { BsCalendar4 } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { CiLocationOn } from 'react-icons/ci';
import { UmpireMask } from '../icons/UmpireMask';
import { DotAndName } from '../Team/DotAndName';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { DataProps } from '../../types';

interface Props
  extends DataProps<{
    date: DateTime | null;
    location: components['schemas']['LocationExport'] | null;
    officiatingTeam: components['schemas']['TeamExport'] | null;
  }> {
  includeLinks?: boolean;
}

function Details({ data, includeLinks = true }: Props) {
  return (
    <div className="flex flex-row m-2 justify-center">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between space-x-8">
          <div className="flex flex-row space-x-1 items-center">
            <BsCalendar4 size={20} />
            <p>Date</p>
          </div>
          <p className="text-right">
            {data === undefined
              ? 'loading...'
              : data.date === null
              ? 'TBD'
              : data.date.toLocaleString({ month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="flex flex-row justify-between space-x-8">
          <div className="flex flex-row space-x-1 items-center">
            <BiTimeFive size={20} />
            <p>Time</p>
          </div>
          <p className="text-right">
            {data === undefined
              ? 'loading...'
              : data.date === null
              ? 'TBD'
              : data.date.toLocaleString({
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
          </p>
        </div>

        <div className="flex flex-row justify-between space-x-8">
          <div className="flex flex-row space-x-1 items-center">
            <CiLocationOn size={20} />
            <p>Location</p>
          </div>
          <p className="text-right">
            {data === undefined ? (
              'loading...'
            ) : data.location === null ? (
              'TBD'
            ) : (
              <>
                {includeLinks && data.location?.link ? (
                  <Link to={data.location.link}>
                    <span className="underline">{data.location.name}</span>
                  </Link>
                ) : (
                  <span>{data.location.name}</span>
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
                data={
                  data === undefined
                    ? undefined
                    : { team: data.officiatingTeam }
                }
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Details };
