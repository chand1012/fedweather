import type { FeatureResponse } from "./types";

export const geocode = async (city: string): Promise<[number, number]> => {

  const resp = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(city as string)}`);
  const data = (await resp.json()) as FeatureResponse;

  // get the first feature geometry coordinates
  const coordinates = data.features[0].geometry.coordinates;
  return coordinates;
}
