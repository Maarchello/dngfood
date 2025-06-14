import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Chip, CircularProgress, Divider, List, ListItem, ListItemText, Typography,} from '@mui/material';
import {getUserOrders} from '../../service/ApiService';
import {Constants} from "../../service/Constants";

const statusConfig = Constants.ORDER_STATUSES;

const renderStatus = (status) => {
    const c = statusConfig[status] || { label: status, color: 'default' };
    return <Chip label={c.label} color={c.color} size="small" />;
};

const OrderList = () => {
    const [orders, setOrders] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                await getUserOrders((data) => {
                    setOrders(data.content)
                }); // fetch orders list
            } catch (e) {
                console.error('Ошибка загрузки заказов:', e);
            }
        })();
    }, []);

    if (!orders) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
            </Box>
        );
    }

    if (orders.length === 0) {
        return (
            <Box p={2} textAlign="center">
                <Typography variant="h6">У вас пока нет заказов</Typography>
            </Box>
        );
    }

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>
                История заказов
            </Typography>
            <List>
                {orders.map((order) => (
                    <React.Fragment key={order.id}>
                        <ListItem button onClick={() => navigate(`/orders/${order.id}/details`)}>
                            <ListItemText
                                primary={`Заказ #${order.id}`}
                                secondary={
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            {new Date(order.createdAt).toLocaleString()}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Статус: {renderStatus(order.status)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Сумма: {order.price} VND
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>
                        <Divider component="li" />
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default OrderList;
