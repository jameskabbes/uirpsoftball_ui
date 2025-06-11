import { paths, operations, components } from '../../openapi_schema_client';

export function getLink(game: components['schemas']['GameExport']): string {
  return `/games/${game.id}`;
}
