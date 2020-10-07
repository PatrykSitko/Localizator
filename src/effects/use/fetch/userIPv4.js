import { useEffect, useState } from "react";
import { DEFAULT_TIMEOUT_TIME } from "../../../variables.static.js";

export default () => {
  const [ipv4, setIPv4] = useState(null);
  const [timeoutTime, setTimeoutTime] = useState(1);
  const [timeout, trackTimeout] = useState(undefined);
  useEffect(() => {
    if (!timeout) {
      trackTimeout(
        setTimeout(async () => {
          try {
            const { ip } = await (
              await fetch("https://api.ipify.org/?format=json")
            ).json();
            if (ip !== ipv4) {
              setIPv4(ip);
            }
            if (timeoutTime !== DEFAULT_TIMEOUT_TIME) {
              setTimeoutTime(DEFAULT_TIMEOUT_TIME);
            }
          } catch (err) {
            console.error(err);
          } finally {
            trackTimeout(clearTimeout(timeout));
          }
        }, timeoutTime)
      );
    }
  }, [ipv4, setIPv4, timeoutTime, setTimeoutTime, trackTimeout, timeout]);
  return ipv4;
};
