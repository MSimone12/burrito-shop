import { OrderItem, Prisma, PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export interface OrderResponse {
    id: number,
    items?: OrderItem[]
}

const createOrder = async (order : Prisma.OrderCreateInput) => {
    const ordered = await client.order.create({
        data: order,
        select: {
            id: true,
            total: true,
            items: {
                select: {
                    variation: {
                        select: {
                            price: true,
                            size: true
                        }
                    },
                    burrito: {
                        select: {
                            id: true,
                            name: true,
                            ingredients: true
                        }
                    },
                    optionals: true
                }
            },
        }
    })

    return ordered;
}

const getOrders = () => {
    return client.order.findMany({
        select: {
            id: true,
            total: true,
            items: {
                select: {
                    variation: {
                        select: {
                            price: true,
                            size: true
                        }
                    },
                    burrito: {
                        select: {
                            id: true,
                            name: true,
                            ingredients: true
                        }
                    },
                    optionals: {
                        select: {
                            name: true,
                            price: true,
                        }
                    }
                }
            },
        }
    })
}

const getOrderById = (id: string) => {
    return client.order.findFirst({
        where: {
            id: Number(id)
        },
        select: {
            id: true,
            total: true,
            items: {
                select: {
                    variation: {
                        select: {
                            price: true,
                            size: true
                        }
                    },
                    burrito: {
                        select: {
                            id: true,
                            name: true,
                            ingredients: true
                        }
                    },
                    optionals: {
                        select: {
                            name: true,
                            price: true,
                        }
                    }
                }
            },
        } 
    })
}

export default {
    createOrder,
    getOrders,
    getOrderById,
}