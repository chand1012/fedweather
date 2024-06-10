import { AutoRouter, type IRequest, json } from 'itty-router';
import { geocode } from './geocode';
import { getForecast } from './nws';

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

export default router;
