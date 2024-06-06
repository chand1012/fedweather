type FeatureGeometry = {
  type: "Point";
  coordinates: [number, number];
};

type FeatureProperties = {
  osm_type: "R" | "N" | "W";
  osm_id: number;
  country: string;
  osm_key: string;
  osm_value: string;
  name: string;
  county: string;
  state: string;
  type: string;
  city?: string;
  postcode?: string;
  locality?: string;
  district?: string;
  street?: string;
  countrycode: string;
  extent?: [number, number, number, number];
};

type Feature = {
  type: "Feature";
  geometry: FeatureGeometry;
  properties: FeatureProperties;
};

export type FeatureResponse = {
  type: "FeatureCollection";
  features: Feature[];
};

export type NWSPointsResponse = {
  "@context": {
    [key: string]: string | {
      "@version": string;
      wx: string;
      s: string;
      geo: string;
      unit: string;
      "@vocab": string;
      geometry: {
        "@id": string;
        "@type": string;
      };
      city: string;
      state: string;
      distance: {
        "@id": string;
        "@type": string;
      };
      bearing: {
        "@type": string;
      };
      value: {
        "@id": string;
      };
      unitCode: {
        "@id": string;
        "@type": string;
      };
      forecastOffice: {
        "@type": string;
      };
      forecastGridData: {
        "@type": string;
      };
      publicZone: {
        "@type": string;
      };
      county: {
        "@type": string;
      };
    };
  };
  id: string;
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    "@id": string;
    "@type": string;
    cwa: string;
    forecastOffice: string;
    gridId: string;
    gridX: number;
    gridY: number;
    forecast: string;
    forecastHourly: string;
    forecastGridData: string;
    observationStations: string;
    relativeLocation: {
      type: "Feature";
      geometry: {
        type: "Point";
        coordinates: [number, number];
      };
      properties: {
        city: string;
        state: string;
        distance: {
          unitCode: string;
          value: number;
        };
        bearing: {
          unitCode: string;
          value: number;
        };
      };
    };
    forecastZone: string;
    county: string;
    fireWeatherZone: string;
    timeZone: string;
    radarStation: string;
  };
};
