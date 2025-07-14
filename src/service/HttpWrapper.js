import {authenticate, getToken} from "./AuthService";

async function refreshToken() {
    await authenticate(window.Telegram.WebApp.initData, (token) => {
        console.log('success refresh token')
    })
}

async function fetchWithAuth(url, options = {}) {
    // Собираем заголовки (в том числе свежий токен)
    options.headers = {
        ...options.headers,
        'ngrok-skip-browser-warning': 'anyValueHere',
        'Authorization': `Bearer ${getToken()}`,
    };

    let response = await fetch(url, options);

    if (response.status === 401) {
        // Если токен протух — обновляем и пробуем ещё раз
        await refreshToken();
        options.headers['Authorization'] = `Bearer ${getToken()}`;
        response = await fetch(url, options);
    }

    return response;
}
export async function getAsJson(url, callback) {

    try {
        const res = await fetchWithAuth(url);
        if (!res.ok) {
            return;
        }
        const data = await res.json();
        callback(data);
    } catch (err) {
        console.error(err);
    }
}

export async function getAsText(url, callback) {
    try {
        const res = await fetchWithAuth(url);
        if (!res.ok) {
            return;
        }
        let data = await res.text();
        if (data.length) {
            data = JSON.stringify(data)
        } else {
            data = {}
        }

        callback(data);
    } catch (err) {
        console.error(err);
    }

}

export async function post(url, body, callback) {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body
    };

    try {
        const res = await fetchWithAuth(url, requestOptions);
        if (!res.ok) {
            return;
        }
        const data = await res.text();
        callback(data);
    } catch (err) {
        console.error(err);
    }
}

export async function postJson(url, body, callback) {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body
    };

    try {
        const res = await fetchWithAuth(url, requestOptions);
        if (!res.ok) {
            return;
        }
        const data = await res.json();
        callback(data);
    } catch (err) {
        console.error(err);
    }
}

export async function patch(url, body, callback) {

    const requestOptions = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: body
    };

    try {
        const res = await fetchWithAuth(url, requestOptions);
        if (!res.ok) {
            return;
        }
        const data = await res.text();
        callback(data);
    } catch (err) {
        console.error(err);
    }
}


export async function del(url, callback) {

    const requestOptions = {
        method: 'DELETE'
    };

    try {
        const res = await fetchWithAuth(url, requestOptions);
        if (!res.ok) {
            return;
        }
        const data = await res.text();
        callback(data);
    } catch (err) {
        console.error(err);
    }
}

