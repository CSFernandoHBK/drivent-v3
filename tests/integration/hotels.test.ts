import app, { init } from "@/app";
import { prisma } from "@/config";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers";
import * as jwt from "jsonwebtoken";
import httpStatus from "http-status";
import faker from "@faker-js/faker";
import { createEnrollmentWithAddress, createTicket, createTicketType, createUser } from "../factories";
import { TicketStatus } from "@prisma/client";
import { createHotel, createHotelRoom, createTicketTypeNotHotel, createTicketTypeRemote, createTicketTypeWithHotel } from "../factories/hotels-factory";

const server = supertest(app);

beforeAll(async () => {
    await init();
});
  
beforeEach(async () => {
    await cleanDb();
});


describe("GET /hotels", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.get("/tickets/types");

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    
    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();
    
        const response = await server.get("/tickets/types").set("Authorization", `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    
    it("should respond with status 401 if there is no session for given token", async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.get("/tickets/types").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe("when token is valid", () => {
        it("should respond with 404 if there is no enrollment, ticket or hotel", async ()=> {
            const user = await createUser();
            const token = await generateValidToken(user);
            const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`)
            expect(response.status).toEqual(404)
        })

        it("should respond with 402 if ticket is remote", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketTypeRemote();
            const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
            const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`)
            expect(response.status).toEqual(402)
        })

        it("should respond with 402 if ticket not include hotel", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketTypeNotHotel();
            const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
            const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`)
            expect(response.status).toEqual(402)
        })

        it("should respond with 200 and hotels list", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const hotel = await createHotel();
            const ticketType = await createTicketTypeWithHotel();
            const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`)
            expect(response.status).toEqual(200)
            expect(response.body).toEqual(
                expect.arrayContaining([
                  expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    image: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                  })
                ])
            )
        })
    })
    

})

describe("GET /hotels/:hotelId", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.get("/tickets/types");

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    
    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();
    
        const response = await server.get("/tickets/types").set("Authorization", `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    
    it("should respond with status 401 if there is no session for given token", async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.get("/tickets/types").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe("when token is valid", () => {
        it("should respond with 404 if there is no enrollment, ticket or hotel", async ()=> {
            const user = await createUser();
            const token = await generateValidToken(user);
            const response = await server.get("/hotels/").set("Authorization", `Bearer ${token}`)
            expect(response.status).toEqual(404)
        })

        it("should respond with 402 if ticket is remote", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketTypeRemote();
            const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
            const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`)
            expect(response.status).toEqual(402)
        })

        it("should respond with 402 if ticket not include hotel", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketTypeNotHotel();
            const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
            const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`)
            expect(response.status).toEqual(402)
        })

        it("should respond with 200 and rooms data", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const hotel = await createHotel();
            const room = await createHotelRoom(hotel.id)
            const ticketType = await createTicketTypeWithHotel();
            const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            const response = await server.get(`/hotels/${hotel.id}`).set("Authorization", `Bearer ${token}`)
            expect(response.status).toEqual(200)
            expect(response.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    image: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    rooms: expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                            capacity: expect.any(Number),
                            hotelId: expect.any(Number),
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String),
                        })
                    ])
                })
            )
        })
    })
    

})