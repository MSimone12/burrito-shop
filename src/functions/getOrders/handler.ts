import { SchemaAPIGatewayProxyEvent, error, formatJSONResponse, resolver } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { CreateOrder } from 'src/interface';
import service from 'src/service/order';

const createOrder : SchemaAPIGatewayProxyEvent<CreateOrder> = async () => 
    resolver()
      .then(() => service.getOrders())
      .then(orders => formatJSONResponse({ orders }))
      .catch(err => error(err))


export const main = middyfy(createOrder)