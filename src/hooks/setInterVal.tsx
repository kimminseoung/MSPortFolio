import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

interface IUseInterval {
  (callback: () => void, interval: any): void;
}

export const useInterval: IUseInterval = (callback, interval) => {
  const savedCallback = useRef<(() => void) | null>(null);
  const location = useLocation().pathname;

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (location !== "/" || interval !== null) {
      // 만약 delay가 null이거나 Url 경로가 home이 아니면
      let id = setInterval(tick, interval); 
      return () => clearInterval(id); // 
    }
  }, [interval]);
};
