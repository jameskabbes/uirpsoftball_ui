import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Schedule } from './pages/Schedule';
import { Standings } from './pages/Standings';
import { Rules } from './pages/Rules';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Team } from './pages/Team';
import { Game } from './pages/Game';
import { Admin } from './pages/Admin';
import { Combine } from './pages/Combine';
import { PageNotFound } from './pages/PageNotFound';
import { DarkModeProvider } from './contexts/DarkModeProvider';

function App(): JSX.Element {
  return (
    <div className="App">
      <DarkModeProvider>
        <BrowserRouter>
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/teams/:teamSlug" element={<Team />} />
              <Route path="/games/:gameId" element={<Game />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/standings" element={<Standings />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/combine" element={<Combine />} />
              <Route path="/404" element={<PageNotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </DarkModeProvider>
    </div>
  );
}

export { App };
