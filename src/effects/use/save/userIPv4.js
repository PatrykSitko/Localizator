import { useEffect, useState } from "react";
import { DEFAULT_TIMEOUT_TIME } from "../../../variables.static.js";

export default (ipv4) => {
  const [savedIPv4, setSavedIPv4] = useState(null);
  const [timeoutTime, setTimeoutTime] = useState(1);
  const [timeout, trackTimeout] = useState(undefined);
  useEffect(() => {
    if (!timeout) {
      trackTimeout(
        setTimeout(async () => {
          if (ipv4) {
            const { saved } = await (
              await fetch("/save/ipv4", {
                method: "PUT",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ ipv4 }),
              })
            ).json();
            if (savedIPv4 !== saved) {
              setSavedIPv4(saved);
            }
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
    savedIPv4,
    setSavedIPv4,
    timeoutTime,
    setTimeoutTime,
    timeout,
    trackTimeout,
  ]);
  return savedIPv4;
};
