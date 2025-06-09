import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getOrderById} from "../../service/ApiService";
import {Box, Chip, Divider, List, ListItem, ListItemText, Typography} from "@mui/material";

const renderStatus = (status) => {
    const map = {
        NEW: '🟡 Новый',
        REJECTED: '❌ Отклонён',
        ON_KITCHEN: '👨‍🍳 Готовится',
        ON_DELIVERY: '🛵 В пути',
        COMPLETED: '✅ Доставлен',
        CANCELLED_BY_USER: '🚫 Отменён пользователем',
    };

    return map[status] || status;
};

const renderStatusChip = (status) => {
    const config = {
        NEW: { label: '🟡 Новый', color: 'warning' },
        REJECTED: { label: '❌ Отклонён', color: 'error' },
        ON_KITCHEN: { label: '👨‍🍳 Готовится', color: 'info' },
        ON_DELIVERY: { label: '🛵 В пути', color: 'primary' },
        COMPLETED: { label: '✅ Доставлен', color: 'success' },
        CANCELLED_BY_USER: { label: '🚫 Отменён пользователем', color: 'default' },
    };

    const c = config[status] || { label: status, color: 'default' };
    return <Chip label={c.label} color={c.color} />;
};
const OrderDetails = () => {

    const {orderId} = useParams();
    const [order, setOrder] = useState();

    useEffect(() => {
        getOrderById(orderId, (order) => {
            setOrder(order)
        })
    }, [orderId])

    if (!order) return <Typography>Загрузка...</Typography>;

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>Детали заказа</Typography>

            <Typography variant="subtitle1"><b>Ресторан:</b> {order.restaurantName}</Typography>
            <Typography variant="subtitle1"><b>Адрес:</b> {order.deliveryAddress}</Typography>
            <Typography variant="subtitle1"><b>Телефон:</b> {order.clientContactPhone}</Typography>
            <Typography variant="subtitle1"><b>Оплата:</b> {order.paymentMethod === 'QR' ? 'QR' : 'Наличные'}</Typography>
            <Typography variant="subtitle1"><b>Стоимость:</b> {order.price} VND</Typography>
            <Typography variant="subtitle1">
                <b>Статус:</b> {renderStatusChip(order.status)}
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Заказ:</Typography>
            <List>
                {order.positions.map((position) => (
                    <ListItem key={position.name}>
                        <ListItemText primary={`${position.name} × ${position.quantity}`} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default OrderDetails;