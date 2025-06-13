// const baseUrl = 'http://localhost:8080';
import {getAsJson, post} from "./HttpWrapper";

// const baseUrl = 'https://tops-mudfish-logically.ngrok-free.app';
const baseUrl = 'https://dngfood.tmcn.io';
export const filesUrl = `${baseUrl}/api/files?path=`;

export async function getUserOrders(callback) {
    await getAsJson(`${baseUrl}/api/orders?sort=createdAt,desc`, callback);
}

export async function getOrderById(orderId, callback) {
    await getAsJson(`${baseUrl}/api/orders/${orderId}`, callback);
}

export async function getRestaurants(callback) {
    await getAsJson(`${baseUrl}/api/restaurants`, callback)
}

export function makeOrder(payload, callback) {
    post(`${baseUrl}/api/orders`, JSON.stringify(payload), callback)
}

export async function getMenuItems(restId, callback) {
    await getAsJson(`${baseUrl}/api/restaurants/${restId}/menu`, callback)
}