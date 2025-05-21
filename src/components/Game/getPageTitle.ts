import { paths, operations, components } from '../../openapi_schema';

function getPageTitle(game: components['schemas']['Game-Input']): string {
  return 'Game ' + game.id;
}

export { getPageTitle };
