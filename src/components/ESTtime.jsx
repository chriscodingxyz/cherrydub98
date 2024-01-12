import { useState, useEffect } from "react";

const getFormattedTime = (datetime) => {
  return datetime.split("T")[1].substring(0, 5);
};

const isOpeningTime = (formattedTime, openingTime, closingTime) => {
  return formattedTime >= openingTime && formattedTime < closingTime;
};

export default function ESTtime() {
  const [time, setTime] = useState(null);
  const [dayWeek, setDayWeek] = useState(null);
  const [dayYear, setDayYear] = useState(null);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch(
          "https://worldtimeapi.org/api/timezone/America/New_York"
        );
        const data = await response.json();
        const { datetime, day_of_week, day_of_year } = data;
        setTime(datetime);
        setDayWeek(day_of_week);
        setDayYear(day_of_year);
      } catch (error) {
        console.error("Error fetching time:", error);
      }
    };

    fetchTime();

    const interval = setInterval(() => {
      fetchTime();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Display loading state until time is fetched
  if (!time) {
    return <div>Loading... </div>;
  }

  const formattedTime = getFormattedTime(time);
  const openingTime = "09:30";
  const closingTime = "16:00";

  const isHoliday = [2, 15, 50, 96, 148, 169, 184, 247, 326, 358].includes(
    dayYear
  );
  const isWeekend = dayWeek === 6 || dayWeek === 0;
  const isBeforeOpening = formattedTime < openingTime;
  const isDuringOpening = isOpeningTime(
    formattedTime,
    openingTime,
    closingTime
  );
  const isBeforeFriday = dayWeek < 4;
  const isFridayBeforeOpening = dayWeek === 5 && formattedTime < openingTime;

  // Console logs for troubleshooting
  console.clear();
  console.log("Formatted Time:", formattedTime);
  console.log("Holiday:", isHoliday);
  console.log("Weekend:", isWeekend);
  console.log("Before Opening:", isBeforeOpening);
  console.log("During Opening:", isDuringOpening);
  console.log("Before Friday:", isBeforeFriday);
  console.log("Friday Before Opening:", isFridayBeforeOpening);

  return (
    <div className="flex">
      <div className="flex-initial">
        {formattedTime} NYC{" "}
        <span className={isDuringOpening ? "text-green-600" : "text-red-600"}>
          {isHoliday
            ? "Holiday"
            : isWeekend
            ? "Weekend"
            : isBeforeOpening
            ? "Closed"
            : isDuringOpening
            ? "Open"
            : "Closed"}
        </span>
      </div>
      <div className="flex-grow text-right">
        {isDuringOpening
          ? `Closes @ ${closingTime} NYC`
          : isWeekend
          ? `Opens 09:30 NYC Monday`
          : isBeforeFriday || isFridayBeforeOpening
          ? `Opens 09:30 NYC`
          : `Opens 09:30 NYC Monday`}
      </div>
    </div>
  );
}
