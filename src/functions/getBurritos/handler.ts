import { SchemaAPIGatewayProxyEvent, error, formatJSONResponse, resolver } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Burrito } from '@prisma/client';
import service from 'src/service/burrito';

const getBurritos : SchemaAPIGatewayProxyEvent<Burrito> = async () => 
    resolver()
      .then(() => service.getBurritos())
      .then(res => formatJSONResponse({ burritos: res }))
      .catch(err => error(err))


export const main = middyfy(getBurritos)