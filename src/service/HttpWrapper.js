import {authenticate, getToken} from "./AuthService";

async function refreshToken() {
    await authenticate(window.Telegram.WebApp.initData, (token) => {
        console.log('success refresh token')
    })
}
async function handleErrors(response) {
    if (response.status === 401) {
        await refreshToken();
    }

    return response;
}
export async function getAsJson(url, callback) {

    const requestOptions = {
        headers: {
            'ngrok-skip-browser-warning': 'anyValueHere',
            'Authorization': `Bearer ${getToken()}`
        },
    };

    fetch(url, requestOptions)
        .then((res) => handleErrors(res))
        .then((res) => res.json())
        .then((data) => {
            callback(data);
        }).catch((err) => {
        console.log(err);
    });
}

export function getAsText(url, callback) {
    const requestOptions = {
        headers: {'ngrok-skip-browser-warning': 'anyValueHere',
            'Authorization': `Bearer ${getToken()}`},
    };

    fetch(url, requestOptions)
        .then((res) => handleErrors(res))
        .then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .then((data) => {
            callback(data);
        }).catch((err) => {
        console.log(err);
    });
}

export function post(url, body, callback) {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}`},
        body: body
    };

    fetch(url, requestOptions)
        .then((res) => handleErrors(res))
        .then((res) => res.text())
        .then((data) => {
            callback(data);
        }).catch((err) => {
        console.log(err);
    });
}

export function patch(url, body, callback) {

    const requestOptions = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}`},
        body: body
    };

    fetch(url, requestOptions)
        .then((res) => handleErrors(res))
        .then((res) => res.text())
        .then((data) => {
            callback(data);
        }).catch((err) => {
        console.log(err);
    });
}


export function del(url, callback) {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${getToken()}`}
    };

    fetch(url, requestOptions)
        .then((res) => handleErrors(res))
        .then((res) => res.text())
        .then((data) => {
            callback(data);
        }).catch((err) => {
        console.log(err);
    });
}

