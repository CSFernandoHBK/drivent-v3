import hotelsRepository from "@/repositories/hotels-repository";

async function getAllHotels(): Promise<Hotel[]> {
    const result = await hotelsRepository.getAllHotels()
    return(result)
}

async function getRoomsFromHotel(hotelId: number){
    const rooms: Room[] = await hotelsRepository.getRoomsFromHotel(hotelId);
    const hotel: Hotel = await hotelsRepository.getHotel(hotelId);
    const result = hotel;
    result.rooms = rooms;
    return(result)
}


export type Room = {
    "id": number,
    "name": string,
    "capacity": number,
    "hotelId": number,
    "createdAt": (Date | string),
    "updatedAt": (Date | string)
}

export type Hotel = {
    "id": number,
    "name": string,
    "image": string,
    "createdAt": Date,
    "updatedAt": Date,
    rooms?: Room[]; 
}

const hotelsService = {
    getAllHotels,
    getRoomsFromHotel,
}

export default hotelsService;