import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import ticketService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try{
        const ticket = await ticketService.getTicketByUserId(Number(userId))
        if(!ticket){
            return res.status(404).send(httpStatus.NOT_FOUND)
        } 
        if(ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel){
            return res.status(402).send(httpStatus["402_MESSAGE"])
        }
        const hotels = await hotelsService.getAllHotels()
        return res.send(hotels)
    } catch(err){
        if(err.name === "NotFoundError"){
            return res.status(404).send(err.message)
        }
        return res.status(500).send("deu erro")
    }
}

export async function getRoomsFromHotel(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const {hotelId} = req.params;

    try{
        const ticket = await ticketService.getTicketByUserId(Number(userId))
        if(!ticket){
            return res.status(404).send(httpStatus.NOT_FOUND)
        } 
        if(ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel){
            return res.status(402).send(httpStatus["402_MESSAGE"])
        }
        const rooms = await hotelsService.getRoomsFromHotel(Number(hotelId))
        return res.status(200).send(rooms)
    } catch(err){
        if(err.name === "NotFoundError"){
            return res.status(404).send(err.message)
        }
        return res.status(500).send(httpStatus["500_MESSAGE"])
    } 
}

