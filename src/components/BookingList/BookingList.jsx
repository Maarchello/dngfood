import React, {useEffect, useState} from 'react';
import {getRestaurantBookings} from "../../service/ApiService";
import {useTelegram} from "../../hooks/useTelegram";
import {CircularProgress} from "@mui/material";
import '../../Common.css';
import './BookingList.css';
import BookingItem from "./BookingItem/BookingItem";
import {LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers";
import {ruRU} from "@mui/x-date-pickers/locales";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import dayjs from 'dayjs';
import {getFormattedDate} from "../../service/Utils";

const BookingList = () => {

    const {user} = useTelegram();

    const [bookings, setBookings] = useState(null);
    const [date, setDate] = useState(new Date());


    useEffect(() => {
        getRestaurantBookings(user?.id, getFormattedDate(date),(data) => setBookings(data))
    }, [date]);

    return (
        <div className={'main list'}>

            <LocalizationProvider adapterLocale={'ru'}
                                  localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
                                  dateAdapter={AdapterDayjs}>

                <MobileDatePicker format={'DD-MM-YYYY'}
                                  defaultValue={dayjs(date)}
                                  onChange={(d) => setDate(new Date(d))}
                                  slotProps={{textField: {size: 'small'}}}
                                  label={'Выберите день'}/>

            </LocalizationProvider>

            {bookings === null ? <CircularProgress /> : bookings.length === 0 ?
                'Бронирований нет' : bookings.map(item => {return <BookingItem booking={item} />
            })}

        </div>
    );
};

export default BookingList;