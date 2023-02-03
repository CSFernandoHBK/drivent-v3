import { prisma } from "@/config";

async function getAllHotels() {
    return prisma.hotel.findMany()
}

async function getRoomsFromHotel(hotelId: number) {
    return prisma.room.findMany({
        where: {
            hotelId: hotelId
        }
    })
}

const hotelsRepository = {
    getAllHotels,
    getRoomsFromHotel
}

export default hotelsRepository;