import hotelsRepository from "@/repositories/hotels-repository";


async function getAllHotels() {
    const hotels = await hotelsRepository.getAllHotels()
    return(hotels)
}

async function getRoomsFromHotel() {
    
}

const hotelsService = {
    getAllHotels,
    getRoomsFromHotel
}

export default hotelsService;