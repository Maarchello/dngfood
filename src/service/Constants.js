export const Constants = {
    BASE_URL: "https://dngfood.tmcn.io",
    // BASE_URL: "https://tops-mudfish-logically.ngrok-free.app",
    TKN_PROP_NAME: "tkn",
    ORDER_STATUSES: {
        NEW: { label: 'Новый', color: 'warning' },
        REJECTED: { label: 'Отклонён заведением', color: 'error' },
        ON_KITCHEN: { label: 'Готовится', color: 'info' },
        ON_DELIVERY: { label: 'В пути', color: 'primary' },
        ARRIVED: { label: 'Курьер приехал', color: 'primary' },
        RECEIVED: { label: 'Доставлен', color: 'primary' },
        NOT_RECEIVED: { label: 'Не получен', color: 'primary' },
        REFUND: { label: 'Возврат', color: 'primary' },
        CANCELLED_BY_USER: { label: 'Отменён пользователем', color: 'default' },
    }
}