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

export function cancelOrder(orderId, callback) {
    post(`${baseUrl}/api/orders/${orderId}/cancel`, null, callback);
}

export function orderReceived(orderId, callback) {
    post(`${baseUrl}/api/orders/${orderId}/received`, null, callback);
}

export function orderNotReceived(orderId, callback) {
    post(`${baseUrl}/api/orders/${orderId}/not-received`, null, callback);
}

export function refundOrder(orderId, callback) {
    post(`${baseUrl}/api/orders/${orderId}/refund`, null, callback);
}

export async function getMenuItems(restId, callback) {
    await getAsJson(`${baseUrl}/api/restaurants/${restId}/menu`, callback)
}