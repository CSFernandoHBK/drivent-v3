import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
    try{

    } catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

export async function getRoomsFromHotel(req: AuthenticatedRequest, res: Response) {
    try{

    } catch(err){
        console.log(err)
        return res.status(500).send(err)
    } 
}

