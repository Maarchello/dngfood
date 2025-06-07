import React, {useEffect, useState} from 'react';
import './BookingForm.css';
import '../../Common.css'

import {useParams} from "react-router-dom";
import {LocalizationProvider, MobileDatePicker, MobileTimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {ruRU} from '@mui/x-date-pickers/locales';
import "dayjs/locale/ru";
import {FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, TextField} from "@mui/material";
import Button from "../Button/Button";
import {doBooking, getBookingDisableDates, getItemById} from "../../service/ApiService";
import {useTelegram} from "../../hooks/useTelegram";
import {getFormattedDate, getFormattedTime} from "../../service/Utils";

function displayDuration() {

    let divs = [];
    for(let i = 1; i <= 30; i++) {
        divs.push (<MenuItem value={i}>{i}д</MenuItem>)
    }
    return divs;
}
const BookingForm = () => {

    const {itemId} = useParams();
    const {user, onClose} = useTelegram();


    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [duration, setDuration] = useState(null);
    const [clientName, setClientName] = useState(user?.first_name === undefined ? null : user?.first_name)
    const [clientPhone, setClientPhone] = useState();
    const [checked, setChecked] = useState(false);

    const [item, setItem] = useState({address: {}, photos: []});
    const [disableDates, setDisableDates] = useState([]);
    const handleChange = () => {
        setChecked(!checked);
    };


    useEffect(() => {
        getItemById(itemId, (data) => {
            setItem(data);
        })
    }, []);

    useEffect(() => {
        getBookingDisableDates(itemId, (data) => {
            setDisableDates(data);
        })
    }, []);

    const shouldDisableDate = date => {
        const formattedDate = date.format('DD-MM-YYYY'); // Важно! Формат как в массиве
        return disableDates.includes(formattedDate);
    }


    return (
        <LocalizationProvider adapterLocale={'ru'}
                              localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
                              dateAdapter={AdapterDayjs}>

            <div className={`container main`}>
                <div className={'b1'}>
                    <img
                        src={item?.photos[0]}
                        width={'100px'} />

                    <div className={'name-and-street'}>

                        <div className={'bold'}>{item.name}</div>
                        {/*<div>{rest.address.city}, {rest.address.fullStreet}</div>*/}
                        {/*<div>Ⓜ️️{rest.nearMetro}</div>*/}
                        <div><strong>Время работы:</strong><br/> <span dangerouslySetInnerHTML={{__html: item.openingHours}}></span></div>

                    </div>

                </div>

                <div className={'booking-date'}>

                    <MobileDatePicker format={'DD-MM-YYYY'}
                                      onChange={(d) => setStartDate(new Date(d))}
                                      disablePast={true}
                                      shouldDisableDate={shouldDisableDate}
                                      slotProps={{textField: {size: 'small'}}}
                                      label={'Выберите день'}/>

                    <MobileTimePicker onChange={(t) => {
                        setStartTime(new Date(t));
                    }}
                                      // minTime={dayjs().set('hour', 12).set('minute', 0)}
                                      // maxTime={dayjs().set('hour', 23).set('minute', 59)}
                                      label={'Выберите время'}
                                      ampm={true}
                                      slotProps={{textField: {size: 'small'}}}/>
                </div>


                <div className={'duration'}>
                    <FormControl fullWidth>
                        <InputLabel id="duration-select-label">Продолжительность</InputLabel>
                        <Select
                            onChange={(v) => setDuration(v.target.value)}
                            labelId="duration-select-label"
                            id="duration-select"
                            label="Продолжительность">
                            {
                                displayDuration()
                            }

                        </Select>
                    </FormControl>

                </div>

                <div>
                    <TextField required={true} value={clientName}
                               onChange={(v) => setClientName(v.target.value)} fullWidth={true} id="standard-basic"
                               label="Введите ваше имя"
                               variant="standard" />
                </div>

                <div>
                    <TextField value={clientPhone}
                               onChange={(v) => setClientPhone(v.target.value)} fullWidth={true} id="standard-basic"
                               label="Оставьте номер телефона"
                               variant="standard" />
                </div>

                <Button onClick={() => {
                    const requestBody = {
                        chatId: user?.id,
                        customerName: clientName,
                        customerPhone: clientPhone,
                        itemId: itemId,
                        startDay: getFormattedDate(startDate),
                        startTime: getFormattedTime(startTime),
                        daysCount: duration
                    };

                    doBooking(requestBody, onClose);

                }}>Забронировать</Button>


            </div>
        </LocalizationProvider>

    );
};

export default BookingForm;