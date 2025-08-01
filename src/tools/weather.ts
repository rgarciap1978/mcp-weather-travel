import axios from "axios";

interface WeatherArgs {
  city: string;
  country?: string;
}

interface WeatherData {
	current: {
		temperature: number;
		description: string;
		humidity: number;
		windSpeed: number;
	},
	forecast: Array<{
		date: string;
		temperature: number;
		description: string;
	}>;
}

const cityCoordinates: Record<string, { lat: number; lon: number }> = {
  Santiago: { lat: -33.4489, lon: -70.6693 },
  Valparaíso: { lat: -33.0472, lon: -71.6127 },
  Algarrobo: { lat: -32.7333, lon: -71.6667 },
};

function getWeatherDescription(wmoCode:number): string {
	const descriptions: Record<number, string> = {
		0: "Clear sky",
		1: "Mainly clear",
		2: "Partly cloudy",
		3: "Overcast",
		45: "Foggy",
		48: "Depositing rime fog",
		51: "Light drizzle",
		53: "Moderate drizzle ",
		55: "Dense drizzle",
		61: "Slight rain",
		63: "Moderate rain",
		65: "Heavy rain",
		71: "Slight snow",
		73: "Moderate snow",
		75: "Heavy snow",
		95: "Thunderstorm"
	};
	
	return descriptions[wmoCode] || "Unknown weather condition";
	
}

export async function getWeather(args: WeatherArgs) {
  const { city, country } = args;
	const coords = cityCoordinates[city];
	if (!coords) {
		return {}
		content: [{
			current: {
				temperature: 22,
				description: 'Sunny',
				humidity: 50,
				windSpeed: 10
			},
			forecast: [
				{ date: '2023-10-01', temperature: 20, description: 'Sunny' },
				{ date: '2023-10-02', temperature: 21, description: 'Partly cloudy' },
				{ date: '2023-10-03', temperature: 19, description: 'Rainy' }
			]
		}];
	}
	}

	try {
		const currentResponse = await axios.get(
			`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,windspeed_10m,weather_code&timezone=auto`
		);

		const current = currentResponse.data.current;
		const hourly = currentResponse.data.hourly;

		const forecast = [];
		const today = new Date();
		for (let i = 0; i < 3; i++) {
			const date = new Date(today);
			date.setDate(today.getDate() + i);
			const dateString = date.toISOString().split('T')[0];
			
			const dayTemps = hourly.temperature_2m.filter((_: any, index: number) => {
				const hourDate = new Date(hourly.time[index]);
				return hourDate.toISOString().split('T')[0] === dateString;
			});

			const avgTemp = Math.round(dayTemps.reduce((sum: number, temp: number) => sum + temp, 0) / dayTemps.length);

			const dayWeatherCodes = hourly.weather_code.filter((_: any, index: number) => {
				const hourDate = new Date(hourly.time[index]);
				return hourDate.toISOString().split('T')[0] === dateString;
			});

			const dayWeatherCode = dayWeatherCodes[0];

			forecast.push({
				date: dateString,
				temperature: avgTemp,
				description: getWeatherDescription(dayWeatherCode)	
			});
		}

		const weatherData: WeatherData = {
			current: {
				temperature: Math.round(current.temperature_2m),
				description: getWeatherDescription(current.weather_code),
				humidity: current.relative_humidity_2m,
				windSpeed: current.windspeed_10m
			},
			forecast
		};

		return {
			content: [{
				type: 'text',
				text: JSON.stringify(weatherData, null, 2)
			}]
		}

	} catch (error) {
		console.error("Error fetching weather data:", error);
		throw new Error(`Could not fetch weather data for ${city}`);
	}
}
