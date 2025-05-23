import { createApiService } from '../utils/api';

export const getDivisions = createApiService('/divisions/', 'get');
export const getDivisionById = createApiService(
  '/divisions/{division_id}',
  'get'
);
export const getTeams = createApiService('/teams/', 'get');
export const getTeamById = createApiService('/teams/{team_id}', 'get');
export const getGames = createApiService('/games/', 'get');
export const getGameById = createApiService('/games/{game_id}', 'get');
export const patchGameScore = createApiService(
  '/games/{game_id}/score',
  'patch'
);

export const assignMatchups = createApiService(
  '/games/assign-matchups',
  'post'
);
export const reprocessAllScores = createApiService(
  '/games/reprocess-all-scores',
  'post'
);
export const getLocations = createApiService('/locations/', 'get');
export const getLocationById = createApiService(
  '/locations/{location_id}',
  'get'
);
export const getSeedingParameters = createApiService(
  '/seeding-parameters/',
  'get'
);
export const getSeedingParameterById = createApiService(
  '/seeding-parameters/{seeding_parameter_id}',
  'get'
);
export const getTournamentGames = createApiService('/tournament-games/', 'get');
export const getTournamentGameById = createApiService(
  '/tournament-games/{tournament_game_id}',
  'get'
);

export const getTournaments = createApiService('/tournaments/', 'get');
export const getTournamentById = createApiService(
  '/tournaments/{tournament_id}',
  'get'
);

export const getVisits = createApiService('/visits/', 'get');
export const getVisitById = createApiService('/visits/{visit_id}', 'get');

export const getTeamPage = createApiService('/pages/team/{team_slug}', 'get');
