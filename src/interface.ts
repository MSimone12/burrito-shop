import { OrderItem } from "@prisma/client"

export type SchemaInput<S> = Omit<S, 'id'>

export interface CreateOrder {
    items: CreateOrderItem[]
}

type CreateOrderItem = Omit<OrderItem, 'optionals'> & {
    optionals?: number[]
}
