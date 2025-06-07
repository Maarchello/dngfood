import React from 'react';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import dayjs from "dayjs";

function getStatusText(statusEnum) {
    switch (statusEnum) {
        case 'NEW':
            return 'Ожидает подтверждения от менеджера';
        case 'APPROVED':
            return 'Бронь подтверждена';
    }
}
const BookingItem = ({booking}) => {
    return (
        <div>
            <Card sx={{ minWidth: 350 }}>
                <CardContent>
                    <Typography variant="body1">
                        <b>Дата поступления заявки:</b> {dayjs(new Date(booking.createdAt).toUTCString()).format('DD-MM-YYYY HH:MM')}<br />
                        <b>Дата бронирования:</b> {booking.day} {booking.startTime}<br />
                        <b>Длительность:</b> {booking.duration}ч<br />
                        <b>Количество гостей:</b> {booking.guestCount}<br />
                        <b>Имя гостя:</b> {booking.clientName}<br />
                        <b>Комментарий:</b> {booking.comment}<br />
                        <b>Статус бронирования:</b> {getStatusText(booking.status)}<br />
                        <br />
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default BookingItem;