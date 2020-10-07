import { useEffect, useState } from "react";
import { DEFAULT_TIMEOUT_TIME } from "../../../../variables.static.js";

export default (ipv4, ipv4Saved) => {
  const [tor, setUsesTor] = useState(null);
  const [timeoutTime, setTimeoutTime] = useState(1);
  const [timeout, trackTimeout] = useState(undefined);
  useEffect(() => {
    if (!timeout) {
      trackTimeout(
        setTimeout(async () => {
          if (ipv4 && ipv4Saved !== ipv4) {
            const { torInUse } = await (
              await fetch("/check/ipv4/tor-in-use", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ ipv4 }),
              })
            ).json();
            setUsesTor(torInUse);
            if (timeoutTime !== DEFAULT_TIMEOUT_TIME) {
              setTimeoutTime(DEFAULT_TIMEOUT_TIME);
            }
          }
          trackTimeout(clearTimeout(timeout));
        }, timeoutTime)
      );
    }
  }, [
    ipv4,
    ipv4Saved,
    tor,
    setUsesTor,
    trackTimeout,
    timeout,
    timeoutTime,
    setTimeoutTime,
  ]);
  return tor;
};
