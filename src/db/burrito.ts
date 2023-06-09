import { Prisma, PrismaClient, Burrito, BurritoVariation, Ingredients, OptionalIngredient } from "@prisma/client";
import { SchemaInput } from "src/interface";

const client : PrismaClient = new PrismaClient()

export type BurritoResponse = Burrito & {
  variations?: BurritoVariation[];
  ingredients?: Ingredients[];
  optionals?: OptionalIngredient[];
}

const createBurrito = async (burrito: SchemaInput<Prisma.BurritoCreateInput>) : Promise<BurritoResponse> => {
  const brrt = await client.burrito.create({ 
    data: burrito, 
    include: {
      variations: true,
      ingredients: true,
      optionals: true,
    }
  })

  return brrt
}

const getBurritoById = async (id : string) : Promise<BurritoResponse> => {
  const burrito = await client.burrito.findFirst({
    where: { id: Number(id) },
    select: {
      variations: true,
      optionals: true,
      ingredients: true,
      id: true,
      name: true,
    }
  })

  if(!burrito) {
    throw 'Burrito not found'
  }

  return burrito
}

const getBurritoVariationById = async (id : string) : Promise<BurritoVariation> => {
  const variation = await client.burritoVariation.findFirst({
    where: { id: Number(id) },
    select: {
      id: true,
      price: true,
      size: true,
      burritoId: true,
    }
  })

  if(!variation) {
    throw 'Burrito Variation not found'
  }

  return variation
}

const getOptionalById = async (id : string) : Promise<OptionalIngredient> => {
  const variation = await client.optionalIngredient.findFirst({
    where: { id: Number(id) },
    select: {
      id: true,
      price: true,
      name: true,
    }
  })

  if(!variation) {
    throw 'Burrito Variation not found'
  }

  return variation
}

const getBurritos = async () : Promise<BurritoResponse[]> => client.burrito.findMany({ 
  select: { 
    id: true, 
    name: true, 
    variations: true, 
    ingredients: true, 
    optionals: true, 
  },
})

export default {
  createBurrito,
  getBurritoById,
  getBurritos,
  getBurritoVariationById,
  getOptionalById,
}
