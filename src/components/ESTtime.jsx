import { useState, useEffect } from "react";

export default function ESTtime() {
  const [nycTime, setNYCTime] = useState(null);
  const [dayWeek, setDayWeek] = useState(null);
  const [dayYear, setDayYear] = useState(null);

  useEffect(() => {
    const fetchNYCTime = async () => {
      try {
        const response = await fetch(
          "https://worldtimeapi.org/api/timezone/America/New_York"
        );
        const data = await response.json();
        const datetime = new Date(data.utc_datetime);
        const dayweek = data.day_of_week;
        const dayyear = data.day_of_year;
        setNYCTime(datetime);
        setDayWeek(dayweek);
        setDayYear(dayyear);
      } catch (error) {
        console.error("Error fetching NYC time:", error);
      }
    };

    fetchNYCTime();

    const interval = setInterval(() => {
      fetchNYCTime();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Display loading state until time is fetched
  if (!nycTime) {
    return <div>Loading... </div>;
  }

  const openingTime = { hours: 9, minutes: 30 };
  const closingTime = { hours: 16, minutes: 0 };

  const formattedTime = nycTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "America/New_York",
  });

  const holidays2024 = [2, 15, 50, 96, 148, 169, 184, 247, 326, 358];

  const isHoliday = holidays2024.includes(dayYear);
  const isWeekend = dayWeek === 6 || dayWeek === 0;
  const isFridayBeforeOpening =
    dayWeek === 5 && nycTime.getHours() < openingTime.hours;

  const isOpeningTime =
    nycTime.getHours() === openingTime.hours &&
    nycTime.getMinutes() >= openingTime.minutes;

  const isWeekdayOpen =
    nycTime.getHours() > openingTime.hours &&
    nycTime.getHours() < closingTime.hours;

  const status = isHoliday
    ? "Holiday"
    : isWeekend
    ? "Weekend"
    : isFridayBeforeOpening
    ? "Closed"
    : isOpeningTime || isWeekdayOpen
    ? "Open"
    : "Closed";

  return (
    <div className="flex">
      <div className="flex-initial">
        {formattedTime} NYC{" "}
        <span className={status === "Open" ? "text-green-600" : "text-red-600"}>
          {status}
        </span>
      </div>
      <div className="flex-grow text-right">
        {status === "Open"
          ? `Closes @ ${closingTime.hours}:${closingTime.minutes} NYC`
          : `Opens 09:30 NYC${isWeekend ? " Monday" : ""}`}
      </div>
    </div>
  );
}
