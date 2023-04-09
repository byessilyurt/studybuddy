// Timer.js
import { useEffect, useState } from "react";
import { formatTime } from "../utils";

const Timer = ({ initialTime, onTimeEnd }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time === 0) {
      onTimeEnd();
      return;
    }

    const timer = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time, onTimeEnd]);

  return <>{formatTime(time)}</>;
};

export default Timer;
