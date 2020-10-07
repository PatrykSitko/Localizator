import { useEffect, useState } from "react";

export default (speed) => {
  const [dots, setDots] = useState(".");
  const [timeoutTracker, setTimeoutTracker] = useState(undefined);
  useEffect(() => {
    if (!timeoutTracker) {
      setTimeoutTracker(
        setTimeout(() => {
          switch (dots) {
            default:
              setDots(".");
              break;
            case ".":
              setDots("..");
              break;
            case "..":
              setDots("...");
              break;
          }
          setTimeoutTracker(clearTimeout(timeoutTracker));
        }, speed)
      );
    }
  }, [speed, dots, setDots, timeoutTracker, setTimeoutTracker]);
  return dots;
};
