import { useEffect, useRef, useState } from 'react';

function useLongPress({
  isMouseHover = false,
  duration = 250,
}: {
  isMouseHover?: boolean;
  duration?: number;
}) {
  const [isLongPress, setIsLongPress] = useState(false);
  const timeoutId = useRef<number | null>(null);

  function start() {
    if (isMouseHover) {
      timeoutId.current = setTimeout(() => {
        setIsLongPress(true);
      }, duration);
    }
  }

  function clear() {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
      setIsLongPress(false);
    }
  }

  useEffect(() => {
    window.addEventListener('mousedown', start);
    window.addEventListener('mouseup', clear);

    return () => {
      window.removeEventListener('mousedown', start);
      window.removeEventListener('mouseup', clear);
    };
  }, [isMouseHover]);

  return isLongPress;
}

export { useLongPress };
