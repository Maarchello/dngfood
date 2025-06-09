// const baseUrl = 'http://localhost:8080';
const baseUrl = 'https://tops-mudfish-logically.ngrok-free.app';
//const baseUrl = 'https://easybron.ru';

const requestOptions = {
    headers: {'ngrok-skip-browser-warning': 'anyValueHere'},
};

export function getOrderById(orderId, callback) {
    fetch(`${baseUrl}/api/orders/${orderId}`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            callback(data);
        }).catch((err) => {
        console.log(err);
    });
}

export function getRestaurantBookings(managerChatId, date, callback) {

    fetch(`${baseUrl}/api/bookings?managerChatId=${managerChatId}&day=${date}&statuses=NEW,APPROVED`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            callback(data);
        }).catch((err) => {
        console.log(err);
    });
}

export function getRestaurants(callback) {

    fetch(`${baseUrl}/api/restaurants`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            callback(data);
        }).catch((err) => {
        console.log(err);
    });
}

export function getItemById(itemId, callback) {
    fetch(`${baseUrl}/api/items/${itemId}`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            callback(data);
        }).catch((err) => {
        console.log(err);
    });
}

export function getBookingDisableDates(itemId, callback) {
    fetch(`${baseUrl}/api/v1/bookings/disable-dates?itemId=${itemId}`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            callback(data);
        }).catch((err) => {
        console.log(err);
    });
}

export function makeOrder(payload, callback) {
    let json = JSON.stringify(payload);

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: json
    };

    fetch(`${baseUrl}/api/orders`, requestOptions)
        .then(res => callback())
        .catch((err) => {
            console.log(err)
        });
}

export function getMenuItems(restId, callback) {
    fetch(`${baseUrl}/api/restaurants/${restId}/menu`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            callback(data);
        }).catch((err) => {
        console.log(err);
    });
}

export function doBooking(requestBody, callback) {
    let json = JSON.stringify(requestBody);

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: json
    };

    fetch(`${baseUrl}/api/v1/bookings`, requestOptions)
        .then(res => callback());
}


export function sendItemLocation(itemId, chatId, callback) {
    fetch(`${baseUrl}/api/items/${itemId}/location?chatId=${chatId}`, requestOptions)
        .then(res => callback());
}
