import { useQuery } from '@tanstack/react-query'

// Function to get formatted time from datetime
const getFormattedTime = datetime => {
  return datetime.split('T')[1].substring(0, 5)
}

// Function to check if the current time is within opening hours
const isOpeningTime = (formattedTime, openingTime, closingTime) => {
  return formattedTime >= openingTime && formattedTime < closingTime
}

// Function to check if a date is a US market holiday
const isMarketHoliday = date => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const dayOfWeek = date.getDay()

  // New Year's Day (January 1st, or next Monday if weekend)
  if (month === 0 && day === 1) return true
  if (month === 0 && day === 2 && dayOfWeek === 1) return true // Monday after New Year's
  if (month === 0 && day === 3 && dayOfWeek === 1) return true // Monday after New Year's weekend

  // Martin Luther King Jr. Day (Third Monday in January)
  if (month === 0 && dayOfWeek === 1) {
    const mondayCount = Math.floor((day - 1) / 7) + 1
    if (mondayCount === 3) return true
  }

  // Presidents' Day (Third Monday in February)
  if (month === 1 && dayOfWeek === 1) {
    const mondayCount = Math.floor((day - 1) / 7) + 1
    if (mondayCount === 3) return true
  }

  // Good Friday (Friday before Easter - complex calculation)
  const easter = getEasterDate(year)
  const goodFriday = new Date(easter)
  goodFriday.setDate(easter.getDate() - 2)
  if (month === goodFriday.getMonth() && day === goodFriday.getDate())
    return true

  // Memorial Day (Last Monday in May)
  if (month === 4 && dayOfWeek === 1) {
    const nextWeek = new Date(date)
    nextWeek.setDate(day + 7)
    if (nextWeek.getMonth() !== 4) return true // Last Monday if next Monday is June
  }

  // Juneteenth (June 19th, observed on Monday if weekend)
  if (month === 5 && day === 19) return true
  if (month === 5 && day === 20 && dayOfWeek === 1) return true // Monday after
  if (month === 5 && day === 21 && dayOfWeek === 1) return true // Monday after weekend

  // Independence Day (July 4th, observed on Monday if weekend)
  if (month === 6 && day === 4) return true
  if (month === 6 && day === 5 && dayOfWeek === 1) return true // Monday after
  if (month === 6 && day === 3 && dayOfWeek === 5) return true // Friday before

  // Labor Day (First Monday in September)
  if (month === 8 && dayOfWeek === 1 && day <= 7) return true

  // Thanksgiving (Fourth Thursday in November)
  if (month === 10 && dayOfWeek === 4) {
    const thursdayCount = Math.floor((day - 1) / 7) + 1
    if (thursdayCount === 4) return true
  }

  // Christmas Day (December 25th, observed on Monday if weekend)
  if (month === 11 && day === 25) return true
  if (month === 11 && day === 26 && dayOfWeek === 1) return true // Monday after
  if (month === 11 && day === 24 && dayOfWeek === 5) return true // Friday before

  return false
}

// Function to calculate Easter date (for Good Friday)
const getEasterDate = year => {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

// Function to check if it's an early close day (1:00 PM ET)
const isEarlyCloseDay = date => {
  const month = date.getMonth()
  const day = date.getDate()
  const dayOfWeek = date.getDay()

  // Day after Thanksgiving (Black Friday)
  if (month === 10 && dayOfWeek === 5) {
    const thanksgiving = new Date(date)
    thanksgiving.setDate(day - 1)
    if (thanksgiving.getDay() === 4) {
      const thursdayCount = Math.floor((thanksgiving.getDate() - 1) / 7) + 1
      if (thursdayCount === 4) return true // Fourth Thursday
    }
  }

  // Christmas Eve (December 24th, if it's a weekday)
  if (month === 11 && day === 24 && dayOfWeek >= 1 && dayOfWeek <= 5)
    return true

  return false
}

// Fetch time data function
const fetchTimeData = async () => {
  const response = await fetch(
    'https://worldtimeapi.org/api/timezone/America/New_York'
  )
  if (!response.ok) {
    throw new Error('Failed to fetch time data')
  }
  return response.json()
}

export default function ESTtime () {
  // Use TanStack Query with 12-hour caching
  const {
    data: timeData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['nyc-time'],
    queryFn: fetchTimeData,
    staleTime: 12 * 60 * 60 * 1000, // 12 hours
    gcTime: 12 * 60 * 60 * 1000, // 12 hours
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes (much less frequent)
    refetchOnWindowFocus: false, // Don't refetch on focus
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  })

  // Display loading state until time is fetched
  if (isLoading) {
    return <div>Loading... </div>
  }

  // Display error state
  if (isError || !timeData) {
    return <div>Time unavailable</div>
  }

  const { datetime, day_of_week: dayWeek, day_of_year: dayYear } = timeData

  // Get formatted time, opening time, and closing time
  const formattedTime = getFormattedTime(datetime)
  const currentDate = new Date(datetime)
  const openingTime = '09:30'
  const closingTime = '16:00'
  const earlyClosingTime = '13:00'

  // Define conditions for weekend, holidays, and during opening hours
  const isWeekend = dayWeek === 6 || dayWeek === 0
  const isHoliday = isMarketHoliday(currentDate)
  const isEarlyClose = isEarlyCloseDay(currentDate)
  const actualClosingTime = isEarlyClose ? earlyClosingTime : closingTime

  const isDuringOpening =
    isWeekend || isHoliday
      ? false // Weekends and holidays are closed
      : isOpeningTime(formattedTime, openingTime, actualClosingTime)

  // Define conditions for special cases
  const isBeforeFriday = dayWeek < 4
  const isFridayBeforeOpening = dayWeek === 5 && formattedTime < openingTime

  // Determine market status text
  let statusText = 'Closed'
  let statusColor = 'text-red-600'

  if (isDuringOpening) {
    statusText = 'Open'
    statusColor = 'text-green-600'
  } else if (isWeekend) {
    statusText = 'Weekend Close'
  } else if (isHoliday) {
    statusText = 'Holiday Close'
  } else if (isEarlyClose && formattedTime >= earlyClosingTime) {
    statusText = 'Early Close'
  }

  // Determine next opening message
  let nextOpeningText = ''
  if (isDuringOpening) {
    nextOpeningText = `Closes @ ${actualClosingTime} NYC`
  } else if (isWeekend) {
    nextOpeningText = `Opens 09:30 NYC Monday`
  } else if (isHoliday) {
    nextOpeningText = `Opens next trading day`
  } else if (isBeforeFriday || isFridayBeforeOpening) {
    nextOpeningText = `Opens 09:30 NYC`
  } else {
    nextOpeningText = `Opens 09:30 NYC Monday`
  }

  return (
    <div className='space-y-0'>
      <div className='flex'>
        <div className='flex-initial'>
          NYSE {formattedTime} NYC{' '}
          <span className={statusColor}>{statusText}</span>
        </div>
      </div>
      <div className='text-[10px] text-gray-400'>{nextOpeningText}</div>
    </div>
  )
}
