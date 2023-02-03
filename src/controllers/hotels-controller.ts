import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
    try{
        const hotels = await hotelsService.getAllHotels()
        return res.send(hotels)
    } catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

export async function getRoomsFromHotel(req: AuthenticatedRequest, res: Response) {
    const {hotelId} = req.params;

    try{
        const rooms = await hotelsService.getRoomsFromHotel(Number(hotelId))
        return res.status(200).send(rooms)
    } catch(err){
        console.log(err)
        return res.status(500).send(err)
    } 
}

