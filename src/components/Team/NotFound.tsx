import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <div className="page">
        <div className="centered-page-content">
          <h3 className="text-center">This team does not exist</h3>
          <div className="flex flex-row justify-center">
            <Link to="/">
              <button>Home</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export { NotFound };
