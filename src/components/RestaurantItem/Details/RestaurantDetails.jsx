import React, {useEffect, useState} from 'react';
import ImageSlider from "../../Provision/ImageSlider/ImageSlider";
import {Button, CardActions, CardContent, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {getRestaurantById} from "../../../service/ApiService";
import {useTelegram} from "../../../hooks/useTelegram";

const RestaurantDetails = () => {

    const {tg} = useTelegram();
    const { restId} = useParams();
    let navigate = useNavigate();

    // const onMenuHandler = () => {
    //     navigate(`/menu/${restaurant.id}`);
    // }
    const onBookHandler = () => {
        navigate(`/booking/${restaurant.id}`);
    }

    const [restaurant, setRestaurant] = useState({});

    // useEffect(() => {
    //     tg.MainButton.setParams({
    //         text: 'Забронировать'
    //     })
    // })

    useEffect(() => {
        getRestaurantById(restId, (data) => setRestaurant(data))
    }, []);

    return (
        <div className={'main'}>
            <ImageSlider images={restaurant?.photos} />

            <CardContent>

                <Typography sx={{mb: 1.5}} color="text.secondary">
                    Ⓜ️️ {restaurant?.nearMetro}<br/>
                    <span>📍 {restaurant?.address?.fullStreet}</span><br/>
                    ⭐ {restaurant?.rating}<br/>
                    💸 Средний чек {restaurant?.averageBill} ₽<br/>
                    <span><b>{restaurant?.phone}</b></span>
                </Typography>

                <Typography gutterBottom variant="h6" component="div">
                    <b>{restaurant?.name}</b>
                </Typography>

                <Typography gutterBottom paragraph>
                    {restaurant?.description}
                </Typography>


                <CardActions style={{justifyContent: 'center'}} disableSpacing fullWidth>
                    {/*<Button size="small" onClick={onMenuHandler}>Меню</Button>*/}
                    <Button onClick={onBookHandler}>Забронировать</Button>
                </CardActions>

            </CardContent>
        </div>
    );
};

export default RestaurantDetails;