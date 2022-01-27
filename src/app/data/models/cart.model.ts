export interface Cart {
    _id?:string,
    items?: any,
    totalQty?: number,
    totalCost?: number,
    user?: string,
    productId?:string
}
