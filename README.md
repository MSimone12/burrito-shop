# Burrito Shop

Welcome!
This is a Typescript Node JS Serverless application for running a burrito shop!

Below you'll find all the necessary steps to run the application locally.


## Dependencies 

- Docker
- Docker Compose
- node/npm
- serverless

## Installation

Run `npm i` or `yarn`

## Initialization

```bash
sh scripts/start.sh
```

## Routes

| ID | Method | Route | File | Description |
|----|--------|-------|------|-------------|
| 1 | `GET` | `/orders` | `src/functions/getOrders/handler.ts` | Fetch all orders |
| 2 | `POST` | `/order` | `src/functions/createOrder/handler.ts` | Create an order (payload below) |
| 3 | `GET` | `/order/{id}` | `src/functions/getOrderById/handler.ts` | Get an order by id |
| 4 | `GET` | `/burritos` | `src/functions/getBurritos/handler.ts` | Get all burritos |
| 5 | `POST` | `/burrito` | `src/functions/createBurrito/handler.ts` | Creates a burrito (payload below) |
| 6 | `GET` | `/burrito/{id}` | `src/functions/getBurritoById/handler.ts` | Get a burrito by id |

### Payloads

#### createBurrito:

```json
{
    "name": "Meatless Burrito",
    "variations": [
        {
            "size": "SM",
            "price": 500
        },
        {
            "size": "MD",
            "price": 1000
        },
        {
            "size": "LG",
            "price": 1500
        }
    ],
    "optionals": [
        {
            "name": "Sour Cream",
            "price": 500 // always in cents
        },
        {
            "name": "Black Olive",
            "price": 250
        }
    ],
    "ingredients": [
        "beans",
        "meatless meat",
        "sauce"
    ]
}
```

#### createOrder:

```json
{
    "items": [
        {
            "burritoId": 3, // the previously created burrito
            "variationId": 4, // the chosen variation
            "quantity": 2,
            "optionals": [1, 3] // only the optionals id's
        }
    ]
}
```

## Disclaimer

This is a _ready-to-deploy_ application, missing only few parameters to ship it to aws, the **Serverless Framework** does all the boring stuff for us.
