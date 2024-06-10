# FedWeather API

FedWeather is an API that enables users to access weather data from the National Weather Service (NWS) with just a single API call. It leverages the Cloudflare Workers platform to provide efficient and scalable API endpoints.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Follow these instructions to setup and deploy the FedWeather API.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v16.13.0 or later)
- [Cloudflare Wrangler](https://developers.cloudflare.com/workers/wrangler/get-started/) (v3.0.0 or later)

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/fedweather.git
   cd fedweather
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Cloudflare Wrangler by adding your Cloudflare account credentials. Follow the Cloudflare Wrangler [configuration guide](https://developers.cloudflare.com/workers/wrangler/configuration/).

### Usage

- To start the development server:

  ```bash
  npm run dev
  ```

- To deploy the API:

  ```bash
  npm run deploy
  ```

## API Endpoints

### Get Weather Forecast

- **Endpoint:** `/`
- **Method:** `GET`

#### Query Parameters

- `city` (string, optional if specifying latitude and longitude): The name of the city to get the weather forecast for.
- `lat` (number, required if specifying longitude): Latitude coordinate for geolocation.
- `lng` (number, required if specifying latitude): Longitude coordinate for geolocation.

#### Example Request

- By City:

  ```
  GET /?city=San Francisco
  ```

- By Coordinates:

  ```
  GET /?lat=37.7749&lng=-122.4194
  ```

#### Example Response

```json
{
  "properties": {
    "updated": "2024-06-10T11:21:45+00:00",
    "units": "us",
    "forecastGenerator": "BaselineForecastGenerator",
    "generatedAt": "2024-06-10T14:22:01+00:00",
    "updateTime": "2024-06-10T11:21:45+00:00",
    "validTimes": "2024-06-10T05:00:00+00:00/P7DT20H",
    "elevation": { "unitCode": "wmoUnit:m", "value": 2.1336 },
    "periods": [
      {
        "number": 1,
        "name": "Today",
        "startTime": "2024-06-10T10:00:00-04:00",
        "endTime": "2024-06-10T18:00:00-04:00",
        "isDaytime": true,
        "temperature": 74,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "probabilityOfPrecipitation": { "unitCode": "wmoUnit:percent", "value": null },
        "dewpoint": { "unitCode": "wmoUnit:degC", "value": 11.11111111111111 },
        "relativeHumidity": { "unitCode": "wmoUnit:percent", "value": 54 },
        "windSpeed": "10 mph",
        "windDirection": "W",
        "icon": "https://api.weather.gov/icons/land/day/bkn?size=medium",
        "shortForecast": "Partly Sunny",
        "detailedForecast": "Partly sunny, with a high near 74. West wind around 10 mph."
      },
      {
        "number": 2,
        "name": "Tonight",
        "startTime": "2024-06-10T18:00:00-04:00",
        "endTime": "2024-06-11T06:00:00-04:00",
        "isDaytime": false,
        "temperature": 63,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "probabilityOfPrecipitation": { "unitCode": "wmoUnit:percent", "value": null },
        "dewpoint": { "unitCode": "wmoUnit:degC", "value": 12.222222222222221 },
        "relativeHumidity": { "unitCode": "wmoUnit:percent", "value": 68 },
        "windSpeed": "5 to 8 mph",
        "windDirection": "NW",
        "icon": "https://api.weather.gov/icons/land/night/bkn?size=medium",
        "shortForecast": "Mostly Cloudy",
        "detailedForecast": "Mostly cloudy, with a low around 63. Northwest wind 5 to 8 mph."
      },
    ],
  }
}
```

### Error Response

- **Status:** `400 Bad Request`
- **Example Response:**

```json
{
  "error": "Missing city query parameter"
}
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
