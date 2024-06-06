import type { NWSPointsResponse } from "./types";

const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:126.0) Gecko/20100101 Firefox/126.0',
}

export const getPoint = async (coords: [number, number]) => {
  const [lng, lat] = coords;
  const resp = await fetch(`https://api.weather.gov/points/${lat.toFixed(2)},${lng.toFixed(2)}`, { headers });
  const data = await resp.json();
  return data as NWSPointsResponse;
};

export const getForecast = async (coords: [number, number]) => {
  const pointData = await getPoint(coords);
  const forecastURL = pointData.properties.forecast;
  const resp = await fetch(forecastURL, { headers });
  const data = await resp.json();
  return data;
}
