export interface Order {
    _id?:string,
    user?: string
    cart?: number,
    totalCost?: number,
    items?: any,
    address?: string,
    paymentId?: string,
}
