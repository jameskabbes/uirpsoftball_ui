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
  DivisionExport: DivisionExport;
  GameExport: GameExport;
  GameIdsAndRounds: GameIdsAndRounds;
  GameResponse: GameResponse;
  HTTPValidationError: HTTPValidationError;
  HomeResponse: HomeResponse;
  LocationExport: LocationExport;
  ScheduleResponse: ScheduleResponse;
  ScoreUpdate: ScoreUpdate;
  SeedingParameterExport: SeedingParameterExport;
  StandingsResponse: StandingsResponse;
  TeamExport: TeamExport;
  TeamResponse: TeamResponse;
  TournamentExport: DivisionExport;
  TournamentGameExport: TournamentGameExport;
  ValidationError: ValidationError;
  VisitExport: VisitExport;
}
interface VisitExport {
  properties: Properties16;
  type: string;
  required: string[];
  title: string;
}
interface Properties16 {
  id: Schema3;
  datetime: Datetime;
  path: Schema3;
}
interface ValidationError {
  properties: Properties15;
  type: string;
  required: string[];
  title: string;
}
interface Properties15 {
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
  properties: Properties14;
  type: string;
  required: string[];
  title: string;
}
interface Properties14 {
  game_id: Schema3;
  tournament_id: Hometeamid;
  bracket_id: Schema3;
  round: Schema3;
  home_team_filler: Hometeamid;
  away_team_filler: Hometeamid;
}
interface TeamResponse {
  properties: Properties13;
  type: string;
  required: string[];
  title: string;
}
interface Properties13 {
  games: Teams;
  teams: Teams;
  locations: Teams;
  games_known_ids: Gameids;
  games_unknown_ids: Gameids;
  team_id: Schema3;
  division: Items;
  featured_game_id: Hometeamid;
}
interface TeamExport {
  properties: Properties12;
  type: string;
  required: string[];
  title: string;
}
interface Properties12 {
  id: Schema3;
  name: Schema5;
  division_id: Hometeamid;
  slug: Schema5;
  color: Color;
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
  properties: Properties11;
  type: string;
  required: string[];
  title: string;
}
interface Properties11 {
  teams: Teams;
}
interface SeedingParameterExport {
  properties: Properties10;
  type: string;
  required: string[];
  title: string;
}
interface Properties10 {
  id: Schema3;
  parameter: Schema5;
  name: Schema5;
}
interface ScoreUpdate {
  properties: Properties9;
  type: string;
  title: string;
}
interface Properties9 {
  home_team_score: Hometeamscore;
  away_team_score: Hometeamscore;
}
interface ScheduleResponse {
  properties: Properties8;
  type: string;
  required: string[];
  title: string;
}
interface Properties8 {
  games: Teams;
  teams: Teams;
  locations: Teams;
  tournaments: Schema2;
}
interface LocationExport {
  properties: Properties7;
  type: string;
  required: string[];
  title: string;
}
interface Properties7 {
  id: Schema3;
  name: Schema5;
  link: Schema5;
  short_name: Schema5;
  time_zone: Schema5;
}
interface HomeResponse {
  properties: Properties6;
  type: string;
  required: string[];
  title: string;
}
interface Properties6 {
  games: Teams;
  teams: Teams;
  locations: Teams;
  game_ids_and_rounds: Schema2;
  divisions: Teams;
  division_ids_ordered: Gameids;
}
interface HTTPValidationError {
  properties: Properties5;
  type: string;
  title: string;
}
interface Properties5 {
  detail: Schema2;
}
interface GameResponse {
  properties: Properties4;
  type: string;
  required: string[];
  title: string;
}
interface Properties4 {
  game: Items;
  teams: Teams;
  location: Location;
}
interface Location {
  anyOf: AnyOf3[];
}
interface AnyOf3 {
  $ref?: string;
  type?: string;
}
interface Teams {
  additionalProperties: Items;
  type: string;
  title: string;
}
interface GameIdsAndRounds {
  properties: Properties3;
  type: string;
  required: string[];
  title: string;
}
interface Properties3 {
  round: Schema3;
  game_ids: Gameids;
}
interface Gameids {
  items: AnyOf;
  type: string;
  title: string;
}
interface GameExport {
  properties: Properties2;
  type: string;
  required: string[];
  title: string;
}
interface Properties2 {
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
  properties: Properties;
  type: string;
  required: string[];
  title: string;
}
interface Properties {
  id: Schema3;
  name: Schema5;
}
interface Paths {
  '/divisions/': Divisions;
  '/divisions/{division_id}/': Divisionsdivisionid;
  '/teams/': Divisions;
  '/teams/{team_id}/': Divisionsdivisionid;
  '/games/': Divisions;
  '/games/{game_id}/': Divisionsdivisionid;
  '/games/{game_id}/score/': Gamesgameidscore;
  '/games/assign-matchups/': Gamesassignmatchups;
  '/games/reprocess-all-scores/': Gamesassignmatchups;
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
interface Gamesassignmatchups {
  post: Post;
}
interface Post {
  tags: string[];
  summary: string;
  operationId: string;
  responses: Responses3;
}
interface Responses3 {
  '200': _2002;
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
interface Schema4 {}
interface Gamesgameidscore {
  patch: Patch;
}
interface Patch {
  tags: string[];
  summary: string;
  operationId: string;
  parameters: Parameter2[];
  requestBody: RequestBody;
  responses: Responses2;
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
  $ref: string;
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
