import type { FeatureResponse } from "./types";

export const geocode = async (city: string, env: Env): Promise<[number, number]> => {
  const key = city.replace(/\s/g, "").toLowerCase();
  const value = await env.KV.get(key);
  if (value) {
    return JSON.parse(value);
  }

  const resp = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(city as string)}`);
  const data = (await resp.json()) as FeatureResponse;

  // get the first feature geometry coordinates
  const coordinates = data.features[0].geometry.coordinates;
  // store the coordinates in the KV store
  await env.KV.put(key, JSON.stringify(coordinates));
  return coordinates;
}
