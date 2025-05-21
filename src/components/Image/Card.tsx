import React from 'react';
import { paths, operations, components } from '../../openapi_schema';
import siteConfig from '../../siteConfig.json';

function Card({ image }: { image: components['schemas']['Image'] | null }) {
  return (
    <>
      <div className="component rounded-xl shadow-lg w-full p-1">
        {image !== null && (
          <>
            <img
              className="w-full h-full object-cover rounded-lg"
              src={`/${siteConfig.api_endpoint_base}/image/${image.id}`}
            />
          </>
        )}
      </div>
    </>
  );
}
export { Card };
