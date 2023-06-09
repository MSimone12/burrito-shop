import { SchemaAPIGatewayProxyEvent, error, formatJSONResponse, resolver } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Prisma } from '@prisma/client';
import { CreateOrder } from 'src/interface';
import service from 'src/service/order';


const validateInput = (body : CreateOrder) : void => {
    Prisma.validator<CreateOrder>()(body)
}


const createOrder : SchemaAPIGatewayProxyEvent<CreateOrder> = async (event) => 
    resolver()
      .then(() => validateInput(event.body))
      .then(() => service.createOrder(event.body))
      .then(order => formatJSONResponse({ order }))
      .catch(err => error(err))


export const main = middyfy(createOrder)