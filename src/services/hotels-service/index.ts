import hotelsRepository from "@/repositories/hotels-repository";
import { type } from "os";


async function getAllHotels(): Promise<Hotel[]> {
    const result = await hotelsRepository.getAllHotels()
    /*const hotels = result.map(async (a) => {
        a.createdAt.toISOString();
        a.updatedAt.toISOString();
    })*/
    return(result)
}

async function getRoomsFromHotel(hotelId: number): Promise<Room[]> {
    const result = await hotelsRepository.getRoomsFromHotel(hotelId);
    /*const rooms = result.map(async (a) => {
        a.createdAt.toISOString();
        a.updatedAt.toISOString();
    })*/
    return(result)
}

export type Room = {
    "id": number,
    "name": string,
    "capacity": number,
    "hotelId": number,
    "createdAt": Date,
    "updatedAt": Date
}

export type Hotel = {
    "id": number,
    "name": string,
    "image": string,
    "createdAt": Date,
    "updatedAt": Date
}

const hotelsService = {
    getAllHotels,
    getRoomsFromHotel
}

export default hotelsService;