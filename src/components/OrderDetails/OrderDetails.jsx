import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {cancelOrder, getOrderById, orderReceived, refundOrder} from "../../service/ApiService";
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";
import {Constants} from "../../service/Constants";

const renderStatusChip = (status) => {
    const config = Constants.ORDER_STATUSES;

    const c = config[status] || { label: status, color: 'default' };
    return <Chip label={c.label} color={c.color} />;
};
const OrderDetails = () => {

    const {orderId} = useParams();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState();

    const fetchDetails = async () => {
        setLoading(true);
        await getOrderById(orderId, (data) => {
            setOrder(data);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchDetails()
    }, [orderId])


    const handleCancelOrder = async () => {
        await cancelOrder(orderId, async () => {
            await fetchDetails();
        });
    };

    const handleReceiveOrder = async () => {
        await orderReceived(orderId, async () => {
            await fetchDetails();
        });
    };

    const handleRefundOrder = async () => {
        await refundOrder(orderId, async () => {
            await fetchDetails();
        });
    };


    if (loading || !order) return <CircularProgress />;

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>Детали заказа</Typography>

            <Typography variant="subtitle1"><b>Ресторан:</b> {order.restaurant.name}</Typography>
            <Typography variant="subtitle1"><b>Адрес:</b> {order.deliveryAddress}</Typography>
            <Typography variant="subtitle1"><b>Телефон:</b> {order.clientContactPhone}</Typography>
            <Typography variant="subtitle1"><b>Оплата:</b> {order.paymentMethod === 'QR' ? 'QR' : 'Наличные'}</Typography>
            <Typography variant="subtitle1"><b>Стоимость:</b> {order.price} VND</Typography>
            <Typography variant="subtitle1">
                <b>Статус:</b> {renderStatusChip(order.status)}
                <Typography variant="subtitle1">{order?.status === 'REJECTED' ? order.rejectReason : ''}</Typography>
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

            <Stack direction="row" spacing={2} mt={2}>
                {order.status === 'NEW' && (
                    <>
                        <Button variant="contained" color="success" onClick={handleCancelOrder}>
                            Отменить
                        </Button>
                    </>
                )}

                {order.status === 'NOT_RECEIVED' && (
                    <>
                        <Button variant="contained" color="primary" onClick={handleReceiveOrder}>
                            Заказ получен
                        </Button>

                        <Button variant="contained" color="primary" onClick={handleRefundOrder}>
                            Вернули деньги
                        </Button>
                    </>
                )}
            </Stack>
        </Box>
    );
};

export default OrderDetails;