import db, { BurritoResponse } from '../db/burrito'
import { Prisma } from "@prisma/client";

const createBurrito = async (body : Prisma.BurritoCreateInput) : Promise<BurritoResponse> => {
    const burrito = await db.createBurrito(body)

    return burrito
}

const getBurritos = async () : Promise<BurritoResponse[]> => db.getBurritos()

const getBurritoById = async (id: string) : Promise<BurritoResponse> => db.getBurritoById(id)

export default {
    createBurrito,
    getBurritos,
    getBurritoById
}