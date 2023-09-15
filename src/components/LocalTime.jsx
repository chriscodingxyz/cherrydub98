import { useState, useEffect } from "react";

export default function LocalTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time
    .toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .toUpperCase();

  return <div className="">{formattedTime}</div>;
}
