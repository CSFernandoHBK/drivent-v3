import { prisma } from "@/config";

async function getAllHotels() {
    return prisma.hotel.findMany()
}

async function getRoomsFromHotel() {
    
}

const hotelsRepository = {
    getAllHotels,
    getRoomsFromHotel
}

export default hotelsRepository;