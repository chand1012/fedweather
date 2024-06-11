import type { NWSPointsResponse } from "./types";
import { getForecastTTL } from "./utils";

const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:126.0) Gecko/20100101 Firefox/126.0',
}

export const getPoint = async (coords: [number, number]) => {
  const [lng, lat] = coords;
  const resp = await fetch(`https://api.weather.gov/points/${lat.toFixed(2)},${lng.toFixed(2)}`, { headers });
  const data = await resp.json();
  return data as NWSPointsResponse;
};

export const getForecast = async (coords: [number, number], env: Env) => {
  // first check if the forecast is cached.
  const forecastKey = coords.join(',') + "-forecast";
  const forecast = await env.KV.get(forecastKey);
  if (forecast) {
    return JSON.parse(forecast);
  }
  // then check the cache to see if the forecast URL for those coordinates is already stored
  const key = coords.join(',') + "-url";
  let forecastURL = await env.KV.get(key);
  if (!forecastURL) {
    const pointData = await getPoint(coords);
    forecastURL = pointData.properties.forecast;
    // store the forecast URL in the cache
    await env.KV.put(key, forecastURL);
  }
  const resp = await fetch(forecastURL, { headers });
  const data = await resp.json();
  // store the forecast data in the cache
  await env.KV.put(forecastKey, JSON.stringify(data), {
    expirationTtl: getForecastTTL(),
  });
  return data;
}

export const getHourlyForecast = async (coords: [number, number], env: Env) => {
  const hourlyKey = coords.join(',') + "-hourly";
  const hourly = await env.KV.get(hourlyKey);
  if (hourly) {
    return JSON.parse(hourly);
  }

  const key = coords.join(',') + "-hourly-url";
  let forecastURL = await env.KV.get(key);
  if (!forecastURL) {
    const pointData = await getPoint(coords);
    forecastURL = pointData.properties.forecastHourly;
    await env.KV.put(key, forecastURL);
  }

  const resp = await fetch(forecastURL, { headers });
  const data = await resp.json();
  await env.KV.put(hourlyKey, JSON.stringify(data), {
    expirationTtl: getForecastTTL(),
  });
  return data;
}
