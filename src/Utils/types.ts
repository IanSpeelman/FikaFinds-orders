export type orderType = {
    id: number,
    user: number,
}

export type orderProduct = {
    id: number,
    order: number,
    product: number,
    amount: number
    price: number
}

export type orderRequest = {
    user: number,
    products: orderProductRequest[]
}

export type orderProductRequest = {
    amount: number,
    product: product

}

export type product = {
    id: number,
    name: string,
    image: string,
    price: number,
    category: string,
    specifications: string,
    description: string,
    stock?: number,
    amount?: number,
    createdAt?: Date
    updatedAt?: Date
}
