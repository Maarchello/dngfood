import {post} from "./HttpWrapper";
import {Constants} from "./Constants";

const TOKEN_KEY = 'tkn';

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(t) {
    localStorage.setItem(TOKEN_KEY, t);
}

export async function authenticate(initData, callback) {
    await post(`${Constants.BASE_URL}/api/v1/auth/tg?client=true`, JSON.stringify({initData: initData}), (token) => {
        setToken(token);
        callback(token);
    });
}

export async function introspect(token, callback) {
    await post(`${Constants.BASE_URL}/api/v1/auth/token/introspect`,null, callback)
}
