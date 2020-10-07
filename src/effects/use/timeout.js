import { useEffect, useState } from "react";

export default (trigger, TimeoutTimeMs) => {
  const [timedOut, setTimedOut] = useState(false);
  const [timeoutTimer, setTimeoutTimer] = useState(undefined);
  useEffect(() => {
    if (trigger && !timedOut && !timeoutTimer) {
      setTimeoutTimer(
        setTimeout(() => {
          setTimedOut(true);
          setTimeoutTimer(clearTimeout(timeoutTimer));
        }, TimeoutTimeMs)
      );
    }
  }, [
    trigger,
    TimeoutTimeMs,
    timedOut,
    setTimedOut,
    timeoutTimer,
    setTimeoutTimer,
  ]);
  return timedOut;
};
