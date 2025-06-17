import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, Rating, TextField, Typography} from '@mui/material';
import {useParams} from "react-router-dom";
import {getOrderById, reviewOrder} from "../../service/ApiService";
import {useTelegram} from "../../hooks/useTelegram";

const ReviewForm = () => {
    const {orderId} = useParams();
    const {onClose} = useTelegram();


    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [order, setOrder] = useState('');

    const fetchDetails = async () => {
        await getOrderById(orderId, (data) => {
            setOrder(data);
        });
    };

    useEffect(() => {
        fetchDetails()
    }, [orderId])

    const handleSend = async () => {
        await reviewOrder(orderId, {rating: rating, reviewComment: comment}, () => {
            onClose();
        })
    };

    return (
        <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
            {/* Order Details */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Отзыв по заказу №{order.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Дата: {new Date(order.createdAt).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Сумма: {order.price + order.deliveryPrice} vnd
                    </Typography>
                    {order.positions?.map((item) => (
                        <Box
                            key={item.name}
                            sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}
                        >
                            <Typography variant="body1">{item.name} x {item.quantity}</Typography>
                            <Typography variant="body1">{item.price * item.quantity} vnd</Typography>
                        </Box>
                    ))}
                </CardContent>
            </Card>

            {/* Star Rating */}
            <Box sx={{ mb: 3 }}>
                <Typography component="legend" sx={{ mb: 1 }}>Выберите оценку</Typography>
                <Rating
                    name="order-rating"
                    value={rating}
                    onChange={(e, newValue) => setRating(newValue)}
                />
            </Box>

            {/* Comment Field */}
            <TextField
                label="Комментарий"
                placeholder="Поделитесь впечатлениями от заказа"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mb: 3 }}
            />

            {/* Submit Button */}
            <Button
                variant="contained"
                fullWidth
                disabled={rating === 0}
                onClick={handleSend}
            >
                Отправить отзыв
            </Button>
        </Box>
    );
};

export default ReviewForm;