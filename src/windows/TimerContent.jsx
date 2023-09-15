import React, { useState, useEffect } from "react";

export default function TimerContent({ duration, beepIntervals }) {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [timerStarted, setTimerStarted] = useState(false);
  const [textColor, setTextColor] = useState("black");

  useEffect(() => {
    let interval = null;
    if (timerStarted && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerStarted, timeRemaining]);

  useEffect(() => {
    if (beepIntervals.includes(timeRemaining)) {
      // Play beep sound or trigger any desired action
      triggerEffect();
      setTextColor("blue");
    }
  }, [timeRemaining, beepIntervals]);

  useEffect(() => {
    if (timeRemaining === 0) {
      // Play beep sound or trigger any desired action when timer is done
      triggerEffect();
      console.log("Timer Done!");
    }
  }, [timeRemaining]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatInterval = (interval) => {
    const minutes = Math.floor(interval / 60);
    const seconds = interval % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const triggerEffect = () => {
    // Perform the desired effect here
    // For example, you can use CSS classes to apply visual effects
    // or trigger animations using a library like Framer Motion
    console.log("Effect triggered!");
  };

  const startTimer = () => {
    setTimerStarted(true);
    setTextColor("red");
  };

  const pauseTimer = () => {
    setTimerStarted(false);
  };

  const resetTimer = () => {
    setTimeRemaining(duration);
    setTimerStarted(false);
    setTextColor("black");
  };

  return (
    <div>
      <div>
        <h2 style={{ color: textColor }}>{formatTime(timeRemaining)}</h2>
      </div>
      <div>
        {/* <h4> @ {beepIntervals.map(formatInterval).join(", ")}</h4> */}
      </div>
      {!timerStarted && (
        <>
          <button onClick={startTimer}>Start Timer</button>
          <button onClick={resetTimer}>Reset Timer</button>
        </>
      )}
      {timerStarted && (
        <>
          <button onClick={pauseTimer}>Pause Timer</button>
        </>
      )}
    </div>
  );
}
