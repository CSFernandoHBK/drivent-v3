import faker from "@faker-js/faker";
import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

export async function createTicketTypeRemote() {
    return prisma.ticketType.create({
      data: {
        name: faker.name.findName(),
        price: faker.datatype.number(),
        isRemote: true,
        includesHotel: false,
      },
    });
}

export async function createTicketTypeNotHotel() {
    return prisma.ticketType.create({
      data: {
        name: faker.name.findName(),
        price: faker.datatype.number(),
        isRemote: false,
        includesHotel: false,
      },
    });
}

export async function createTicketTypeWithHotel() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: false,
      includesHotel: true,
    },
  });
}

export async function createHotel(){
  return prisma.hotel.create({
    data:{
      name: faker.commerce.product(),
      image: faker.internet.url(),
      updatedAt: faker.date.recent()
    }
  })
}

export async function createHotelRoom(hotelId: number){
  return prisma.room.create({
    data: {
      name: faker.commerce.product(),
      capacity: 2,
      hotelId: hotelId,
      updatedAt: faker.date.recent()
    }
  })
}