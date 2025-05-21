import React from 'react';
import { BlockI } from './icons/BlockI';

function Footer() {
  return (
    <footer>
      <div>
        <div className="flex flex-row space-x-2 items-center justify-center">
          <BlockI />
          <p>UIRP Softball</p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
