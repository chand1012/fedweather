// get the number of seconds until 10 after the next hour
export const getSecondsUntilNextHour = () => {
  const now = new Date();
  const nextHour = new Date(now);
  nextHour.setHours(now.getHours() + 1);
  nextHour.setMinutes(10);
  nextHour.setSeconds(0);
  nextHour.setMilliseconds(0);
  return (nextHour.getTime() - now.getTime()) / 1000;
}
