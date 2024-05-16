import { DealInterface } from "../../interfaces/dealInterface"

export const addToCart = (product: DealInterface) => {
    return {
        type: 'ADD_TO_CART',
        payload: product
    }
}

export const removeFromCart = (productID: number) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: productID
    }
}

export const adjustQty = (productID: number, value: number) => {
    return {
        type: 'ADJUST_QTY',
        payload: {
            id: productID,
            qty: value
        }
    }
}