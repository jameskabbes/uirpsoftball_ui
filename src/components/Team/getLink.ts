import { paths, operations, components } from '../../openapi_schema_client';

export function getLink(team: components['schemas']['TeamExport']): string {
  return `/teams/${team.slug}`;
}
