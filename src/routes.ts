import { AutoRouter, type IRequest, json } from 'itty-router';
import { geocode } from './geocode';
import { getForecast, getHourlyForecast } from './nws';

const router = AutoRouter();

router.get('/', async (req: IRequest, env: Env) => {
  const { city, lat, lng } = req.query;

  if (lat && lng) {
    const forecast = await getForecast([parseFloat(lng as string), parseFloat(lat as string)], env);
    return json(forecast);
  }
  if (!city) {
    return json({ error: 'Missing city query parameter' }, { status: 400 });
  }

  const coords = await geocode(city as string, env);

  const forecast = await getForecast(coords, env);

  return json(forecast);
});

router.get('/hourly', async (req: IRequest, env: Env) => {
  const { city, lat, lng } = req.query;

  if (lat && lng) {
    const hourly = await getHourlyForecast([parseFloat(lng as string), parseFloat(lat as string)], env);
    return json(hourly);
  }
  if (!city) {
    return json({ error: 'Missing city query parameter' }, { status: 400 });
  }

  const coords = await geocode(city as string, env);

  const hourly = await getHourlyForecast(coords, env);

  return json(hourly);
});

router.get('/geocode', async (req: IRequest, env: Env) => {
  const { city } = req.query;
  if (!city) {
    return json({ error: 'Missing city query parameter' }, { status: 400 });
  }
  const coords = await geocode(city as string, env);
  return json({ coords });
});

export default router;
