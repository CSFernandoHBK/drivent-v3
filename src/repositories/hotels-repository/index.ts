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

async function getHotel(hotelId: number) {
    return prisma.hotel.findFirst({
        where:{
            id: hotelId
        }
    })
}

const hotelsRepository = {
    getAllHotels,
    getRoomsFromHotel,
    getHotel
}

export default hotelsRepository;