import React, { useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';

import { MdOutlineDarkMode } from 'react-icons/md';
import { HiOutlineSun } from 'react-icons/hi';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';

function DarkModeToggle() {
  // initialize dark mode with the client's system/app preferences
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div
      onClick={toggleDarkMode}
      className="flex flex-row space-x-1 cursor-pointer"
    >
      {darkMode ? (
        <>
          <MdOutlineDarkMode size={20} />
          <BsToggleOn size={20} />
        </>
      ) : (
        <>
          <HiOutlineSun size={20} />
          <BsToggleOff size={20} />
        </>
      )}
    </div>
  );
}

export { DarkModeToggle };
