import { paths, operations, components } from '../../openapi_schema';

export function getLink(game: components['schemas']['GameExport']): string {
  return `/games/${game.id}`;
}
