import { Prisma } from "@prisma/client"
import db from '../db/order'
import burritoDb from '../db/burrito'
import { CreateOrder } from "src/interface";

const createOrder = async (order: CreateOrder) => {
  console.log(order)
  const assembled = await assembleCreateInput(order)
  return db.createOrder(assembled);
}

const getOrders = () => db.getOrders()

const getOrderById = (id: string) => db.getOrderById(id)

const assembleCreateInput = async (body : CreateOrder) : Promise<Prisma.OrderCreateInput> => {

  const variations = await Promise.all(body.items.map(item => item.variationId.toString()).map(burritoDb.getBurritoVariationById))
  const optionals = await Promise.all(body.items.flatMap(item => item.optionals ?? []).map(id => id.toString()).map(burritoDb.getOptionalById))
  const params : Prisma.OrderCreateInput = {
    items: {
        create: body.items.map(({optionals, ...item}) => {
          const params : Prisma.OrderItemUncheckedCreateWithoutOrderInput = {
            ...item,
          }
          if(optionals) {
            params.optionals = {
              connect: optionals.map(id => ({ id }))
            }
          }
          return params
        })
    },
    total: [...variations, ...optionals].reduce((a, b) => a + b.price, 0),
  }

  return params
}

export default {
    createOrder,
    getOrders,
    getOrderById
}