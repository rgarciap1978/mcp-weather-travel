import { getAirportsResource } from "../resources/index.js";

interface FlightArgs {
    from: string;
    to: string;
    date: string;
}

interface Flights {
    airline: string,
    flightNumber: string,
    departure: string,
    arrival: string,
    price: number,
    duration: string
}

export async function searchFlights(args:FlightArgs) {
    const { from, to, date } = args;

    const mockFlights: Flights[] = [
      {
        airline: 'LATAM',
        flightNumber: 'LTM1234',
        departure: '08:30',
        arrival: '10:45',
        price: 45000,
        duration: '2h 5m'
      },
      {
        airline: 'Sky Airline',
        flightNumber: 'SKY5678',
        departure: '08:45',
        arrival: '11:00',
        price: 40000,
        duration: '2h 15m'
      },
      {
        airline: 'JetSmart',
        flightNumber: 'JTS9012',
        departure: '09:00',
        arrival: '12:45',
        price: 42500,
        duration: '3h 45m'
      }
    ];

    await new  Promise(resolve => setTimeout(resolve, 500));

    return {
        content: [{
            type: 'text',
            text: JSON.stringify(mockFlights.map(flight => ({
                ...flight,
                price: Math.round(flight.price * (0.8 + Math.random() * 0.4))
            })), null, 2)
        }]
    };
}