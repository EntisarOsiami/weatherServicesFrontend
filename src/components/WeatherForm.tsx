import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  MapPin,
  Search,
  Loader2,
  Thermometer,
  Droplets,
  Wind,
  Eye,
} from 'lucide-react';
import { getCurrentWeather, type WeatherData } from '../services/weather';

interface WeatherFormProps {
  onWeatherFetched?: (data: WeatherData) => void;
}

function WeatherForm({
  onWeatherFetched,
}: WeatherFormProps): React.JSX.Element {
  const [coord, setCoord] = useState({
    lat: '',
    lon: '',
  });
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getWeather = async () => {
    const lat = parseFloat(coord.lat);
    const lon = parseFloat(coord.lon);

    setLoading(true);
    setError(null);

    try {
      const data: WeatherData = await getCurrentWeather(lat, lon);
      setWeatherData(data);
      onWeatherFetched?.(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'failed to get weather data'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getWeather();
  };

  const formatTemp = (temp: number) => `${Math.round(temp)}°C`;

  const getSourceColor = (source: string) => {
    return source === 'cache'
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight flex items-center gap-3'>
          <MapPin className='h-8 w-8 text-primary' />
          Get Weather Data
        </h1>
        <p className='text-muted-foreground'>
          Enter let and lot to get weather information
        </p>
      </div>

      <Card>
        <CardContent className='pt-6'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='latitude'>Latitude</Label>
                <Input
                  id='latitude'
                  type='number'
                  placeholder='e.g. 40.71'
                  value={coord.lat}
                  onChange={(e) =>
                    setCoord((prev) => ({ ...prev, lat: e.target.value }))
                  }
                  disabled={loading}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='longitude'>Longitude</Label>
                <Input
                  id='longitude'
                  type='number'
                  placeholder='e.g. -74.00'
                  value={coord.lon}
                  onChange={(e) =>
                    setCoord((prev) => ({ ...prev, lon: e.target.value }))
                  }
                  disabled={loading}
                />
              </div>
            </div>
            <div className='flex justify-center'>
              <Button
                type='submit'
                disabled={loading || !coord.lat || !coord.lon}
                className='w-full sm:w-auto'>
                {loading ? (
                  <Loader2 className='h-4 w-4 animate-spin mr-2' />
                ) : (
                  <Search className='h-4 w-4 mr-2' />
                )}
                Get Weather
              </Button>
            </div>

            {error && (
              <div className='text-sm text-destructive bg-destructive/10 p-3 rounded-md'>
                {error}
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {weatherData && (
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <CardTitle className='flex items-center gap-2'>
                  <MapPin className='h-5 w-5 text-muted-foreground' />
                  {weatherData.data.location}
                </CardTitle>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium gap-1 ${getSourceColor(
                  weatherData.source
                )}`}>
                <Eye className='h-3 w-3' />
                {weatherData.source}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 gap-4'>
              <div className='col-span-2 flex items-center space-x-4 p-4 bg-primary/5 rounded-lg'>
                <Thermometer className='h-10 w-10 text-primary flex-shrink-0' />
                <div className='min-w-0 flex-1'>
                  <p className='text-3xl font-bold'>
                    {formatTemp(weatherData.data.temperature)}
                  </p>
                  <p className='text-sm text-muted-foreground capitalize truncate'>
                    {weatherData.data.description}
                  </p>
                </div>
              </div>

              <div className='flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg'>
                <Droplets className='h-8 w-8 text-blue-600 flex-shrink-0' />
                <div className='min-w-0 flex-1'>
                  <p className='text-xl font-semibold'>
                    {weatherData.data.humidity}%
                  </p>
                  <p className='text-xs text-muted-foreground'>Humidity</p>
                </div>
              </div>

              <div className='flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg'>
                <Wind className='h-8 w-8 text-green-600 flex-shrink-0' />
                <div className='min-w-0 flex-1'>
                  <p className='text-xl font-semibold'>
                    {weatherData.data.windSpeed} m/s
                  </p>
                  <p className='text-xs text-muted-foreground'>Wind Speed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default WeatherForm;
