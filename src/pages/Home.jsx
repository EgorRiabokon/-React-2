import { useEffect, useState } from "react";
import useCustomCounter from '../hooks/useCustomCounter'; 

export default function Home() {
  const [weather, setWeather] = useState(null);
  const { count, increment, decrement } = useCustomCounter(0, 1);

  useEffect(() => {
    const coords = "latitude=52.52&longitude=13.41";
    const getWeather = async () => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${coords}&current=temperature_2m,windspeed_10m&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
      );
      const data = await response.json();
      setWeather(data);
    };
    getWeather();
  }, []);

  return (
    <>
      <div>
        <h1>Current Weather</h1>
        {!!weather && <div>{weather.current.temperature_2m} C</div>}
      </div>
      <div>
        <h2>Counter</h2>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </>
  );
}

