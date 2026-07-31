"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "./icons";

type Weather = {
  temperature: number;
  apparent: number;
  wind: number;
  code: number;
  updated: string;
};

const weatherLabels: Record<number, string> = {
  0: "Clear",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Freezing fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Heavy showers",
  95: "Thunderstorms",
};

export function WeatherCard({ compact = false }: { compact?: boolean }) {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const endpoint =
      "https://api.open-meteo.com/v1/forecast?latitude=46.82559&longitude=-113.33945&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FDenver";

    fetch(endpoint, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Weather unavailable");
        return response.json();
      })
      .then((data) => {
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          apparent: Math.round(data.current.apparent_temperature),
          wind: Math.round(data.current.wind_speed_10m),
          code: data.current.weather_code,
          updated: data.current.time,
        });
      })
      .catch((error) => {
        if (error.name !== "AbortError") setFailed(true);
      });

    return () => controller.abort();
  }, []);

  if (compact) {
    return (
      <div className="text-[#f8f6f1]">
        <p className="label-type text-[0.62rem] font-semibold tracking-[0.17em] text-white/50 uppercase lg:text-[0.65rem] lg:tracking-[0.2em]">
          At Garnet · 6,000 ft
        </p>
        {weather ? (
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0 lg:gap-x-3">
            <span className="display-type text-3xl font-bold lg:text-4xl">
              {weather.temperature}°
            </span>
            <span className="text-[0.65rem] leading-4 text-white/65 lg:text-xs">
              {weatherLabels[weather.code] ?? "Mountain weather"} · {weather.wind} mph wind
            </span>
          </div>
        ) : (
          <p className="mt-2 text-xs text-white/60">
            {failed ? "Weather unavailable—check before leaving." : "Reading mountain weather…"}
          </p>
        )}
      </div>
    );
  }

  return (
    <article className="group relative min-h-[32rem] overflow-hidden bg-[#0e1c27] p-7 text-[#f8f6f1] md:p-10">
      <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full border border-[#d3b350]/20 transition-transform duration-700 group-hover:scale-125" />
      <div className="absolute -right-5 top-5 h-24 w-24 rounded-full bg-[#d3b350]/10 blur-2xl transition-transform duration-700 group-hover:-translate-x-6 group-hover:translate-y-6" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <p className="label-type text-[0.68rem] font-semibold tracking-[0.22em] text-[#d3b350] uppercase">
            Live at Garnet
          </p>
          <span className="h-2 w-2 rounded-full bg-[#d3b350] shadow-[0_0_0_6px_rgba(211,179,80,.12)]" />
        </div>

        {weather ? (
          <div className="my-10">
            <p className="display-type text-[7rem] leading-none font-bold tracking-[-0.06em]">
              {weather.temperature}°
            </p>
            <p className="mt-3 text-sm text-white/65">
              {weatherLabels[weather.code] ?? "Mountain weather"} · Feels like {weather.apparent}°
            </p>
            <p className="mt-1 text-sm text-white/45">{weather.wind} mph wind · Elevation ~6,000 ft</p>
          </div>
        ) : (
          <div className="my-10">
            <p className="display-type text-4xl font-bold">
              {failed ? "Conditions unavailable" : "Reading the mountain…"}
            </p>
            <p className="mt-3 text-sm text-white/55">
              Elevation ~6,000 ft. Weather here can differ sharply from Missoula.
            </p>
          </div>
        )}

        <a
          href="https://forecast.weather.gov/MapClick.php?lat=46.82559&lon=-113.33945"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between border-t border-white/15 pt-5 text-[0.68rem] font-bold tracking-[0.14em] uppercase"
        >
          Full mountain forecast
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
    </article>
  );
}
