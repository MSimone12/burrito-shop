import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

export type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: S }
export type SchemaAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult> 
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<FromSchema<S>>, APIGatewayProxyResult>

export const error = (message: string | object | undefined, httpCode : number = 400) : APIGatewayProxyResult => {
  console.log(message)
  return {
    statusCode: httpCode,
    body: JSON.stringify({
      message
    }),
  }
}

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export const resolver = () : Promise<void> => new Promise((resolve) => resolve())