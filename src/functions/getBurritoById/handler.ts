import { error, formatJSONResponse, resolver } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import service from 'src/service/burrito';

const validate = ({pathParameters} : APIGatewayProxyEvent) => {
  if(!pathParameters) throw 'id is required'
}

const getBurritoById : Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event) => 
    resolver()
      .then(() => validate(event))
      .then(() => service.getBurritoById(event.pathParameters.id))
      .then(res => formatJSONResponse({ burrito: res }))
      .catch(err => error(err))


export const main = middyfy(getBurritoById)