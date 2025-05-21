import { useMediaQuery } from './useMediaQuery';

function useIsMobile(): boolean {
  return !useMediaQuery('(min-width: 640px');
}

export { useIsMobile };
