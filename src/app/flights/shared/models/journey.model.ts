import { Flight } from "./flight.model";

export interface Journey {
    Flights: Flight[],
    Origin: string,
    Destination: string,
    Price: number
}