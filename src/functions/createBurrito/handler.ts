import { SchemaAPIGatewayProxyEvent, error, formatJSONResponse, resolver } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Prisma } from '@prisma/client';
import service from 'src/service/burrito';

interface CreateBurrito {
  name: string
  variations?: CreateBurritoVariations[]
  optionals?: CreateBurritoOptionals[]
  ingredients?: string[]
}

interface CreateBurritoVariations {
  size: string
  price: number
}

interface CreateBurritoOptionals {
  name: string
  price: number
}

const assembleCreateInput = (body : CreateBurrito) : Prisma.BurritoCreateInput => {
  Prisma.validator<CreateBurrito>()(body)

  const params  : Prisma.BurritoCreateInput = {
    name: body.name,
  }

  if(body.variations) {
    params.variations = {
      create: body.variations
    }
  }

  if(body.optionals) {
    params.optionals = {
      create: body.optionals
    }
  }

  if(body.ingredients) {
    params.ingredients = {
      create: body.ingredients.map(name => ({ name }))
    }
  }

  return params
}


const createBurrito : SchemaAPIGatewayProxyEvent<CreateBurrito> = async (event) => 
    resolver()
      .then(() => assembleCreateInput(event.body))
      .then((body) => service.createBurrito(body))
      .then(res => formatJSONResponse(res))
      .catch(err => error(err))


export const main = middyfy(createBurrito)