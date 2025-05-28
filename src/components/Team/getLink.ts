import { paths, operations, components } from '../../openapi_schema';

export function getLink(team: components['schemas']['TeamExport']): string {
  return `/teams/${team.slug}`;
}
