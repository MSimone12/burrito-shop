import { error, formatJSONResponse, resolver } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import service from 'src/service/order';

const validate = ({pathParameters} : APIGatewayProxyEvent) => {
  if(!pathParameters) throw 'id is required'
}

const getOrderById : Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event) => 
    resolver()
      .then(() => validate(event))
      .then(() => service.getOrderById(event.pathParameters.id))
      .then(order => formatJSONResponse({ order }))
      .catch(err => error(err))


export const main = middyfy(getOrderById)