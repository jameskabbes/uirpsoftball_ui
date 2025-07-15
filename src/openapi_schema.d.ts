export interface OpenapiSchema {
  openapi: string;
  info: Info;
  paths: Paths;
  components: Components;
}
interface Components {
  schemas: Schemas;
}
interface Schemas {
  AdminResponse: AdminResponse;
  DivisionExport: DivisionExport;
  GameExport: GameExport;
  GameIdsAndRounds: GameIdsAndRounds;
  GameResponse: GameResponse;
  HTTPValidationError: HTTPValidationError;
  HomeResponse: HomeResponse;
  IsAcceptingScoresUpdate: IsAcceptingScoresUpdate;
  LocationExport: LocationExport;
  ScheduleResponse: ScheduleResponse;
  ScoreUpdate: ScoreUpdate;
  SeedingParameterExport: SeedingParameterExport;
  StandingsResponse: StandingsResponse;
  TeamExport: TeamExport;
  TeamResponse: TeamResponse;
  TeamStatisticsExport: TeamStatisticsExport;
  TournamentExport: DivisionExport;
  TournamentGameExport: TournamentGameExport;
  ValidationError: ValidationError;
  VisitExport: VisitExport;
}
interface VisitExport {
  properties: Properties19;
  type: string;
  required: string[];
  title: string;
}
interface Properties19 {
  id: Schema3;
  datetime: Datetime;
  path: Schema3;
}
interface ValidationError {
  properties: Properties18;
  type: string;
  required: string[];
  title: string;
}
interface Properties18 {
  loc: Loc;
  msg: Schema3;
  type: Schema3;
}
interface Loc {
  items: Items2;
  type: string;
  title: string;
}
interface Items2 {
  anyOf: AnyOf[];
}
interface TournamentGameExport {
  properties: Properties17;
  type: string;
  required: string[];
  title: string;
}
interface Properties17 {
  game_id: Schema3;
  tournament_id: Hometeamid;
  bracket_id: Schema3;
  round: Schema3;
  home_team_filler: Hometeamid;
  away_team_filler: Hometeamid;
  officiating_team_filler: Hometeamid;
}
interface TeamStatisticsExport {
  properties: Properties16;
  type: string;
  required: string[];
  title: string;
}
interface Properties16 {
  run_differential: Schema3;
  game_ids_won: Gameidswon;
  game_ids_lost: Gameidswon;
}
interface Gameidswon {
  items: AnyOf;
  type: string;
  uniqueItems: boolean;
  title: string;
}
interface TeamResponse {
  properties: Properties15;
  type: string;
  required: string[];
  title: string;
}
interface Properties15 {
  games: Games;
  teams: Games;
  locations: Games;
  game_known_ids: Gameids;
  game_unknown_ids: Gameids;
  team_id: Schema3;
  division: Items;
  featured_game_id: Hometeamid;
  team_statistics: Games;
  team_ids_ranked: Gameids;
}
interface TeamExport {
  properties: Properties14;
  type: string;
  required: string[];
  title: string;
}
interface Properties14 {
  id: Schema3;
  name: Schema5;
  division_id: Hometeamid;
  slug: Schema5;
  color: Color;
  seed: Seed;
}
interface Seed {
  type: string;
  minimum: number;
  title: string;
}
interface Color {
  anyOf: AnyOf4[];
  title: string;
}
interface AnyOf4 {
  type: string;
  maxLength?: number;
  minLength?: number;
}
interface StandingsResponse {
  properties: Properties13;
  type: string;
  required: string[];
  title: string;
}
interface Properties13 {
  teams: Games;
  divisions: Games;
  division_ids_ordered: Gameids;
  team_statistics: Games;
  team_ids_ranked_by_division: Teamidsrankedbydivision;
  seeding_parameters: Schema2;
}
interface SeedingParameterExport {
  properties: Properties12;
  type: string;
  required: string[];
  title: string;
}
interface Properties12 {
  id: Schema3;
  parameter: Schema5;
  name: Schema5;
}
interface ScoreUpdate {
  properties: Properties11;
  type: string;
  required: string[];
  title: string;
}
interface Properties11 {
  home_team_score: Hometeamscore;
  away_team_score: Hometeamscore;
}
interface ScheduleResponse {
  properties: Properties10;
  type: string;
  required: string[];
  title: string;
}
interface Properties10 {
  games: Games;
  teams: Games;
  locations: Games;
  game_ids_and_rounds: Schema2;
  tournaments: Schema2;
  tournament_games: Tournamentgames;
}
interface LocationExport {
  properties: Properties9;
  type: string;
  required: string[];
  title: string;
}
interface Properties9 {
  id: Schema3;
  name: Schema5;
  link: Schema5;
  short_name: Schema5;
  time_zone: Schema5;
}
interface IsAcceptingScoresUpdate {
  properties: Properties8;
  type: string;
  title: string;
}
interface Properties8 {
  is_accepting_scores: Hometeamid;
}
interface HomeResponse {
  properties: Properties7;
  type: string;
  required: string[];
  title: string;
}
interface Properties7 {
  games: Games;
  teams: Games;
  locations: Games;
  game_ids_and_rounds: Schema2;
  divisions: Games;
  division_ids_ordered: Gameids;
  team_statistics: Games;
  team_ids_ranked_by_division: Teamidsrankedbydivision;
  tournaments: Schema2;
  tournament_games: Tournamentgames;
}
interface Tournamentgames {
  additionalProperties: AdditionalProperties4;
  type: string;
  title: string;
}
interface AdditionalProperties4 {
  additionalProperties: AdditionalProperties3;
  type: string;
}
interface AdditionalProperties3 {
  additionalProperties: AdditionalProperties2;
  type: string;
}
interface AdditionalProperties2 {
  items: Items;
  type: string;
}
interface HTTPValidationError {
  properties: Properties6;
  type: string;
  title: string;
}
interface Properties6 {
  detail: Schema2;
}
interface GameResponse {
  properties: Properties5;
  type: string;
  required: string[];
  title: string;
}
interface Properties5 {
  game: Items;
  teams: Games;
  location: Location;
  divisions: Games;
  team_statistics: Games;
  team_ids_ranked_by_division: Teamidsrankedbydivision;
}
interface Teamidsrankedbydivision {
  additionalProperties: AdditionalProperties;
  type: string;
  title: string;
}
interface AdditionalProperties {
  items: AnyOf;
  type: string;
}
interface Location {
  anyOf: AnyOf3[];
}
interface AnyOf3 {
  '$ref'?: string;
  type?: string;
}
interface GameIdsAndRounds {
  properties: Properties4;
  type: string;
  required: string[];
  title: string;
}
interface Properties4 {
  round: Schema3;
  game_ids: Gameids;
}
interface Gameids {
  items: AnyOf;
  type: string;
  title: string;
}
interface GameExport {
  properties: Properties3;
  type: string;
  required: string[];
  title: string;
}
interface Properties3 {
  id: Schema3;
  round_id: Schema3;
  home_team_id: Hometeamid;
  away_team_id: Hometeamid;
  officiating_team_id: Hometeamid;
  datetime: Datetime;
  location_id: Hometeamid;
  is_accepting_scores: Schema3;
  home_team_score: Hometeamscore;
  away_team_score: Hometeamscore;
}
interface Hometeamscore {
  anyOf: AnyOf2[];
  title: string;
}
interface AnyOf2 {
  type: string;
  minimum?: number;
}
interface Datetime {
  type: string;
  format: string;
  title: string;
}
interface Hometeamid {
  anyOf: AnyOf[];
  title: string;
}
interface AnyOf {
  type: string;
}
interface DivisionExport {
  properties: Properties2;
  type: string;
  required: string[];
  title: string;
}
interface Properties2 {
  id: Schema3;
  name: Schema5;
}
interface AdminResponse {
  properties: Properties;
  type: string;
  required: string[];
  title: string;
}
interface Properties {
  games: Games;
  teams: Games;
  locations: Games;
  game_ids_and_rounds: Schema2;
}
interface Games {
  additionalProperties: Items;
  type: string;
  title: string;
}
interface Paths {
  '/divisions/': Divisions;
  '/divisions/{division_id}/': Divisionsdivisionid;
  '/teams/': Divisions;
  '/teams/{team_id}/': Divisionsdivisionid;
  '/games/': Divisions;
  '/games/{game_id}/': Divisionsdivisionid;
  '/games/{game_id}/score/': Gamesgameidscore;
  '/games/{game_id}/is-accepting-scores/': Gamesgameidisacceptingscores;
  '/locations/': Divisions;
  '/locations/{location_id}/': Divisionsdivisionid;
  '/seeding-parameters/': Divisions;
  '/seeding-parameters/{seeding_parameter_id}/': Divisionsdivisionid;
  '/tournaments/': Divisions;
  '/tournaments/{tournament_id}/': Divisionsdivisionid;
  '/tournament-games/': Divisions;
  '/tournament-games/{tournament_game_id}/': Divisionsdivisionid;
  '/visits/': Divisions;
  '/visits/{visit_id}/': Divisionsdivisionid;
  '/pages/': Pages;
  '/pages/team/{team_slug}/': Pagesteamteamslug;
  '/pages/schedule/': Pages;
  '/pages/game/{game_id}/': Divisionsdivisionid;
  '/pages/standings/': Pages;
  '/pages/admin/': Pages;
}
interface Pagesteamteamslug {
  get: Get4;
}
interface Get4 {
  tags: string[];
  summary: string;
  operationId: string;
  parameters: Parameter3[];
  responses: Responses2;
}
interface Parameter3 {
  name: string;
  in: string;
  required: boolean;
  schema: Schema5;
}
interface Schema5 {
  type: string;
  minLength: number;
  maxLength: number;
  title: string;
}
interface Pages {
  get: Get3;
}
interface Get3 {
  tags: string[];
  summary: string;
  operationId: string;
  responses: Responses4;
}
interface Responses4 {
  '200': _422;
}
interface Gamesgameidisacceptingscores {
  patch: Patch2;
}
interface Patch2 {
  tags: string[];
  summary: string;
  operationId: string;
  parameters: Parameter2[];
  requestBody: RequestBody;
  responses: Responses2;
}
interface Gamesgameidscore {
  patch: Patch;
}
interface Patch {
  tags: string[];
  summary: string;
  operationId: string;
  parameters: Parameter2[];
  requestBody: RequestBody;
  responses: Responses3;
}
interface Responses3 {
  '200': _2002;
  '422': _422;
}
interface _2002 {
  description: string;
  content: Content3;
}
interface Content3 {
  'application/json': Applicationjson3;
}
interface Applicationjson3 {
  schema: Schema4;
}
interface Schema4 {
}
interface RequestBody {
  required: boolean;
  content: Content2;
}
interface Divisionsdivisionid {
  get: Get2;
}
interface Get2 {
  tags: string[];
  summary: string;
  operationId: string;
  parameters: Parameter2[];
  responses: Responses2;
}
interface Responses2 {
  '200': _422;
  '422': _422;
}
interface Parameter2 {
  name: string;
  in: string;
  required: boolean;
  schema: Schema3;
}
interface Schema3 {
  type: string;
  title: string;
}
interface Divisions {
  get: Get;
}
interface Get {
  tags: string[];
  summary: string;
  operationId: string;
  parameters: Parameter[];
  responses: Responses;
}
interface Responses {
  '200': _200;
  '422': _422;
}
interface _422 {
  description: string;
  content: Content2;
}
interface Content2 {
  'application/json': Applicationjson2;
}
interface Applicationjson2 {
  schema: Items;
}
interface _200 {
  description: string;
  content: Content;
}
interface Content {
  'application/json': Applicationjson;
}
interface Applicationjson {
  schema: Schema2;
}
interface Schema2 {
  type: string;
  items: Items;
  title: string;
}
interface Items {
  '$ref': string;
}
interface Parameter {
  name: string;
  in: string;
  required: boolean;
  schema: Schema;
  description: string;
}
interface Schema {
  type: string;
  maximum?: number;
  minimum: number;
  description: string;
  default: number;
  title: string;
}
interface Info {
  title: string;
  version: string;
}