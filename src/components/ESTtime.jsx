import { useState, useEffect } from "react";

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
        const datetime = data.datetime;
        const dayweek = data.day_of_week;
        const dayyear = data.day_of_year;
        setTime(datetime);
        setDayWeek(dayweek);
        setDayYear(dayyear);
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

  const formattedTime = time.split("T")[1].substring(0, 5);

  const openingTime = "09:30";
  const closingTime = "16:00";

  //US holidays (non leap years)
  if (
    dayYear === 2 ||
    dayYear === 16 ||
    dayYear === 51 ||
    dayYear === 97 ||
    dayYear === 149 ||
    dayYear === 170 ||
    dayYear === 185 ||
    dayYear === 248 ||
    dayYear === 327 ||
    dayYear === 359
  ) {
    return (
      <div className="flex">
        <div className="flex-initial">
          {formattedTime} EST <span className="text-red-600">Holiday</span>
        </div>
        <div className="flex-grow text-right">Opens @ 9:30 EST</div>
      </div>
    );
  }

  // console.log("day week:", dayWeek);

  //if saturday or sunday
  if (dayWeek === 6 || dayWeek === 0) {
    return (
      <div className="flex">
        <div className="flex-initial">
          {formattedTime} EST <span className="text-red-600">Weekend</span>
        </div>
        <div className="flex-grow text-right">Opens @ 9:30 EST Monday</div>
      </div>
    );
  }

  //if during opening times on weekday
  if (formattedTime >= openingTime && formattedTime < closingTime) {
    return (
      <div className="flex">
        <div className="flex-initial">
          {formattedTime} NYC <span className="text-green-600">Open</span>
        </div>
        <div className="flex-grow text-right">Closes @ 16:00 NYC</div>
      </div>
    );
  }

  //if not between those times and weekday is before friday
  if (dayWeek < 4) {
    return (
      <div className="flex">
        <div className="flex-initial">
          {formattedTime} NYC <span className="text-red-600">Closed</span>
        </div>
        <div className="flex-grow text-right">Opens 09:30 NYC</div>
      </div>
    );
  }

  //friday before opening time
  if (dayWeek === 5 && formattedTime < openingTime) {
    return (
      <div className="flex">
        <div className="flex-initial">
          {formattedTime} NYC <span className="text-red-600">Closed</span>
        </div>
        <div className="flex-grow text-right">Opens 09:30 NYC</div>
      </div>
    );
  }

  //everything else
  return (
    <div className="flex">
      <div className="flex-initial">
        {formattedTime} NYC <span className="text-red-600">Closed</span>
      </div>
      <div className="flex-grow text-right">Opens 09:30 NYC Monday</div>
    </div>
  );
}
